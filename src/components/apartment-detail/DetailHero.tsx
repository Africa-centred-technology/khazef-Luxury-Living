import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ApartmentTypology, TypologyId } from "@/components/virtual-tour/data/apartment-typologies";
import safiCoast from "@/assets/safi-coast.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import heroBuilding from "@/assets/hero-building.jpg";

interface DetailHeroProps {
  typology: ApartmentTypology;
}

const TEXT_SHADOW =
  "0 2px 14px hsl(var(--primary) / 0.6), 0 1px 3px hsl(var(--primary) / 0.8)";

const SOFT_SHADOW = "0 1px 6px hsl(var(--primary) / 0.75)";

const IMAGE_SRC_BY_TYPOLOGY: Record<TypologyId, string> = {
  "harbour-t2": safiCoast,
  "atlantic-t3": interiorLiving,
  "penthouse-duplex": heroBuilding,
};

export function DetailHero({ typology }: DetailHeroProps) {
  const { t } = useTranslation("apartmentDetail");
  const src = IMAGE_SRC_BY_TYPOLOGY[typology.id];
  const alt = t(`hero.imageAlt.${typology.id}`);

  const bedroomWord =
    typology.bedrooms > 1
      ? t("hero.badges.bedroomPlural")
      : t("hero.badges.bedroomSingular");

  const badges: ReadonlyArray<{ label: string; value: string }> = [
    { label: t("hero.badges.surface"), value: typology.surface },
    { label: t("hero.badges.floor"), value: typology.floor },
    {
      label: t("hero.badges.bedrooms"),
      value: `${typology.bedrooms} ${bedroomWord}`,
    },
    ...(typology.priceRange
      ? [{ label: t("hero.badges.price"), value: typology.priceRange }]
      : []),
  ];

  return (
    <section
      className="relative overflow-hidden bg-primary min-h-[80vh]"
      aria-labelledby="detail-hero-heading"
    >
      {/* Background image with slow pan */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover animate-slow-pan will-change-transform"
        loading="eager"
        decoding="async"
      />

      {/* Triple scrim + gold top rule, matching PageHeader */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/50 to-primary/85"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/35 to-transparent md:to-primary/5"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.4),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
      />

      {/* Arabic watermark behind the title */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 arabic font-normal select-none text-gold/10"
        style={{ fontSize: "clamp(10rem, 22vw, 24rem)", lineHeight: 1 }}
      >
        {typology.arabic}
      </span>

      <div className="container-luxe relative flex min-h-[80vh] flex-col justify-center pt-40 pb-24 md:pt-48 md:pb-32">
        {/* Breadcrumb */}
        <nav
          aria-label={t("hero.breadcrumbAriaLabel")}
          className="mb-8 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium text-white/85"
          style={{ textShadow: "0 1px 3px hsl(var(--primary) / 0.6)" }}
        >
          <Link to="/" className="text-white/85 transition-colors hover:text-gold">
            {t("hero.brand")}
          </Link>
          <ChevronRight className="h-3 w-3 text-gold" aria-hidden />
          <Link to="/apartments" className="text-white/85 transition-colors hover:text-gold">
            {t("hero.apartments")}
          </Link>
          <ChevronRight className="h-3 w-3 text-gold" aria-hidden />
          <span className="text-gold">{typology.name}</span>
        </nav>

        <div className="max-w-4xl relative">
          {/* Eyebrow + Arabic inline accent */}
          <div
            className="flex flex-wrap items-center gap-4 mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <span className="gold-rule" />
            <span
              className="eyebrow text-gold"
              style={{ textShadow: "0 1px 3px hsl(var(--primary) / 0.7)" }}
            >
              {t("hero.eyebrowTypology")} · {typology.surface}
            </span>
            <span
              className="arabic text-2xl ml-2 text-gold/90"
              style={{ textShadow: "0 1px 3px hsl(var(--primary) / 0.7)" }}
            >
              {typology.arabic}
            </span>
          </div>

          {/* Title */}
          <h1
            id="detail-hero-heading"
            className="h-display text-balance text-white opacity-0 animate-fade-in"
            style={{
              animationDelay: "0.25s",
              animationFillMode: "forwards",
              textShadow: TEXT_SHADOW,
            }}
          >
            {typology.name}{" "}
            <em className="font-light font-display text-gold">{typology.tagline}</em>
          </h1>

          {/* Intro */}
          <p
            className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/90 opacity-0 animate-fade-in"
            style={{
              animationDelay: "0.4s",
              animationFillMode: "forwards",
              textShadow: SOFT_SHADOW,
            }}
          >
            {typology.description}
          </p>

          {/* Badges row */}
          <ul
            className="mt-10 flex flex-wrap items-center gap-3 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
          >
            {badges.map((badge) => (
              <li
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md"
                style={{ textShadow: SOFT_SHADOW }}
              >
                <span className="uppercase text-[9px] tracking-[0.22em] text-gold/90">
                  {badge.label}
                </span>
                <span className="h-3 w-px bg-gold/40" aria-hidden />
                <span className="text-white/95">{badge.value}</span>
              </li>
            ))}
          </ul>

          {/* CTA row */}
          <div
            className="mt-10 flex flex-wrap items-center gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            <Link
              to="/virtual-tour"
              aria-label={t("hero.viewIn360Aria", { name: typology.name })}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold-bright px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {t("hero.viewIn360")}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>

            <a
              href="#booking"
              aria-label={t("hero.bookAria")}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/5 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              style={{ textShadow: SOFT_SHADOW }}
            >
              {t("hero.book")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailHero;
