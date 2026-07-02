import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Clé de stockage du choix de consentement (loi 09-08 / RGPD). */
const CONSENT_KEY = "villas-ahlam-cookie-consent";
type Consent = "accepted" | "refused";

/** Indique si l'utilisateur a accepté les cookies de mesure d'audience. */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_KEY) === "accepted";
}

/**
 * Bannière de consentement aux cookies — CDC §9.3 / §10 (loi 09-08 & RGPD).
 * Aucun cookie de mesure n'est déposé tant que l'utilisateur n'a pas accepté.
 * Le choix est mémorisé ; « Refuser » est aussi respecté (privacy-first).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored !== "accepted" && stored !== "refused") setVisible(true);
  }, []);

  const decide = (choice: Consent) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: choice }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="container-luxe mx-auto max-w-4xl rounded-sm border border-border/60 bg-background/95 p-5 shadow-luxe-md backdrop-blur md:flex md:items-center md:gap-6">
        <div className="flex items-start gap-3 md:flex-1">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
          <p className="text-sm text-muted-foreground">
            Nous utilisons des cookies strictement nécessaires au fonctionnement du site,
            et — avec votre accord — des cookies de mesure d'audience pour l'améliorer.{" "}
            <Link to="/cookies" className="link-luxe text-primary">
              En savoir plus
            </Link>
            .
          </p>
        </div>
        <div className="mt-4 flex gap-3 md:mt-0 md:shrink-0">
          <Button variant="outline" size="sm" onClick={() => decide("refused")}>
            Refuser
          </Button>
          <Button
            size="sm"
            className="bg-gradient-gold-bright text-primary"
            onClick={() => decide("accepted")}
          >
            Tout accepter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
