import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ApartmentTypology } from "@/components/virtual-tour/data/apartment-typologies";

interface BookingCTAProps {
  typology: ApartmentTypology;
}

interface ReassuranceItem {
  readonly icon: typeof Clock;
  readonly label: string;
}

interface SlotOption {
  readonly value: "this-week" | "fortnight" | "later";
  readonly label: string;
}

interface BookingFormState {
  readonly fullName: string;
  readonly phone: string;
  readonly email: string;
  readonly slot: SlotOption["value"];
  readonly message: string;
  readonly wantsCallback: boolean;
}

const REASSURANCE_ITEMS: readonly ReassuranceItem[] = [
  { icon: Clock, label: "Sur rendez-vous · 7j/7" },
  { icon: ShieldCheck, label: "Confidentialité absolue" },
  { icon: Phone, label: "Conciergerie dédiée" },
] as const;

const SLOT_OPTIONS: readonly SlotOption[] = [
  { value: "this-week", label: "Cette semaine" },
  { value: "fortnight", label: "Dans 15 jours" },
  { value: "later", label: "Plus tard" },
] as const;

const CONTACT_PHONE = "+212 5 24 00 00 00";
const CONTACT_EMAIL = "conciergerie@khazef.ma";

const INITIAL_FORM_STATE: BookingFormState = {
  fullName: "",
  phone: "",
  email: "",
  slot: "this-week",
  message: "",
  wantsCallback: false,
};

const inputClasses =
  "w-full rounded-md border border-gold/30 bg-background/70 px-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const labelClasses = "eyebrow text-primary/70 text-[0.7rem] tracking-[0.18em]";

export function BookingCTA({ typology }: BookingCTAProps) {
  const [formState, setFormState] =
    useState<BookingFormState>(INITIAL_FORM_STATE);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleFieldChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = event.target;
    setFormState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCallbackChange = (checked: boolean): void => {
    setFormState((previous) => ({
      ...previous,
      wantsCallback: checked,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = (): void => {
    setFormState(INITIAL_FORM_STATE);
    setIsSubmitted(false);
  };

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="bg-primary relative overflow-hidden py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pattern-zellige absolute inset-0 opacity-10"
      />

      <div className="container-luxe relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-20 lg:items-center">
          {/* LEFT — editorial sell */}
          <div className="text-secondary">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span
                className="arabic text-lg md:text-xl text-gold/80"
                lang="ar"
                dir="rtl"
              >
                زيارة خاصة
              </span>
              <span className="eyebrow text-gold">Visite privée</span>
            </div>

            <h2
              id="booking-heading"
              className="h-display text-secondary mt-6 max-w-xl"
            >
              Entrez chez vous, avant tout le monde.
            </h2>

            <div className="mt-6 space-y-4 text-secondary/80 leading-relaxed max-w-xl">
              <p>
                Découvrez en avant-première la typologie{" "}
                <span className="text-gold">{typology.name}</span> ({" "}
                {typology.surface}) accompagné par notre conciergerie. Une visite
                calibrée à votre rythme, sans agitation commerciale.
              </p>
              <p>
                Un seul interlocuteur vous reçoit, plans en main, pour répondre
                précisément à vos questions — orientations, matières, finitions
                sur mesure.
              </p>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3 max-w-xl">
              {REASSURANCE_ITEMS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 text-sm text-secondary/85"
                >
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 border-t border-gold/30 pt-6 max-w-xl sm:flex-row sm:items-center sm:gap-10">
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-sm text-secondary/85 transition-colors hover:text-gold"
              >
                <Phone
                  className="h-4 w-4 text-gold transition-transform group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>{CONTACT_PHONE}</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3 text-sm text-secondary/85 transition-colors hover:text-gold"
              >
                <Mail
                  className="h-4 w-4 text-gold transition-transform group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>{CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* RIGHT — booking form card */}
          <div className="bg-background/95 backdrop-blur-md p-6 md:p-8 border border-gold/40 shadow-luxe-xl rounded-sm">
            {isSubmitted ? (
              <div className="flex flex-col items-start gap-6 py-6">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold"
                  aria-hidden="true"
                >
                  <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <div className="space-y-3">
                  <h3 className="font-display text-2xl text-primary">
                    Merci — nous vous rappelons sous 24 h
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Votre demande de visite privée pour la typologie{" "}
                    <span className="text-primary">{typology.name}</span> a bien
                    été transmise à notre conciergerie. Elle vous contactera au
                    créneau convenu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="link-luxe inline-flex items-center gap-2 text-sm text-primary/80 hover:text-gold"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                  Nouvelle demande
                </button>
              </div>
            ) : (
              <>
                <header className="mb-6 space-y-1.5">
                  <h3 className="font-display text-xl text-primary">
                    Réservez votre visite privée
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Typologie —{" "}
                    <span className="text-primary/80">{typology.name}</span> ·{" "}
                    {typology.surface}
                  </p>
                </header>

                <form onSubmit={handleSubmit} noValidate={false} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="booking-fullname" className={labelClasses}>
                      Nom complet
                    </label>
                    <input
                      id="booking-fullname"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={formState.fullName}
                      onChange={handleFieldChange}
                      className={inputClasses}
                      placeholder="Mme / M."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="booking-phone" className={labelClasses}>
                        Téléphone
                      </label>
                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={formState.phone}
                        onChange={handleFieldChange}
                        className={inputClasses}
                        placeholder="+212 …"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="booking-email" className={labelClasses}>
                        Email
                      </label>
                      <input
                        id="booking-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formState.email}
                        onChange={handleFieldChange}
                        className={inputClasses}
                        placeholder="vous@exemple.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-slot" className={labelClasses}>
                      Créneau souhaité
                    </label>
                    <select
                      id="booking-slot"
                      name="slot"
                      required
                      value={formState.slot}
                      onChange={handleFieldChange}
                      className={`${inputClasses} appearance-none bg-background/70 pr-10`}
                    >
                      {SLOT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-message" className={labelClasses}>
                      Message <span className="text-muted-foreground/70 normal-case tracking-normal">(optionnel)</span>
                    </label>
                    <textarea
                      id="booking-message"
                      name="message"
                      rows={3}
                      value={formState.message}
                      onChange={handleFieldChange}
                      className={`${inputClasses} resize-none`}
                      placeholder="Précisez vos attentes, accompagnants, etc."
                    />
                  </div>

                  <label
                    htmlFor="booking-callback"
                    className="flex items-start gap-3 cursor-pointer pt-1"
                  >
                    <Checkbox
                      id="booking-callback"
                      checked={formState.wantsCallback}
                      onCheckedChange={(checked) =>
                        handleCallbackChange(checked === true)
                      }
                      className="mt-0.5 border-gold/60 data-[state=checked]:bg-gold data-[state=checked]:text-primary data-[state=checked]:border-gold"
                    />
                    <span className="text-sm text-primary/80">
                      Je souhaite être rappelé
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-gold to-gold-dark text-primary hover:from-gold-dark hover:to-gold shadow-luxe"
                  >
                    <span>Demander ma visite</span>
                    <ArrowUpRight
                      className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </Button>

                  <p className="pt-1 text-[0.7rem] leading-relaxed text-muted-foreground">
                    Vos données restent strictement confidentielles et ne sont
                    utilisées que pour cette demande.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
