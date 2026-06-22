import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Lot } from "@/data/lots";
import { CONTACT, formatDH, whatsappLien } from "@/data/villas-ahlam";

interface ReservationDialogProps {
  lot: Lot | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormState {
  nom: string;
  telephone: string;
  email: string;
  villePays: string;
  financement: "cash" | "credit" | "";
  message: string;
  consentement: boolean;
}

const EMPTY: FormState = {
  nom: "",
  telephone: "",
  email: "",
  villePays: "",
  financement: "",
  message: "",
  consentement: false,
};

/**
 * Tunnel de réservation en ligne — CDC §7.6.
 * Sans backend au lancement : la demande part par WhatsApp vers le commercial
 * (fallback prévu, n° 06 61 22 86 19) avec le n° de lot pré-rempli.
 * À terme, brancher sur Supabase + e-mail (verrou "en cours").
 */
export function ReservationDialog({ lot, open, onOpenChange }: ReservationDialogProps) {
  const [form, setForm] = useState<FormState>(EMPTY);

  if (!lot) return null;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.telephone || !form.consentement) {
      toast.error("Merci de renseigner votre nom, téléphone et le consentement.");
      return;
    }

    const lignes = [
      `Bonjour, je souhaite réserver le LOT ${lot.numero} (${lot.surfaceM2} m², îlot ${lot.ilot}) du projet Les Villas Ahlam.`,
      `Prix indicatif : à partir de ${formatDH(lot.prixIndicatif)}.`,
      ``,
      `Nom : ${form.nom}`,
      `Téléphone : ${form.telephone}`,
      form.email && `E-mail : ${form.email}`,
      form.villePays && `Ville/Pays : ${form.villePays}`,
      form.financement && `Financement : ${form.financement === "cash" ? "Cash" : "Crédit"}`,
      form.message && `Message : ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLien(lignes), "_blank", "noopener,noreferrer");
    toast.success("Demande prête ! Un conseiller vous rappelle sous 24 h.");
    setForm(EMPTY);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">
            Réserver le lot {lot.numero}
          </DialogTitle>
          <DialogDescription>
            {lot.surfaceM2} m² · {lot.hauteur} · îlot {lot.ilot} — à partir de{" "}
            <strong className="text-foreground">{formatDH(lot.prixIndicatif)}</strong>.
            Prix exact confirmé par votre conseiller.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nom complet *">
            <input
              required
              value={form.nom}
              onChange={(e) => set("nom", e.target.value)}
              className={inputCls}
              autoComplete="name"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Téléphone *">
              <input
                required
                type="tel"
                value={form.telephone}
                onChange={(e) => set("telephone", e.target.value)}
                className={inputCls}
                autoComplete="tel"
              />
            </Field>
            <Field label="E-mail">
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
                autoComplete="email"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Ville / Pays">
              <input
                value={form.villePays}
                onChange={(e) => set("villePays", e.target.value)}
                className={inputCls}
                placeholder="Utile pour la diaspora (MRE)"
              />
            </Field>
            <Field label="Financement">
              <select
                value={form.financement}
                onChange={(e) => set("financement", e.target.value as FormState["financement"])}
                className={inputCls}
              >
                <option value="">—</option>
                <option value="cash">Cash</option>
                <option value="credit">Crédit</option>
              </select>
            </Field>
          </div>

          <Field label="Message">
            <textarea
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              rows={3}
              className={inputCls}
            />
          </Field>

          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={form.consentement}
              onChange={(e) => set("consentement", e.target.checked)}
              className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
            />
            <span>
              J'accepte d'être recontacté(e) au sujet de ma demande de réservation
              (conformément à la loi 09-08). *
            </span>
          </label>

          <Button type="submit" size="lg" className="w-full bg-gradient-gold-bright text-primary">
            Envoyer ma demande
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Vous serez rappelé(e) au {CONTACT.telephone} sous 24 h.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const inputCls =
  "w-full border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
