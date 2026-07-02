/**
 * Client de l'API « Les Villas Ahlam » (backend Django/DRF).
 *
 * Mappe les reponses snake_case du backend vers les types camelCase du front
 * (type `Lot` de `@/data/lots`), pour que les composants restent agnostiques
 * de la source de donnees. Base configurable via `VITE_API_URL`.
 */
import type { Lot, StatutLot } from "@/data/lots";

/**
 * Base de l'API :
 * 1. `VITE_API_URL` explicite s'il est defini (ex. `.env.tunnel` = `/api`) ;
 * 2. sinon, si la page est servie depuis un hote distant (tunnel Cloudflare /
 *    Worker), on appelle l'API en same-origin `/api` (routee vers le backend) ;
 * 3. sinon (developpement local), le backend Django local sur le port 8000.
 */
function resolveApiUrl(): string {
  const explicit = import.meta.env.VITE_API_URL as string | undefined;
  if (explicit) return explicit;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1";
    if (!isLocal) return "/api";
  }

  return "http://127.0.0.1:8000/api";
}

const API_URL = resolveApiUrl();

/** Forme d'un lot telle que renvoyee par l'API (CDC §7.5). */
interface ApiLot {
  id: number;
  numero: number;
  ilot: "A" | "B";
  surface_m2: number;
  hauteur: string;
  statut: StatutLot;
  statut_label: string;
  prix_m2_mad: number;
  prix_indicatif_mad: number;
  orientation: string;
  highlight: boolean;
  vues: number;
  cliquable: boolean;
}

/** Adapte un lot API au type `Lot` du front (camelCase + id "lot-N"). */
function toLot(api: ApiLot): Lot {
  return {
    id: `lot-${api.numero}`,
    numero: api.numero,
    ilot: api.ilot,
    surfaceM2: api.surface_m2,
    hauteur: "R+1",
    statut: api.statut,
    prixM2: api.prix_m2_mad,
    prixIndicatif: api.prix_indicatif_mad,
  };
}

/** Erreur API portant le statut HTTP et les erreurs de champ DRF. */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Extrait un message lisible d'une reponse d'erreur DRF. */
function messageDErreur(data: unknown, status: number): string {
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (typeof obj.detail === "string") return obj.detail;
    // Premier message de champ (ex. { lot_numero: ["..."] })
    for (const value of Object.values(obj)) {
      if (Array.isArray(value) && typeof value[0] === "string") return value[0];
      if (typeof value === "string") return value;
    }
  }
  return `Erreur serveur (${status}).`;
}

/** Liste des 42 lots (libere d'abord les verrous expires cote backend). */
export async function fetchLots(): Promise<Lot[]> {
  const res = await fetch(`${API_URL}/lots/`);
  if (!res.ok) throw new ApiError(messageDErreur(await res.json().catch(() => null), res.status), res.status);
  const data: ApiLot[] = await res.json();
  return data.map(toLot);
}

export interface ReservationPayload {
  lot_numero: number;
  nom: string;
  telephone: string;
  email?: string;
  ville_pays?: string;
  financement?: "cash" | "credit" | "indecis";
  message?: string;
  consentement_rgpd: boolean;
}

export interface ReservationResult {
  id: number;
  lot_numero: number;
  statut_lot: StatutLot;
  message: string;
  whatsapp_fallback: string;
}

/** Soumet une reservation (verrou anti-doublon + notif commercial cote backend). */
export async function createReservation(payload: ReservationPayload): Promise<ReservationResult> {
  const res = await fetch(`${API_URL}/reservations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(
      messageDErreur(data, res.status),
      res.status,
      (data as Record<string, string[]>) ?? undefined,
    );
  }
  return data as ReservationResult;
}

export interface SimulationPayload {
  prix: number;
  apport: number;
  duree_annees: number;
  taux_annuel: number;
}

export interface SimulationResult {
  capital_emprunte: number;
  mensualite: number;
  duree_mois: number;
  taux_annuel: number;
  cout_total_credit: number;
  cout_interets: number;
}

/** Simulateur de credit immobilier (CDC §8.5). */
export async function simulerCredit(payload: SimulationPayload): Promise<SimulationResult> {
  const res = await fetch(`${API_URL}/simulateur-credit/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new ApiError(messageDErreur(await res.json().catch(() => null), res.status), res.status);
  return (await res.json()) as SimulationResult;
}

export interface RappelPayload {
  nom: string;
  telephone: string;
  sujet?: "general" | "financement";
  lot_numero?: number;
  message?: string;
  consentement_rgpd: boolean;
}

/** Demande d'etre rappele (general ou financement, CDC §7.3 / §8.5). */
export async function createRappel(payload: RappelPayload): Promise<{ id: number }> {
  const res = await fetch(`${API_URL}/rappels/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(
      messageDErreur(data, res.status),
      res.status,
      (data as Record<string, string[]>) ?? undefined,
    );
  }
  return data as { id: number };
}

export interface BrochureLeadPayload {
  nom?: string;
  email?: string;
  telephone?: string;
  consentement_rgpd: boolean;
}

/** Lead magnet : enregistre un lead avant telechargement de la brochure (CDC §8.7). */
export async function createBrochureLead(payload: BrochureLeadPayload): Promise<{ id: number }> {
  const res = await fetch(`${API_URL}/brochure/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(
      messageDErreur(data, res.status),
      res.status,
      (data as Record<string, string[]>) ?? undefined,
    );
  }
  return data as { id: number };
}
