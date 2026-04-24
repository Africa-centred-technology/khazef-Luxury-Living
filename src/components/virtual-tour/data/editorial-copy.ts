/**
 * Editorial copy for the Khazef virtual tour.
 *
 * Voice guidelines (CHARTE-GRAPHIQUE §7):
 * - poésie, éditorial, ciselé
 * - mots courts et précis
 * - alternance français / arabe
 * - concret : matériaux, mesures, provenances
 * - éviter superlatifs creux, jargon immobilier, anglicismes gratuits
 *
 * Content lives in `src/locales/{fr,ar}/virtualTour.json`. The exports
 * below are React hooks that read the translated values via i18next.
 */

import { useTranslation } from "react-i18next";

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

const MATERIAL_KEYS: readonly MaterialKey[] = [
  "tadelakt",
  "marbre",
  "zellige",
  "bois",
  "laiton",
] as const;

export function useTourIntro(): TourIntroCopy {
  const { t } = useTranslation("virtualTour");
  return {
    eyebrow: t("intro.eyebrow"),
    arabic: t("intro.arabic"),
    title: t("intro.title"),
    italicWord: t("intro.italicWord"),
    paragraph: t("intro.paragraph"),
  };
}

export function useTourTips(): TourTipsCopy {
  const { t } = useTranslation("virtualTour");
  const items = t("tips.items", { returnObjects: true }) as TourTipItem[];
  return {
    eyebrow: t("tips.eyebrow"),
    items: Array.isArray(items) ? items : [],
  };
}

export function useMaterialStories(): Record<MaterialKey, MaterialStory> {
  const { t } = useTranslation("virtualTour");
  const entries = MATERIAL_KEYS.map((key): [MaterialKey, MaterialStory] => [
    key,
    {
      arabic: t(`materials.${key}.arabic`),
      origin: t(`materials.${key}.origin`),
      story: t(`materials.${key}.story`),
      technicalNote: t(`materials.${key}.technicalNote`),
    },
  ]);
  return Object.fromEntries(entries) as Record<MaterialKey, MaterialStory>;
}

export function useVrHelpCopy(): VrHelpCopy {
  const { t } = useTranslation("virtualTour");
  return {
    title: t("vrHelp.title"),
    body: t("vrHelp.body"),
    fallbackBody: t("vrHelp.fallbackBody"),
  };
}

export function useAccessibilityCopy(): AccessibilityCopy {
  const { t } = useTranslation("virtualTour");
  return {
    reducedMotionTitle: t("a11y.reducedMotionTitle"),
    reducedMotionBody: t("a11y.reducedMotionBody"),
    audioTitle: t("a11y.audioTitle"),
    audioBody: t("a11y.audioBody"),
  };
}
