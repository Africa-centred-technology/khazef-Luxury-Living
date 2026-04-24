import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  TYPOLOGIES,
  type ApartmentTypology,
  type TypologyId,
} from "@/components/virtual-tour/data/apartment-typologies";
import safiCoast from "@/assets/safi-coast.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import heroBuilding from "@/assets/hero-building.jpg";

interface RelatedTypologiesProps {
  typology: ApartmentTypology;
}

type TFn = (key: string, options?: Record<string, unknown>) => string;

const TEXT_SHADOW =
  "0 2px 14px hsl(var(--primary) / 0.6), 0 1px 3px hsl(var(--primary) / 0.8)";

const SOFT_SHADOW = "0 1px 4px hsl(var(--primary) / 0.7)";

const IMAGE_SRC_BY_TYPOLOGY: Record<TypologyId, string> = {
  "harbour-t2": safiCoast,
  "atlantic-t3": interiorLiving,
  "penthouse-duplex": heroBuilding,
};

interface CardStat {
  label: string;
  value: string;
}

function buildStats(other: ApartmentTypology, t: TFn): CardStat[] {
  return [
    { label: t("related.stats.surface"), value: other.surface },
    {
      label: t("related.stats.bedrooms"),
      value: `${other.bedrooms} ${t("related.stats.bedroomsShort")}`,
    },
    { label: t("related.stats.floor"), value: other.floor },
  ];
}

export function RelatedTypologies({ typology }: RelatedTypologiesProps) {
  const { t } = useTranslation("apartmentDetail");
  const others = TYPOLOGIES.filter((otherTypology) => otherTypology.id !== typology.id);

  return (
    <section
      className="container-luxe py-20 md:py-28"
      aria-labelledby="related-typologies-heading"
    >
      {/* Eyebrow row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="gold-rule" />
        <span className="eyebrow text-primary/80">{t("related.eyebrow")}</span>
        <span className="arabic text-2xl text-gold" aria-hidden>
          {t("related.arabic")}
        </span>
      </div>

      <h2
        id="related-typologies-heading"
        className="h-display text-primary text-balance max-w-3xl"
      >
        {t("related.title")}
      </h2>

      <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground font-light leading-relaxed">
        {t("related.intro")}
      </p>

      {/* Grid of others */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        {others.map((other) => {
          const src = IMAGE_SRC_BY_TYPOLOGY[other.id];
          const alt = t(`related.imageAlt.${other.id}`);
          const stats = buildStats(other, t);

          return (
            <Link
              key={other.id}
              to={`/apartments/${other.id}`}
              aria-label={t("related.cardAriaLabel", { name: other.name })}
              className="group relative overflow-hidden border border-border/60 bg-background shadow-luxe-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe-xl hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              {/* Image block */}
              <div className="relative overflow-hidden aspect-[16/10] bg-primary">
                <img
                  src={src}
                  alt={alt}
                  className="absolute inset-0 h-full w-full object-cover animate-slow-pan will-change-transform transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                {/* Indigo scrim overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"
                />
                {/* Top-left eyebrow */}
                <span
                  className="absolute top-5 left-6 text-[10px] uppercase tracking-[0.22em] font-medium text-white/85"
                  style={{ textShadow: SOFT_SHADOW }}
                >
                  {t("related.cardEyebrow")}
                </span>
                {/* Arabic name top-right */}
                <span
                  aria-hidden
                  className="absolute top-4 right-6 arabic font-normal text-gold select-none"
                  style={{ fontSize: "48px", lineHeight: 1, textShadow: TEXT_SHADOW }}
                >
                  {other.arabic}
                </span>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-display text-3xl text-primary leading-tight">
                  {other.name}
                </h3>
                <p className="mt-2 text-muted-foreground italic font-light">
                  {other.tagline}
                </p>

                {/* Stats row */}
                <ul className="mt-6 flex flex-wrap items-center gap-2">
                  {stats.map((stat) => (
                    <li
                      key={stat.label}
                      className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-1.5 text-xs font-medium tracking-wide text-primary backdrop-blur-sm"
                    >
                      <span className="uppercase text-[9px] tracking-[0.22em] text-primary/60">
                        {stat.label}
                      </span>
                      <span className="h-3 w-px bg-gold/50" aria-hidden />
                      <span className="text-primary/90">{stat.value}</span>
                    </li>
                  ))}
                </ul>

                {other.priceRange ? (
                  <p className="mt-5 font-display text-xl text-gold">
                    {other.priceRange}
                  </p>
                ) : null}

                {/* Action row */}
                <div className="mt-7 flex items-center justify-between border-t border-border/50 pt-5">
                  <span className="link-luxe text-sm tracking-[0.2em] uppercase text-gold">
                    {t("related.discover")}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pill bar navigator — all 3 typologies with current highlighted */}
      <nav
        aria-label={t("related.navAria")}
        className="mt-16 flex flex-wrap items-center justify-center gap-3"
      >
        <span className="eyebrow text-primary/60 mr-2">
          {t("related.shortcut")}
        </span>
        {TYPOLOGIES.map((item) => {
          const isCurrent = item.id === typology.id;

          if (isCurrent) {
            return (
              <span
                key={item.id}
                aria-current="page"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-gold-bright px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-lg shadow-gold/20"
              >
                <span>{item.name}</span>
                <span className="arabic text-base font-normal" aria-hidden>
                  {item.arabic}
                </span>
              </span>
            );
          }

          return (
            <Link
              key={item.id}
              to={`/apartments/${item.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/80 transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <span>{item.name}</span>
              <span className="arabic text-base font-normal text-gold" aria-hidden>
                {item.arabic}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Final anchor line */}
      <p className="mt-12 text-center text-sm text-muted-foreground font-light">
        {t("related.back")}{" "}
        <Link to="/apartments" className="link-luxe text-gold">
          {t("related.backLink")}
        </Link>
      </p>
    </section>
  );
}

export default RelatedTypologies;
