import { useEffect, useState } from "react";
import { Info, X, BedDouble, Ruler, Building2, Tag, Map } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useCurrentTypology } from "../hooks/useCurrentTypology";
import { BlueprintViewer } from "./BlueprintViewer";

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
}

function Badge({ icon, label }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-primary/85">
      <span className="text-gold" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  );
}

export function TypologyDetailPanel() {
  const { t } = useTranslation("virtualTour");
  const typology = useCurrentTypology();
  const [open, setOpen] = useState<boolean>(false);
  const [blueprintOpen, setBlueprintOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const bedroomLabel = `${typology.bedrooms} ${
    typology.bedrooms > 1
      ? t("ui.typologyPanel.bedroomPlural")
      : t("ui.typologyPanel.bedroomSingular")
  }`;

  return (
    <div className="pointer-events-none absolute bottom-6 right-6 z-20 flex flex-col items-end gap-3">
      {open && (
        <article
          role="dialog"
          aria-label={t("ui.typologyPanel.ficheLabel", { name: typology.name })}
          className="pointer-events-auto relative w-[min(92vw,22rem)] rounded-sm border border-border/60 bg-background/85 p-5 backdrop-blur-md shadow-luxe-xl"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("ui.typologyPanel.closeLabel")}
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-sm text-primary/60 transition-colors hover:text-primary"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mb-3 flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            <span className="eyebrow text-gold">{t("ui.typologyPanel.eyebrow")}</span>
          </div>

          <p className="arabic mb-1 text-sm text-gold/80" aria-hidden="true">
            {typology.arabic}
          </p>
          <h3 className="font-display text-2xl leading-tight text-primary">
            {typology.name}
          </h3>
          <p className="mt-2 font-display text-sm italic text-primary/80">
            {typology.tagline}
          </p>

          <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
            {typology.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge
              icon={<Ruler className="h-3 w-3" />}
              label={typology.surface}
            />
            <Badge
              icon={<Building2 className="h-3 w-3" />}
              label={typology.floor}
            />
            <Badge
              icon={<BedDouble className="h-3 w-3" />}
              label={bedroomLabel}
            />
            {typology.priceRange && (
              <Badge
                icon={<Tag className="h-3 w-3" />}
                label={typology.priceRange}
              />
            )}
          </div>

          {typology.blueprintUrl && (
            <button
              type="button"
              onClick={() => setBlueprintOpen(true)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-gold/70 bg-gradient-gold-bright px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium text-primary transition-opacity hover:opacity-90"
            >
              <Map className="h-3.5 w-3.5" aria-hidden="true" />
              {t("ui.typologyPanel.viewBlueprint")}
            </button>
          )}
        </article>
      )}

      {typology.blueprintUrl && (
        <BlueprintViewer
          open={blueprintOpen}
          src={typology.blueprintUrl}
          caption={typology.blueprintCaption}
          typologyName={typology.name}
          onClose={() => setBlueprintOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={
          open
            ? t("ui.typologyPanel.hide")
            : t("ui.typologyPanel.show")
        }
        className="pointer-events-auto inline-flex items-center gap-2 rounded-sm border border-gold/60 bg-background/80 px-3.5 py-2 text-primary backdrop-blur-md shadow-luxe-md transition-transform duration-300 hover:-translate-y-0.5"
      >
        <Info className="h-4 w-4 text-gold" aria-hidden="true" />
        <span className="eyebrow text-[10px] text-gold">{t("ui.typologyPanel.fiche")}</span>
        <span className="font-display text-xs">{typology.name}</span>
      </button>
    </div>
  );
}

export default TypologyDetailPanel;
