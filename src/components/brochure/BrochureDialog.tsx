import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApiError, createBrochureLead } from "@/lib/api";

/** Chemin de la plaquette (a deposer dans public/). */
const BROCHURE_URL = "/brochure-villas-ahlam.pdf";

/**
 * Lead magnet : telechargement de la brochure contre coordonnees — CDC §8.7.
 * Le lead est enregistre cote backend, puis le PDF se telecharge.
 *
 * `trigger` permet de fournir son propre bouton ; sinon un bouton par defaut.
 */
interface BrochureDialogProps {
  trigger?: React.ReactNode;
}

export function BrochureDialog({ trigger }: BrochureDialogProps) {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const telechargerPdf = () => {
    const a = document.createElement("a");
    a.href = BROCHURE_URL;
    a.download = "Brochure-Les-Villas-Ahlam.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const submit = async () => {
    if (!email.trim() && !telephone.trim()) {
      toast.error("Renseignez votre e-mail ou votre téléphone.");
      return;
    }
    if (!consentement) {
      toast.error("Merci d'accepter d'être recontacté(e).");
      return;
    }
    setSubmitting(true);
    try {
      await createBrochureLead({
        nom: nom || undefined,
        email: email || undefined,
        telephone: telephone || undefined,
        consentement_rgpd: consentement,
      });
      toast.success("Merci ! Votre brochure se télécharge.");
      telechargerPdf();
      setOpen(false);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Envoi impossible. Réessayez plus tard.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> Télécharger la brochure
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">
            Recevez la brochure
          </DialogTitle>
          <DialogDescription>
            Plans, ambiances et disponibilités des Villas Ahlam. Laissez vos coordonnées
            pour la recevoir.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className={inputCls}
            autoComplete="name"
            placeholder="Nom complet"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            type="email"
            autoComplete="email"
            placeholder="E-mail"
          />
          <input
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className={inputCls}
            type="tel"
            autoComplete="tel"
            placeholder="Téléphone"
          />
          <p className="text-xs text-muted-foreground">
            Indiquez au moins un e-mail ou un téléphone.
          </p>
          <label className="flex items-start gap-3 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={consentement}
              onChange={(e) => setConsentement(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
            />
            <span>J'accepte d'être recontacté(e) (loi 09-08).</span>
          </label>

          <Button
            onClick={submit}
            disabled={submitting}
            size="lg"
            className="w-full gap-2 bg-gradient-gold-bright text-primary"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Recevoir la brochure
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const inputCls =
  "w-full border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
