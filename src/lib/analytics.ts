/**
 * Analytics — GA4 + Meta Pixel, conditionnés au consentement cookies (CDC §10).
 *
 * Aucun script tiers n'est chargé tant que l'utilisateur n'a pas accepté les
 * cookies de mesure (voir CookieConsent). Les identifiants proviennent de
 * variables d'environnement ; sans identifiant, le module reste inerte.
 *
 *   VITE_GA4_ID         ex. "G-XXXXXXXXXX"
 *   VITE_META_PIXEL_ID  ex. "123456789012345"
 */
import { hasAnalyticsConsent } from "@/components/CookieConsent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let initialized = false;

function loadGA4(id: string): void {
  if (document.getElementById("ga4-src")) return;
  const s = document.createElement("script");
  s.id = "ga4-src";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
}

function loadMetaPixel(id: string): void {
  if (window.fbq) return;
  const n: Window["fbq"] = Object.assign(
    (...args: unknown[]) => {
      if (n!.queue) n!.queue.push(args);
    },
    { queue: [] as unknown[], loaded: true },
  );
  window.fbq = n;
  window._fbq = window._fbq || n;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  window.fbq("init", id);
  window.fbq("track", "PageView");
}

/** Initialise GA4 + Pixel si le consentement est donné et les IDs présents. */
export function initAnalytics(): void {
  if (initialized) return;
  if (!hasAnalyticsConsent()) return;
  if (GA4_ID) loadGA4(GA4_ID);
  if (PIXEL_ID) loadMetaPixel(PIXEL_ID);
  if (GA4_ID || PIXEL_ID) initialized = true;
}

/** Vue de page (route SPA). */
export function trackPageView(path: string): void {
  if (!hasAnalyticsConsent()) return;
  if (GA4_ID && window.gtag) {
    window.gtag("event", "page_view", { page_path: path, page_location: window.location.href });
  }
  if (PIXEL_ID && window.fbq) {
    window.fbq("track", "PageView");
  }
}

/** Événement de conversion (WhatsApp, brochure, réservation, RDV…). */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!hasAnalyticsConsent()) return;
  if (GA4_ID && window.gtag) {
    window.gtag("event", name, params ?? {});
  }
  if (PIXEL_ID && window.fbq) {
    window.fbq("trackCustom", name, params ?? {});
  }
}
