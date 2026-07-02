import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackEvent, trackPageView } from "@/lib/analytics";

/**
 * Pilotage analytics (headless) — CDC §10.
 * Charge GA4/Pixel après consentement, envoie une vue à chaque changement de
 * route, et suit les conversions par clic (WhatsApp, téléphone).
 */
export function Analytics() {
  const { pathname, search } = useLocation();

  // Init si le consentement est déjà accordé, et à l'acceptation de la bannière.
  useEffect(() => {
    initAnalytics();
    const onConsent = (e: Event) => {
      const choice = (e as CustomEvent<string>).detail;
      if (choice === "accepted") {
        initAnalytics();
        trackPageView(window.location.pathname + window.location.search);
      }
    };
    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  // Vue de page à chaque navigation.
  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);

  // Conversions par clic (délégation globale) : WhatsApp + téléphone.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        trackEvent("whatsapp_click", { href });
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { href });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

export default Analytics;
