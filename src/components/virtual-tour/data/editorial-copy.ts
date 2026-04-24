/**
 * Editorial copy for the Khazef virtual tour.
 *
 * Voice guidelines (CHARTE-GRAPHIQUE §7):
 * - poésie, éditorial, ciselé
 * - mots courts et précis
 * - alternance français / arabe
 * - concret : matériaux, mesures, provenances
 * - éviter superlatifs creux, jargon immobilier, anglicismes gratuits
 */

export interface TourIntroCopy {
  eyebrow: string;
  arabic: string;
  title: string;
  italicWord: string;
  paragraph: string;
}

export interface TourTipItem {
  icon: string;
  title: string;
  description: string;
}

export interface TourTipsCopy {
  eyebrow: string;
  items: TourTipItem[];
}

export type MaterialKey =
  | "tadelakt"
  | "marbre"
  | "zellige"
  | "bois"
  | "laiton";

export interface MaterialStory {
  arabic: string;
  origin: string;
  story: string;
  technicalNote: string;
}

export interface VrHelpCopy {
  title: string;
  body: string;
  fallbackBody: string;
}

export interface AccessibilityCopy {
  reducedMotionTitle: string;
  reducedMotionBody: string;
  audioTitle: string;
  audioBody: string;
}

export const TOUR_INTRO: TourIntroCopy = {
  eyebrow: "Visite immersive",
  arabic: "جولة افتراضية",
  title: "Franchissez le seuil,",
  italicWord: "à 360°.",
  paragraph:
    "Trois pièces, trois lumières. Glissez le regard sur le tadelakt, " +
    "suivez la veine du marbre, posez la main sur le zellige. La visite " +
    "suit le rythme de la maison : patient, ciselé, sans hâte.",
};

export const TOUR_TIPS: TourTipsCopy = {
  eyebrow: "Pour mieux explorer",
  items: [
    {
      icon: "MousePointer2",
      title: "Glissez pour regarder",
      description:
        "Maintenez le clic et déplacez la vue. Sur mobile, un doigt suffit.",
    },
    {
      icon: "CircleDot",
      title: "Points dorés",
      description:
        "Chaque halo révèle un matériau, sa provenance, son geste d'artisan.",
    },
    {
      icon: "Box",
      title: "Mode 3D",
      description:
        "Passez du panorama au plan volumique pour lire les proportions.",
    },
    {
      icon: "Headset",
      title: "Casque VR",
      description:
        "Compatible Meta Quest et Chrome desktop avec WebXR activé.",
    },
  ],
};

export const MATERIAL_STORIES: Record<MaterialKey, MaterialStory> = {
  tadelakt: {
    arabic: "تادلاكت",
    origin: "Safi — chaux vive, pierre locale",
    story:
      "Enduit minéral né des hammams de Marrakech, travaillé à la chaux " +
      "vive puis ciré à la pierre jusqu'à refléter la lumière. Ici, ton " +
      "ivoire rosé, posé main par main sur sept jours.",
    technicalNote:
      "Imperméable, respirant, sans joint — idéal pour les pièces d'eau.",
  },
  marbre: {
    arabic: "رخام",
    origin: "Statuario — Carrare, Italie",
    story:
      "Bloc Statuario extrait des carrières de Carrare, poli miroir pour " +
      "laisser apparaître le veinage doré, rare et nerveux. Chaque plan " +
      "est découpé pour que la veine continue d'un bord à l'autre.",
    technicalNote:
      "Épaisseur 20 mm, calepinage signé à la main par le marbrier.",
  },
  zellige: {
    arabic: "زليج",
    origin: "Safi — argile locale, cuisson au bois",
    story:
      "Tesselles taillées une à une au marteau, émaillées en bleu cobalt, " +
      "cuites au four à bois. La légère irrégularité du geste fait vibrer " +
      "la surface sous la lumière rasante.",
    technicalNote:
      "Pose sur bain de mortier, joints fins au tadelakt teinté.",
  },
  bois: {
    arabic: "خشب",
    origin: "Cèdre du Moyen Atlas",
    story:
      "Cèdre massif, séché trois saisons avant d'être travaillé. Le veinage " +
      "porte encore l'odeur de résine. Huilé, non verni, pour laisser la " +
      "matière respirer et patiner.",
    technicalNote:
      "Assemblages à tenons chevillés, sans vis apparente.",
  },
  laiton: {
    arabic: "نحاس",
    origin: "Fès — atelier dinandier",
    story:
      "Laiton massif, brossé à la main dans les souks de Fès. Le métal " +
      "se patinera lentement vers un or profond, marquant l'usage comme " +
      "une signature du temps.",
    technicalNote:
      "Non vernis — patine vivante, entretien à la cire microcristalline.",
  },
};

export const VR_HELP_COPY: VrHelpCopy = {
  title: "Visite en réalité virtuelle",
  body:
    "Chaussez votre casque, laissez la pièce se déployer à votre échelle. " +
    "Déplacez-vous à la manette ou par téléportation sur les points dorés. " +
    "La session se ferme d'un simple geste.",
  fallbackBody:
    "Votre navigateur ne prend pas encore en charge WebXR. Ouvrez la visite " +
    "dans Chrome desktop (avec WebXR activé) ou dans le navigateur Meta Quest " +
    "pour entrer en immersion.",
};

export const ACCESSIBILITY_COPY: AccessibilityCopy = {
  reducedMotionTitle: "Mouvement réduit",
  reducedMotionBody:
    "Nous avons détecté votre préférence. Les rotations automatiques et " +
    "panoramiques lentes sont désactivées. Tout reste navigable.",
  audioTitle: "Ambiance sonore",
  audioBody:
    "Le son est coupé par défaut. Activez-le pour entendre la rumeur " +
    "discrète du patio et le tintement du zellige sous la pluie.",
};
