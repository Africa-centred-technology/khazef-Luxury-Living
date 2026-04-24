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
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ApartmentTypology } from "@/components/virtual-tour/data/apartment-typologies";

interface BookingCTAProps {
  typology: ApartmentTypology;
}

type SlotValue = "this-week" | "fortnight" | "later";

interface BookingFormState {
  readonly fullName: string;
  readonly phone: string;
  readonly email: string;
  readonly slot: SlotValue;
  readonly message: string;
  readonly wantsCallback: boolean;
}

const REASSURANCE_ICONS = [Clock, ShieldCheck, Phone] as const;

const SLOT_VALUES: readonly SlotValue[] = [
  "this-week",
  "fortnight",
  "later",
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
  const { t } = useTranslation("apartmentDetail");
  const [formState, setFormState] =
    useState<BookingFormState>(INITIAL_FORM_STATE);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const reassurances = t("booking.reassurances", {
    returnObjects: true,
  }) as readonly string[];

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

  const intro1 = t("booking.intro1", {
    name: typology.name,
    surface: typology.surface,
  });
  const intro1Parts = intro1.split(/<1>(.*?)<\/1>/);

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
                {t("booking.arabic")}
              </span>
              <span className="eyebrow text-gold">{t("booking.eyebrow")}</span>
            </div>

            <h2
              id="booking-heading"
              className="h-display text-secondary mt-6 max-w-xl"
            >
              {t("booking.title")}
            </h2>

            <div className="mt-6 space-y-4 text-secondary/80 leading-relaxed max-w-xl">
              <p>
                {intro1Parts.map((part, index) =>
                  index === 1 ? (
                    <span key={index} className="text-gold">
                      {part}
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  ),
                )}
              </p>
              <p>{t("booking.intro2")}</p>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3 max-w-xl">
              {reassurances.map((label, index) => {
                const Icon = REASSURANCE_ICONS[index] ?? Clock;
                return (
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
                );
              })}
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
                    {t("booking.success.heading")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("booking.success.bodyPrefix")}
                    <span className="text-primary">{typology.name}</span>
                    {t("booking.success.bodySuffix")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="link-luxe inline-flex items-center gap-2 text-sm text-primary/80 hover:text-gold"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                  {t("booking.success.newRequest")}
                </button>
              </div>
            ) : (
              <>
                <header className="mb-6 space-y-1.5">
                  <h3 className="font-display text-xl text-primary">
                    {t("booking.form.heading")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("booking.form.typologyLine", {
                      name: typology.name,
                      surface: typology.surface,
                    })}
                  </p>
                </header>

                <form onSubmit={handleSubmit} noValidate={false} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="booking-fullname" className={labelClasses}>
                      {t("booking.form.fullName")}
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
                      placeholder={t("booking.form.fullNamePlaceholder")}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="booking-phone" className={labelClasses}>
                        {t("booking.form.phone")}
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
                        placeholder={t("booking.form.phonePlaceholder")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="booking-email" className={labelClasses}>
                        {t("booking.form.email")}
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
                        placeholder={t("booking.form.emailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-slot" className={labelClasses}>
                      {t("booking.form.slot")}
                    </label>
                    <select
                      id="booking-slot"
                      name="slot"
                      required
                      value={formState.slot}
                      onChange={handleFieldChange}
                      className={`${inputClasses} appearance-none bg-background/70 pr-10`}
                    >
                      {SLOT_VALUES.map((value) => (
                        <option key={value} value={value}>
                          {t(`booking.form.slotOptions.${value}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-message" className={labelClasses}>
                      {t("booking.form.message")}{" "}
                      <span className="text-muted-foreground/70 normal-case tracking-normal">
                        {t("booking.form.messageOptional")}
                      </span>
                    </label>
                    <textarea
                      id="booking-message"
                      name="message"
                      rows={3}
                      value={formState.message}
                      onChange={handleFieldChange}
                      className={`${inputClasses} resize-none`}
                      placeholder={t("booking.form.messagePlaceholder")}
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
                      {t("booking.form.wantsCallback")}
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-gold to-gold-dark text-primary hover:from-gold-dark hover:to-gold shadow-luxe"
                  >
                    <span>{t("booking.form.submit")}</span>
                    <ArrowUpRight
                      className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </Button>

                  <p className="pt-1 text-[0.7rem] leading-relaxed text-muted-foreground">
                    {t("booking.form.privacy")}
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
