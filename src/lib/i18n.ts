import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// FR resources
import frCommon from "@/locales/fr/common.json";
import frHome from "@/locales/fr/home.json";
import frProject from "@/locales/fr/project.json";
import frLocation from "@/locales/fr/location.json";
import frGallery from "@/locales/fr/gallery.json";
import frContact from "@/locales/fr/contact.json";
import frNotFound from "@/locales/fr/notFound.json";
import frFooter from "@/locales/fr/footer.json";
import frCta from "@/locales/fr/cta.json";

// AR resources
import arCommon from "@/locales/ar/common.json";
import arHome from "@/locales/ar/home.json";
import arProject from "@/locales/ar/project.json";
import arLocation from "@/locales/ar/location.json";
import arGallery from "@/locales/ar/gallery.json";
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
  "location",
  "gallery",
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
        location: frLocation,
        gallery: frGallery,
        contact: frContact,
        notFound: frNotFound,
        footer: frFooter,
        cta: frCta,
      },
      ar: {
        common: arCommon,
        home: arHome,
        project: arProject,
        location: arLocation,
        gallery: arGallery,
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
