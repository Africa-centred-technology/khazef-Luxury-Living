/**
 * Les 42 lots du lotissement « Les Villas Ahlam » — CDC §13.
 * Surfaces lues sur le plan PDF (seule source). Tous en R+1.
 * Prix indicatif = surface × 4 500 DH (affiché « À partir de »).
 *
 * NOTE statuts : au lancement, « tous les lots commercialisés d'un coup »
 * (CDC §0) — tous initialisés à "disponible". À terme, la source de vérité
 * des statuts sera le backend (Supabase, CDC §7.7).
 */

import { PRIX, prixIndicatif } from "./villas-ahlam";

export type StatutLot = "disponible" | "en_cours" | "vendu";

export interface Lot {
  id: string;
  numero: number;
  ilot: "A" | "B";
  surfaceM2: number;
  hauteur: "R+1";
  statut: StatutLot;
  prixM2: number;
  /** surface × prix au m², affiché « À partir de » */
  prixIndicatif: number;
  /** Lot mis en avant (badge « populaire ») — CDC §8 #11. */
  highlight: boolean;
  /** Nombre de vues (compteur de popularité) — CDC §8 #11. */
  vues: number;
}

/** Surfaces (m²) par numéro de lot — CDC §13. */
const SURFACES: Record<number, number> = {
  1: 303, 2: 340, 3: 200, 4: 200, 5: 200, 6: 200, 7: 200, 8: 200, 9: 200,
  10: 200, 11: 200, 12: 303, 13: 340, 14: 200, 15: 200, 16: 300, 17: 452,
  18: 281, 19: 200, 20: 200, 21: 200, 22: 200, 23: 200, 24: 200, 25: 200,
  26: 461, 27: 323, 28: 250, 29: 363, 30: 250, 31: 200, 32: 200, 33: 200,
  34: 318, 35: 200, 36: 332, 37: 269, 38: 200, 39: 200, 40: 200, 41: 200,
  42: 318,
};

/** Îlot A = lots 1–16, Îlot B = lots 17–42 (CDC §13). */
function ilotDe(numero: number): "A" | "B" {
  return numero <= 16 ? "A" : "B";
}

export const LOTS: Lot[] = Array.from({ length: 42 }, (_, i) => {
  const numero = i + 1;
  const surfaceM2 = SURFACES[numero];
  return {
    id: `lot-${numero}`,
    numero,
    ilot: ilotDe(numero),
    surfaceM2,
    hauteur: "R+1",
    statut: "disponible",
    prixM2: PRIX.prixM2,
    prixIndicatif: prixIndicatif(surfaceM2),
    highlight: false,
    vues: 0,
  };
});

export function getLot(numero: number): Lot | undefined {
  return LOTS.find((l) => l.numero === numero);
}

/** Nombre de lots par statut — pour le compteur de rareté (CDC §7.3). */
export function compteParStatut(statut: StatutLot): number {
  return LOTS.filter((l) => l.statut === statut).length;
}

/** Libellé + couleur (token CSS) d'un statut — CDC §7.2. */
export const STATUT_META: Record<
  StatutLot,
  { label: string; colorVar: string; cliquable: boolean }
> = {
  disponible: { label: "Disponible", colorVar: "var(--jade)", cliquable: true },
  en_cours: { label: "En cours", colorVar: "var(--gold)", cliquable: true },
  vendu: { label: "Vendu", colorVar: "var(--charcoal)", cliquable: false },
};
