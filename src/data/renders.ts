/**
 * Rendus 3D IA du projet « Les Villas Ahlam » (CDC §12).
 * Générés à partir des prompts de `update/PROMPTS-IMAGES-Villas-Ahlam.md`,
 * convertis en WebP optimisé dans `src/assets/renders/`.
 */
import heroAerial from "@/assets/renders/hero-aerial.webp";
import entranceGate from "@/assets/renders/entrance-gate.webp";
import villaDay from "@/assets/renders/villa-day.webp";
import villaDusk from "@/assets/renders/villa-dusk.webp";
import livingRoom from "@/assets/renders/living-room.webp";
import kitchen from "@/assets/renders/kitchen.webp";
import bedroom from "@/assets/renders/bedroom.webp";
import lifestyleFamily from "@/assets/renders/lifestyle-family.webp";
import landscapedStreet from "@/assets/renders/landscaped-street.webp";
import rooftopSunset from "@/assets/renders/rooftop-sunset.webp";
import lotsAerial from "@/assets/renders/lots-aerial.webp";
import brandPattern from "@/assets/renders/brand-pattern.webp";

export const RENDERS = {
  heroAerial,
  entranceGate,
  villaDay,
  villaDusk,
  livingRoom,
  kitchen,
  bedroom,
  lifestyleFamily,
  landscapedStreet,
  rooftopSunset,
  lotsAerial,
  brandPattern,
} as const;

export interface RenderItem {
  src: string;
  titre: string;
  categorie: "Architecture" | "Intérieurs" | "Domaine" | "Art de vivre";
  /** Classe d'occupation dans la mosaïque (bento). */
  span?: string;
}

/** Galerie immersive — CDC §8.9 (remplace la visite 360°). */
export const GALLERY: RenderItem[] = [
  { src: heroAerial, titre: "Vue aérienne du domaine", categorie: "Domaine", span: "md:col-span-2 md:row-span-2" },
  { src: villaDay, titre: "Villa — façade de jour", categorie: "Architecture" },
  { src: villaDusk, titre: "Villa — façade au crépuscule", categorie: "Architecture" },
  { src: livingRoom, titre: "Salon / séjour", categorie: "Intérieurs", span: "md:col-span-2" },
  { src: kitchen, titre: "Cuisine ouverte", categorie: "Intérieurs" },
  { src: bedroom, titre: "Suite parentale", categorie: "Intérieurs" },
  { src: entranceGate, titre: "Entrée du domaine", categorie: "Domaine", span: "md:col-span-2" },
  { src: landscapedStreet, titre: "Allée paysagère", categorie: "Domaine" },
  { src: rooftopSunset, titre: "Toit-terrasse au coucher du soleil", categorie: "Art de vivre" },
  { src: lifestyleFamily, titre: "L'art de vivre Ahlam", categorie: "Art de vivre", span: "md:col-span-2" },
];
