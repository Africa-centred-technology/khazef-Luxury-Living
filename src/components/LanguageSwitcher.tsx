import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

import { SUPPORTED_LOCALES, type SupportedLocale } from "@/lib/i18n";

/** Libellé court affiché par langue. */
const LABELS: Record<SupportedLocale, string> = { fr: "FR", ar: "ع", en: "EN" };
/** Clé d'aria-label i18n par langue. */
const ARIA_KEYS: Record<SupportedLocale, string> = {
  fr: "language.switchToFrench",
  ar: "language.switchToArabic",
  en: "language.switchToEnglish",
};

interface LanguageSwitcherProps {
  /** Use white text when the switcher sits over a hero image. */
  onImage?: boolean;
  /** Compact variant for the mobile drawer (stacked full-width). */
  variant?: "inline" | "stack";
}

/**
 * Two-state language switcher (FR ↔ AR). Persists the choice via
 * i18next-browser-languagedetector (localStorage key: luxuryliving-lang)
 * and flips `<html dir>` + `<html lang>` through the i18n module.
 */
export function LanguageSwitcher({ onImage = false, variant = "inline" }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const current = (i18n.language?.split("-")[0] ?? "fr") as SupportedLocale;

  const handleSwitch = (next: SupportedLocale) => {
    if (next === current) return;
    void i18n.changeLanguage(next);
  };

  const baseLabel = onImage ? "text-white/85" : "text-primary/80";
  const activeLabel = "text-gold";
  const shadow = onImage ? { textShadow: "0 1px 4px hsl(var(--primary) / 0.8)" } : undefined;

  if (variant === "stack") {
    return (
      <div className="flex items-center gap-2">
        <Languages className="h-4 w-4 text-gold" aria-hidden />
        <span className="eyebrow text-[10px] text-gold">{t("language.label")}</span>
        <div className="flex items-center gap-1 ml-auto">
          {SUPPORTED_LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => handleSwitch(locale)}
              aria-pressed={locale === current}
              aria-label={t(ARIA_KEYS[locale])}
              className={[
                "px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] border transition-all duration-300",
                locale === current
                  ? "border-gold bg-gradient-gold-bright text-primary"
                  : "border-border/60 text-primary/75 hover:border-gold/70 hover:text-gold",
              ].join(" ")}
            >
              {LABELS[locale]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-2"
      role="group"
      aria-label={t("language.label")}
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => handleSwitch(locale)}
          aria-pressed={locale === current}
          aria-label={t(ARIA_KEYS[locale])}
          style={locale === current ? undefined : shadow}
          className={[
            "px-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
            locale === current ? activeLabel : `${baseLabel} hover:text-gold`,
          ].join(" ")}
        >
          {LABELS[locale]}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
