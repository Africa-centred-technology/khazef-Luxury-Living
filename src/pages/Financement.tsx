import { useState } from "react";
import { Building2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";
import { CreditSimulator } from "@/components/financement/CreditSimulator";
import { ApiError, createRappel } from "@/lib/api";
import { CONTACT } from "@/data/villas-ahlam";

/** Banques partenaires citees au CDC §8.5. */
const BANQUES = ["Attijariwafa Bank", "Bank of Africa", "CIH Bank", "BMCE"];

const Financement = () => {
  const [params] = useSearchParams();
  const prixParam = Number(params.get("prix"));
  const prixInitial = Number.isFinite(prixParam) && prixParam > 0 ? prixParam : undefined;

  return (
    <>
      <Seo
        title="Financement — simulateur de crédit"
        description="Estimez la mensualité de votre crédit immobilier pour une villa des Villas Ahlam à Bouskoura. Simulateur indicatif et accompagnement bancaire (Attijariwafa, Bank of Africa, CIH, BMCE)."
      />
      <PageHeader
        eyebrow="Financement"
        title="Financez"
        italicWord="votre villa"
        arabic="أحلام"
        intro="Estimez votre mensualité en quelques secondes, puis faites-vous accompagner par nos conseillers pour monter votre dossier auprès des grandes banques marocaines."
      />

      <section className="container-luxe py-16 md:py-24">
        <CreditSimulator prixInitial={prixInitial} />

        {/* Banques partenaires — CDC §8.5 */}
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="gold-rule" />
            <span className="eyebrow text-gold">Accompagnement bancaire</span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {BANQUES.map((banque) => (
              <div
                key={banque}
                className="flex items-center gap-3 rounded-sm border border-border/60 bg-secondary/20 px-4 py-5"
              >
                <Building2 className="h-5 w-5 shrink-0 text-gold" />
                <span className="font-display text-lg text-primary">{banque}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rappel financement — CDC §8.5 */}
        <RappelFinancement />
      </section>

      <CtaBanner />
    </>
  );
};

function RappelFinancement() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (nom.trim() === "" || telephone.trim() === "") {
      toast.error("Renseignez votre nom et votre téléphone.");
      return;
    }
    if (!consentement) {
      toast.error("Merci d'accepter d'être recontacté(e).");
      return;
    }
    setSubmitting(true);
    try {
      await createRappel({
        nom,
        telephone,
        sujet: "financement",
        consentement_rgpd: consentement,
      });
      setDone(true);
      toast.success("Demande envoyée ! Un conseiller financement vous rappelle sous 24 h.");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Envoi impossible. Réessayez ou appelez-nous.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="rappel-financement"
      className="mt-16 scroll-mt-32 rounded-sm border border-border/60 bg-secondary/20 p-6 md:p-10"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_360px] md:items-center">
        <div>
          <div className="eyebrow text-gold">Un conseiller à vos côtés</div>
          <h3 className="mt-2 font-display text-3xl text-primary">
            Être rappelé pour mon financement
          </h3>
          <p className="mt-3 max-w-md text-muted-foreground">
            Laissez vos coordonnées : un conseiller vous aide à optimiser votre apport, votre
            durée et à comparer les offres bancaires. Sans engagement.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Ou appelez directement le{" "}
            <a href={`tel:${CONTACT.telephoneRaw}`} className="text-primary underline">
              {CONTACT.telephone}
            </a>
            .
          </p>
        </div>

        {done ? (
          <div className="rounded-sm border border-gold/40 bg-gold/5 p-6 text-center">
            <p className="font-display text-xl text-primary">Merci !</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Votre demande est transmise. Un conseiller vous rappelle sous 24 h.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className={inputCls}
              autoComplete="name"
              placeholder="Nom complet *"
            />
            <input
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className={inputCls}
              type="tel"
              autoComplete="tel"
              placeholder="Téléphone *"
            />
            <label className="flex items-start gap-3 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={consentement}
                onChange={(e) => setConsentement(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
              />
              <span>
                J'accepte d'être recontacté(e) au sujet de mon financement (loi 09-08). *
              </span>
            </label>
            <Button
              onClick={submit}
              disabled={submitting}
              size="lg"
              className="w-full bg-gradient-gold-bright text-primary"
            >
              {submitting ? "Envoi…" : "Demander à être rappelé"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

export default Financement;
