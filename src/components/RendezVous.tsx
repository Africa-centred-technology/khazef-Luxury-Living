import { CalendarClock, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, PROJET, whatsappLien } from "@/data/villas-ahlam";
import { trackEvent } from "@/lib/analytics";

/** URL Calendly (facultative). Si absente, on retombe sur WhatsApp / téléphone. */
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

/**
 * Prise de rendez-vous de visite — CDC §8 Tier 2 (#12).
 * Utilise Calendly si VITE_CALENDLY_URL est défini, sinon un parcours
 * WhatsApp / téléphone pré-rempli (rappel commercial sous 24 h).
 */
export function RendezVous() {
  const waLink = whatsappLien(
    `Bonjour, je souhaite planifier une visite du domaine ${PROJET.nom} à Bouskoura. Quelles sont vos disponibilités ?`,
  );

  return (
    <section
      aria-labelledby="rdv-title"
      className="overflow-hidden rounded-sm border border-border/60 bg-gradient-night p-8 text-background"
    >
      <div className="eyebrow text-gold">Visite privée</div>
      <h2 id="rdv-title" className="mt-2 font-display text-3xl">
        Prenez rendez-vous
      </h2>
      <p className="mt-3 max-w-xl text-sm text-background/85">
        Choisissez un créneau pour visiter le domaine et ses lots avec un conseiller
        Yatib Sakan. Un rappel de confirmation vous est envoyé par WhatsApp ou SMS.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {CALENDLY_URL ? (
          <Button asChild size="lg" className="bg-gradient-gold-bright text-primary">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("rdv_click", { canal: "calendly" })}
            >
              <CalendarClock className="h-4 w-4" /> Choisir un créneau
            </a>
          </Button>
        ) : (
          <Button asChild size="lg" className="bg-gradient-gold-bright text-primary">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("rdv_click", { canal: "whatsapp" })}
            >
              <MessageCircle className="h-4 w-4" /> Planifier sur WhatsApp
            </a>
          </Button>
        )}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-background/40 bg-transparent text-background hover:bg-background/10"
        >
          <a href={`tel:${CONTACT.telephoneRaw}`}>
            <Phone className="h-4 w-4" /> {CONTACT.telephone}
          </a>
        </Button>
      </div>
    </section>
  );
}

export default RendezVous;
