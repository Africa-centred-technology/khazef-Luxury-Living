/**
 * Les Villas Ahlam — constantes de marque & projet.
 * Source : Cahier des charges v1.2 (dossier update/).
 * Point unique de vérité pour le nom, le contact, le GPS, le prix et les baselines.
 */

export const PROJET = {
  nom: "Les Villas Ahlam",
  sousTitre: "Domaine Résidentiel Privé",
  lotisseur: "Yatib Sakan",
  localisation:
    "Bouskoura, Commune de Douar Rmel Lahlal, Préfecture de Bouskoura, Région Casablanca-Settat",
  nombreLots: 42,
  typologie: "Villas R+1",
  surfaceMin: 200,
  surfaceMax: 461,
  architecte: "Badik Meriem",
  proprietaireFoncier: "Abdelhafid Fertate et Consorts",
  titreFoncier: "23025/63",
} as const;

export const CONTACT = {
  telephone: "06 61 22 86 19",
  telephoneRaw: "+212661228619",
  whatsapp: "212661228619",
  whatsappUrl: "https://wa.me/212661228619",
} as const;

export const GPS = {
  lat: 33.479327,
  lng: -7.665879,
  mapsUrl: "https://maps.app.goo.gl/xYt5rhptRdtU6wk79",
} as const;

export const PRIX = {
  /** Prix au m² indicatif — CDC §1 / §5.4 */
  prixM2: 4500,
  /** Affichage officiel : prix sur demande, accroche "à partir de 4 500 DH/m²" */
  affichageOfficiel: "Prix sur demande",
  accroche: "Lots à partir de 4 500 DH/m²",
} as const;

/** Baselines / signatures marketing — CDC §5.2 */
export const BASELINES = [
  "Là où vos rêves prennent racine.",
  "Ahlam — donnez vie à vos rêves.",
  "Votre villa. Votre domaine. Votre rêve.",
] as const;

/** Argumentaire de proximité dérivé du GPS — CDC §6 */
export const PROXIMITES = [
  { lieu: "Aéroport Mohammed V", distance: "~15 km", temps: "~15–20 min" },
  { lieu: "Centre de Casablanca", distance: "~16–20 km", temps: "~20–25 min" },
  { lieu: "Forêt de Bouskoura", distance: "à proximité", temps: "quelques min" },
  { lieu: "Bouskoura Golf City", distance: "à proximité", temps: "quelques min" },
  {
    lieu: "Écoles internationales / commerces",
    distance: "à proximité",
    temps: "quelques min",
  },
] as const;

/** Formate un montant en dirhams avec séparateurs (ex. 900000 -> "900 000 DH"). */
export function formatDH(montant: number): string {
  return `${montant.toLocaleString("fr-FR").replace(/ /g, " ")} DH`;
}

/** Prix indicatif "à partir de" pour une surface donnée (surface × prix au m²). */
export function prixIndicatif(surfaceM2: number): number {
  return surfaceM2 * PRIX.prixM2;
}

/** Lien WhatsApp avec message pré-rempli, optionnellement contextualisé sur un lot. */
export function whatsappLien(message?: string): string {
  const texte =
    message ??
    `Bonjour, je suis intéressé(e) par le projet ${PROJET.nom} à Bouskoura.`;
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(texte)}`;
}
