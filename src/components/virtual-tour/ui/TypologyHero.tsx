import { ArrowUpRight, BedDouble, Ruler, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTourStore } from "../hooks/useTourStore";
import {
  TYPOLOGIES,
  type ApartmentTypology,
  type TypologyId,
} from "../data/apartment-typologies";

function pickStartRoom(typology: ApartmentTypology): string {
  const living = typology.rooms.find((r) => r.kind === "living");
  return (living?.kind ?? typology.rooms[0]?.kind ?? "living") as string;
}

function scrollToStage() {
  if (typeof window === "undefined") return;
  const el = document.getElementById("immersive-stage");
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

interface TypologyHeroCardProps {
  typology: ApartmentTypology;
  isActive: boolean;
  onVisit: (id: TypologyId) => void;
  index: number;
}

function TypologyHeroCard({ typology, isActive, onVisit, index }: TypologyHeroCardProps) {
  const { t } = useTranslation("virtualTour");
  return (
    <article
      className={[
        "group relative flex h-full flex-col border bg-secondary/40 p-8 transition-shadow duration-500 hover:shadow-luxe-md",
        isActive ? "border-gold/60 shadow-luxe-md" : "border-border/60",
      ].join(" ")}
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className="font-display text-xs text-gold/80"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="gold-rule" aria-hidden="true" />
        <span className="eyebrow text-gold">{t("ui.typologyHero.cardEyebrow")}</span>
      </div>

      <p className="arabic mb-1 text-sm text-gold/80" aria-hidden="true">
        {typology.arabic}
      </p>
      <h3 className="mb-2 font-display text-3xl text-primary">
        {typology.name}
      </h3>
      <p className="mb-4 font-display text-base italic text-primary/80">
        {typology.tagline}
      </p>

      <p className="mb-6 font-light leading-relaxed text-muted-foreground">
        {typology.description}
      </p>

      <dl className="mb-8 grid grid-cols-3 gap-3 border-y border-border/60 py-4">
        <div className="flex flex-col items-start gap-1">
          <dt className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <BedDouble className="h-3 w-3 text-gold" aria-hidden="true" />
            {t("ui.typologyHero.bedroomsLabel")}
          </dt>
          <dd className="font-display text-lg text-primary">
            {typology.bedrooms}
          </dd>
        </div>
        <div className="flex flex-col items-start gap-1">
          <dt className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <Ruler className="h-3 w-3 text-gold" aria-hidden="true" />
            {t("ui.typologyHero.surfaceLabel")}
          </dt>
          <dd className="font-display text-lg text-primary">
            {typology.surface}
          </dd>
        </div>
        <div className="flex flex-col items-start gap-1">
          <dt className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <Building2 className="h-3 w-3 text-gold" aria-hidden="true" />
            {t("ui.typologyHero.floorLabel")}
          </dt>
          <dd className="font-display text-sm leading-tight text-primary">
            {typology.floor}
          </dd>
        </div>
      </dl>

      {typology.priceRange && (
        <p className="mb-6 font-display text-sm text-primary/80">
          {typology.priceRange}
        </p>
      )}

      <div className="mt-auto">
        <button
          type="button"
          onClick={() => onVisit(typology.id)}
          className="group/btn inline-flex items-center gap-2 border-b border-gold pb-1 font-display text-sm text-primary transition-colors hover:text-gold"
        >
          <span>{t("ui.typologyHero.visitButton")}</span>
          <ArrowUpRight
            className="h-4 w-4 text-gold transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}

export function TypologyHero() {
  const { t } = useTranslation("virtualTour");
  const currentTypology = useTourStore((s) => s.currentTypology);

  const handleVisit = (id: TypologyId) => {
    const target = TYPOLOGIES.find((t) => t.id === id);
    if (!target) return;
    const store = useTourStore.getState();
    store.setTypology(id);
    store.setRoom(pickStartRoom(target) as never);
    scrollToStage();
  };

  return (
    <section className="container-luxe py-24" aria-label={t("ui.typologyHero.sectionLabel")}>
      <header className="mb-12 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="gold-rule" aria-hidden="true" />
          <span className="eyebrow text-gold">{t("ui.typologyHero.eyebrow")}</span>
        </div>
        <h2 className="h-section font-display text-primary">
          {t("ui.typologyHero.titlePart1")} <em className="text-gold">{t("ui.typologyHero.titleAccent")}</em>
        </h2>
        <p className="max-w-2xl font-light text-muted-foreground">
          {t("ui.typologyHero.paragraph")}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TYPOLOGIES.map((typology, index) => (
          <TypologyHeroCard
            key={typology.id}
            typology={typology}
            index={index}
            isActive={typology.id === currentTypology}
            onVisit={handleVisit}
          />
        ))}
      </div>
    </section>
  );
}

export default TypologyHero;
