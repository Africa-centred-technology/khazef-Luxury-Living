import { useEffect, useState } from "react";
import { BedDouble, ChevronDown, X, FileText } from "lucide-react";
import { Link } from "react-router-dom";
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

interface CardProps {
  typology: ApartmentTypology;
  isActive: boolean;
  onSelect: (id: TypologyId) => void;
  layout?: "row" | "stack";
}

function TypologyCard({ typology, isActive, onSelect, layout = "row" }: CardProps) {
  const { t } = useTranslation("virtualTour");
  const base =
    "group pointer-events-auto relative flex items-center gap-3 overflow-hidden rounded-sm border px-4 py-2.5 text-left transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60";
  const activeStyle =
    "border-gold bg-gradient-gold text-primary shadow-luxe-md";
  const idleStyle =
    "border-border/60 bg-background/75 text-primary backdrop-blur-md hover:-translate-y-0.5 hover:border-gold/70";

  const bedroomWord =
    typology.bedrooms > 1
      ? t("ui.selector.bedroomPlural")
      : t("ui.selector.bedroomSingular");

  return (
    <button
      type="button"
      onClick={() => onSelect(typology.id)}
      aria-pressed={isActive}
      aria-label={t("ui.selector.chooseAria", { name: typology.name })}
      className={[
        base,
        isActive ? activeStyle : idleStyle,
        layout === "stack" ? "w-full" : "",
      ].join(" ")}
    >
      <span className="flex flex-col items-start gap-0.5">
        <span
          className={[
            "arabic text-[11px] leading-none",
            isActive ? "text-primary/70" : "text-gold/80",
          ].join(" ")}
          aria-hidden="true"
        >
          {typology.arabic}
        </span>
        <span className="font-display text-lg leading-tight">
          {typology.name}
        </span>
        <span
          className={[
            "text-[11px] leading-tight",
            isActive ? "text-primary/70" : "text-muted-foreground",
          ].join(" ")}
        >
          {typology.surface} · {typology.floor}
        </span>
      </span>
      <span
        className={[
          "ml-2 inline-flex items-center gap-1 border-l pl-3",
          isActive ? "border-primary/30 text-primary" : "border-border/60 text-primary/80",
        ].join(" ")}
        aria-label={`${typology.bedrooms} ${bedroomWord}`}
      >
        <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="font-display text-sm leading-none">{typology.bedrooms}</span>
      </span>
    </button>
  );
}

export function ApartmentSelector() {
  const { t } = useTranslation("virtualTour");
  const currentTypology = useTourStore((s) => s.currentTypology);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  const handleSelect = (id: TypologyId) => {
    const target = TYPOLOGIES.find((t) => t.id === id);
    if (!target) return;
    const store = useTourStore.getState();
    store.setTypology(id);
    const nextRoom = pickStartRoom(target);
    // setRoom is typed to RoomId; the typologies use the same shared vocab.
    store.setRoom(nextRoom as never);
    setMobileOpen(false);
  };

  const activeName =
    TYPOLOGIES.find((t) => t.id === currentTypology)?.name ??
    t("ui.selector.triggerFallback");

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label={t("ui.selector.desktopLabel")}
        className="pointer-events-none absolute left-1/2 top-6 z-30 hidden -translate-x-1/2 lg:block"
      >
        <ul className="pointer-events-auto flex items-stretch gap-2 rounded-sm border border-border/60 bg-background/65 p-1.5 backdrop-blur-md shadow-luxe-md">
          {TYPOLOGIES.map((typo) => (
            <li key={typo.id}>
              <TypologyCard
                typology={typo}
                isActive={typo.id === currentTypology}
                onSelect={handleSelect}
              />
            </li>
          ))}
        </ul>
        <div className="pointer-events-auto mt-2 flex justify-center">
          <Link
            to={`/apartments/${currentTypology}`}
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-gold hover:text-primary transition-colors bg-background/70 backdrop-blur-md px-3 py-1.5 border border-gold/40"
          >
            <FileText className="h-3 w-3" aria-hidden="true" />
            {t("ui.selector.viewFullSheet")}
          </Link>
        </div>
      </nav>

      {/* Mobile trigger */}
      <div className="pointer-events-none absolute left-1/2 top-5 z-30 -translate-x-1/2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="typology-sheet"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-sm border border-gold/60 bg-background/80 px-4 py-2 text-primary backdrop-blur-md shadow-luxe-md"
        >
          <span className="eyebrow text-gold">{t("ui.selector.trigger")}</span>
          <span className="font-display text-sm">{activeName}</span>
          <ChevronDown
            className={[
              "h-4 w-4 text-gold transition-transform duration-300",
              mobileOpen ? "rotate-180" : "",
            ].join(" ")}
            aria-hidden="true"
          />
        </button>

        {mobileOpen && (
          <div
            id="typology-sheet"
            role="dialog"
            aria-label={t("ui.selector.sheetLabel")}
            className="pointer-events-auto mt-3 flex w-[min(92vw,22rem)] flex-col gap-2 rounded-sm border border-border/60 bg-background/90 p-3 backdrop-blur-md shadow-luxe-xl"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="eyebrow text-gold">{t("ui.selector.trigger")}</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t("ui.selector.closeLabel")}
                className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-primary/70 transition-colors hover:text-primary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {TYPOLOGIES.map((typo) => (
              <TypologyCard
                key={typo.id}
                typology={typo}
                isActive={typo.id === currentTypology}
                onSelect={handleSelect}
                layout="stack"
              />
            ))}
            <Link
              to={`/apartments/${currentTypology}`}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 border border-gold/60 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-gold hover:bg-gold/10 transition-colors"
            >
              <FileText className="h-3 w-3" aria-hidden="true" />
              {t("ui.selector.viewFullSheet")}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default ApartmentSelector;
