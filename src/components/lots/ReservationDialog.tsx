import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Home, MessageCircle, Phone, User, Wallet } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
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
import { CONTACT, PRIX, formatDH, whatsappLien } from "@/data/villas-ahlam";
import { RENDERS } from "@/data/renders";
import { ApiError, createReservation } from "@/lib/api";

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

const STEPS = [
  { key: "lot", label: "Votre lot", icon: Home },
  { key: "coordonnees", label: "Coordonnées", icon: User },
  { key: "financement", label: "Financement", icon: Wallet },
  { key: "confirmation", label: "Confirmation", icon: Check },
] as const;

/**
 * Tunnel de réservation en plusieurs étapes — CDC §7.6.
 * Wizard : Votre lot → Coordonnées → Financement → Confirmation → Succès.
 * Sans backend au lancement, la demande part par WhatsApp vers le commercial
 * (fallback prévu, 06 61 22 86 19) avec le n° de lot pré-rempli.
 * À terme : Supabase + e-mail + verrou "en cours".
 */
export function ReservationDialog({ lot, open, onOpenChange }: ReservationDialogProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  if (!lot) return null;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    setStep(0);
    setForm(EMPTY);
    setDone(false);
  };

  const close = (next: boolean) => {
    onOpenChange(next);
    if (!next) setTimeout(reset, 300);
  };

  const canNext = (): boolean => {
    if (step === 1) return form.nom.trim() !== "" && form.telephone.trim() !== "";
    if (step === 3) return form.consentement;
    return true;
  };

  const next = () => {
    if (!canNext()) {
      toast.error(
        step === 1
          ? "Renseignez au moins votre nom et votre téléphone."
          : "Merci d'accepter d'être recontacté(e).",
      );
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  /** Message WhatsApp de secours, utilise si l'API est injoignable. */
  const messageWhatsapp = (): string =>
    [
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

  const submit = async () => {
    if (!form.consentement) {
      toast.error("Merci d'accepter d'être recontacté(e).");
      return;
    }
    setSubmitting(true);
    try {
      const result = await createReservation({
        lot_numero: lot.numero,
        nom: form.nom,
        telephone: form.telephone,
        email: form.email || undefined,
        ville_pays: form.villePays || undefined,
        financement: form.financement || "indecis",
        message: form.message || undefined,
        consentement_rgpd: form.consentement,
      });
      // Le lot est passe "en cours" cote backend : on rafraichit la carte.
      await queryClient.invalidateQueries({ queryKey: ["lots"] });
      setDone(true);
      toast.success(result.message);
    } catch (err) {
      if (err instanceof ApiError) {
        // Erreur metier (ex. lot deja reserve entre-temps, RGPD) : on informe.
        toast.error(err.message);
        if (err.status === 400 && err.fields?.lot_numero) {
          // Lot pris pendant la saisie : on rafraichit pour refleter le nouveau statut.
          await queryClient.invalidateQueries({ queryKey: ["lots"] });
        }
      } else {
        // API injoignable : repli WhatsApp (degradation gracieuse, CDC §7.6).
        window.open(whatsappLien(messageWhatsapp()), "_blank", "noopener,noreferrer");
        setDone(true);
        toast.success("Demande envoyée par WhatsApp ! Un conseiller vous rappelle sous 24 h.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        {done ? (
          <SuccessView lot={lot} onClose={() => close(false)} />
        ) : (
          <div className="grid md:grid-cols-[1fr_240px]">
            {/* Colonne principale */}
            <div className="p-6 md:p-8 order-2 md:order-1">
              <DialogHeader className="mb-6 text-left">
                <DialogTitle className="font-display text-2xl text-primary">
                  Réserver le lot {lot.numero}
                </DialogTitle>
                <DialogDescription>
                  Étape {step + 1} sur {STEPS.length} · {STEPS[step].label}
                </DialogDescription>
              </DialogHeader>

              <Stepper current={step} />

              <div className="mt-6 min-h-[240px]">
                {step === 0 && <StepLot lot={lot} />}
                {step === 1 && <StepCoordonnees form={form} set={set} />}
                {step === 2 && <StepFinancement form={form} set={set} />}
                {step === 3 && <StepConfirmation form={form} lot={lot} set={set} />}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                    <ChevronLeft className="h-4 w-4" /> Retour
                  </Button>
                ) : (
                  <span />
                )}

                {step < STEPS.length - 1 ? (
                  <Button onClick={next} className="bg-primary text-primary-foreground">
                    Continuer <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={submit}
                    size="lg"
                    disabled={submitting}
                    className="bg-gradient-gold-bright text-primary"
                  >
                    {submitting ? "Envoi…" : "Envoyer ma demande"}
                  </Button>
                )}
              </div>
            </div>

            {/* Récap latéral */}
            <SummaryPanel lot={lot} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Stepper ---------- */

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const active = i === current;
        const passed = i < current;
        return (
          <li key={s.key} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-colors ${
                passed
                  ? "border-primary bg-primary text-primary-foreground"
                  : active
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
              }`}
            >
              {passed ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={`h-px flex-1 transition-colors ${passed ? "bg-primary" : "bg-border"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Steps ---------- */

function StepLot({ lot }: { lot: Lot }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Vous êtes sur le point de réserver ce lot. La réservation est sans engagement :
        un conseiller vous rappelle pour finaliser.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Info label="Lot" value={`N° ${lot.numero}`} />
        <Info label="Îlot" value={lot.ilot} />
        <Info label="Surface" value={`${lot.surfaceM2} m²`} />
        <Info label="Hauteur" value={lot.hauteur} />
      </div>
      <div className="overflow-hidden rounded-sm border border-border/60 bg-secondary/40">
        <img
          src={RENDERS.villaDay}
          alt="Villa R+1 contemporaine — rendu illustratif"
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="p-4">
          <div className="eyebrow text-gold mb-1">Imaginez votre villa</div>
          <p className="text-sm text-muted-foreground">
            Une villa R+1 contemporaine sur ce lot. Rendu illustratif.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepCoordonnees({
  form,
  set,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <Field label="Nom complet *">
        <input
          required
          value={form.nom}
          onChange={(e) => set("nom", e.target.value)}
          className={inputCls}
          autoComplete="name"
          placeholder="Votre nom et prénom"
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
            placeholder="06 …"
          />
        </Field>
        <Field label="E-mail">
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls}
            autoComplete="email"
            placeholder="vous@exemple.com"
          />
        </Field>
      </div>
      <Field label="Ville / Pays">
        <input
          value={form.villePays}
          onChange={(e) => set("villePays", e.target.value)}
          className={inputCls}
          placeholder="Utile si vous résidez à l'étranger (MRE)"
        />
      </Field>
    </div>
  );
}

function StepFinancement({
  form,
  set,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Mode de financement envisagé
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(["cash", "credit"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => set("financement", opt)}
              className={`rounded-sm border p-4 text-left transition-colors ${
                form.financement === opt
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/60"
              }`}
            >
              <div className="font-display text-lg text-primary">
                {opt === "cash" ? "Cash" : "Crédit"}
              </div>
              <div className="text-xs text-muted-foreground">
                {opt === "cash" ? "Paiement comptant" : "Accompagnement bancaire"}
              </div>
            </button>
          ))}
        </div>
      </div>
      <Field label="Message (facultatif)">
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={4}
          className={inputCls}
          placeholder="Une question, une préférence d'orientation, un délai…"
        />
      </Field>
    </div>
  );
}

function StepConfirmation({
  form,
  lot,
  set,
}: {
  form: FormState;
  lot: Lot;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-sm border border-border/60 divide-y divide-border/60">
        <Recap label="Lot" value={`N° ${lot.numero} · ${lot.surfaceM2} m² · îlot ${lot.ilot}`} />
        <Recap label="Prix indicatif" value={`À partir de ${formatDH(lot.prixIndicatif)}`} />
        <Recap label="Nom" value={form.nom || "—"} />
        <Recap label="Téléphone" value={form.telephone || "—"} />
        {form.email && <Recap label="E-mail" value={form.email} />}
        {form.villePays && <Recap label="Ville / Pays" value={form.villePays} />}
        {form.financement && (
          <Recap label="Financement" value={form.financement === "cash" ? "Cash" : "Crédit"} />
        )}
      </div>

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

      <p className="rounded-sm bg-secondary/40 p-3 text-center text-xs text-muted-foreground">
        En envoyant, votre demande est transmise au conseiller qui vous rappelle au{" "}
        {CONTACT.telephone} sous 24 h.
      </p>
    </div>
  );
}

function SuccessView({ lot, onClose }: { lot: Lot; onClose: () => void }) {
  return (
    <div className="p-8 md:p-12 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold-bright">
        <Check className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-display text-3xl text-primary">Demande envoyée</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
        Votre demande pour le <strong>lot {lot.numero}</strong> ({lot.surfaceM2} m²) est
        transmise. Un conseiller vous rappelle sous 24 h pour finaliser votre réservation.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild variant="outline">
          <a href={`tel:${CONTACT.telephoneRaw}`}>
            <Phone className="h-4 w-4" /> {CONTACT.telephone}
          </a>
        </Button>
        <Button onClick={onClose} className="bg-primary text-primary-foreground">
          Fermer
        </Button>
      </div>
    </div>
  );
}

/* ---------- Récap latéral ---------- */

function SummaryPanel({ lot }: { lot: Lot }) {
  return (
    <aside className="order-1 md:order-2 bg-gradient-night p-6 text-background md:rounded-r-sm">
      <div className="eyebrow text-gold">Récapitulatif</div>
      <div className="mt-3 font-display text-4xl">Lot {lot.numero}</div>
      <div className="mt-1 text-sm opacity-90">
        {lot.surfaceM2} m² · îlot {lot.ilot} · {lot.hauteur}
      </div>

      <div className="my-6 h-px bg-background/15" />

      <div className="eyebrow text-background/70">Prix indicatif</div>
      <div className="font-display text-2xl text-gold">
        {formatDH(lot.prixIndicatif)}
      </div>
      <p className="mt-1 text-xs opacity-75">
        {lot.surfaceM2} × {PRIX.prixM2.toLocaleString("fr-FR")} DH/m² · prix exact sur demande
      </p>

      <a
        href={whatsappLien(
          `Bonjour, j'ai une question sur le lot ${lot.numero} (${lot.surfaceM2} m²) des Villas Ahlam.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm text-gold hover:underline"
      >
        <MessageCircle className="h-4 w-4" /> Une question ? WhatsApp
      </a>
    </aside>
  );
}

/* ---------- Petits composants ---------- */

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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border/60 bg-secondary/30 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-lg text-primary">{value}</div>
    </div>
  );
}

function Recap({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2.5">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  );
}
