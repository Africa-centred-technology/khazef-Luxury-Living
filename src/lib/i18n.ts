import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// FR resources
import frCommon from "@/locales/fr/common.json";
import frHome from "@/locales/fr/home.json";
import frProject from "@/locales/fr/project.json";
import frApartments from "@/locales/fr/apartments.json";
import frApartmentDetail from "@/locales/fr/apartmentDetail.json";
import frPlans from "@/locales/fr/plans.json";
import frLocation from "@/locales/fr/location.json";
import frTimeline from "@/locales/fr/timeline.json";
import frVirtualTour from "@/locales/fr/virtualTour.json";
import frGallery from "@/locales/fr/gallery.json";
import frSafi from "@/locales/fr/safi.json";
import frContact from "@/locales/fr/contact.json";
import frNotFound from "@/locales/fr/notFound.json";
import frFooter from "@/locales/fr/footer.json";
import frCta from "@/locales/fr/cta.json";

// AR resources
import arCommon from "@/locales/ar/common.json";
import arHome from "@/locales/ar/home.json";
import arProject from "@/locales/ar/project.json";
import arApartments from "@/locales/ar/apartments.json";
import arApartmentDetail from "@/locales/ar/apartmentDetail.json";
import arPlans from "@/locales/ar/plans.json";
import arLocation from "@/locales/ar/location.json";
import arTimeline from "@/locales/ar/timeline.json";
import arVirtualTour from "@/locales/ar/virtualTour.json";
import arGallery from "@/locales/ar/gallery.json";
import arSafi from "@/locales/ar/safi.json";
import arContact from "@/locales/ar/contact.json";
import arNotFound from "@/locales/ar/notFound.json";
import arFooter from "@/locales/ar/footer.json";
import arCta from "@/locales/ar/cta.json";

// EN resources (namespaces actifs ; les autres retombent sur FR via fallbackLng)
import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enProject from "@/locales/en/project.json";
import enLocation from "@/locales/en/location.json";
import enGallery from "@/locales/en/gallery.json";
import enContact from "@/locales/en/contact.json";
import enNotFound from "@/locales/en/notFound.json";
import enFooter from "@/locales/en/footer.json";
import enCta from "@/locales/en/cta.json";

export type SupportedLocale = "fr" | "ar" | "en";
export const SUPPORTED_LOCALES: SupportedLocale[] = ["fr", "ar", "en"];
export const RTL_LOCALES: SupportedLocale[] = ["ar"];

export const NAMESPACES = [
  "common",
  "home",
  "project",
  "apartments",
  "apartmentDetail",
  "plans",
  "location",
  "timeline",
  "virtualTour",
  "gallery",
  "safi",
  "contact",
  "notFound",
  "footer",
  "cta",
] as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: frCommon,
        home: frHome,
        project: frProject,
        apartments: frApartments,
        apartmentDetail: frApartmentDetail,
        plans: frPlans,
        location: frLocation,
        timeline: frTimeline,
        virtualTour: frVirtualTour,
        gallery: frGallery,
        safi: frSafi,
        contact: frContact,
        notFound: frNotFound,
        footer: frFooter,
        cta: frCta,
      },
      ar: {
        common: arCommon,
        home: arHome,
        project: arProject,
        apartments: arApartments,
        apartmentDetail: arApartmentDetail,
        plans: arPlans,
        location: arLocation,
        timeline: arTimeline,
        virtualTour: arVirtualTour,
        gallery: arGallery,
        safi: arSafi,
        contact: arContact,
        notFound: arNotFound,
        footer: arFooter,
        cta: arCta,
      },
      en: {
        common: enCommon,
        home: enHome,
        project: enProject,
        location: enLocation,
        gallery: enGallery,
        contact: enContact,
        notFound: enNotFound,
        footer: enFooter,
        cta: enCta,
      },
    },
    fallbackLng: "fr",
    supportedLngs: SUPPORTED_LOCALES,
    ns: NAMESPACES as unknown as string[],
    defaultNS: "common",
    returnEmptyString: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "luxuryliving-lang",
    },
    react: { useSuspense: false },
  });

export function isRtlLocale(lang: string): boolean {
  return RTL_LOCALES.includes(lang as SupportedLocale);
}

export function applyDocumentDirection(lang: string): void {
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", isRtlLocale(lang) ? "rtl" : "ltr");
}

i18n.on("languageChanged", (lang) => applyDocumentDirection(lang));
if (typeof document !== "undefined") {
  applyDocumentDirection(i18n.language ?? "fr");
}

export default i18n;
