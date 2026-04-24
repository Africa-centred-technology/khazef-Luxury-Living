import { useEffect, useMemo, useRef } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTourStore } from "../hooks/useTourStore";
import {
  TOUR_ROOMS,
  type MaterialHotspot,
} from "../data/tour-data";

function findHotspotById(id: string): MaterialHotspot | null {
  for (const room of Object.values(TOUR_ROOMS)) {
    const match = room.materialHotspots.find((h) => h.id === id);
    if (match) return match;
  }
  return null;
}

/**
 * Right-edge slide-in panel that describes the focused material hotspot.
 * Transparent backdrop — panorama remains visible behind it.
 */
export function InfoPanel() {
  const { t } = useTranslation("virtualTour");
  const infoPanelId = useTourStore((s) => s.infoPanelId);
  const closeInfoPanel = useTourStore((s) => s.closeInfoPanel);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const hotspot = useMemo<MaterialHotspot | null>(() => {
    if (!infoPanelId) return null;
    return findHotspotById(infoPanelId);
  }, [infoPanelId]);

  const isOpen = infoPanelId !== null && hotspot !== null;

  // Escape + click-outside handling
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeInfoPanel();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;
      if (panelRef.current && target && !panelRef.current.contains(target)) {
        closeInfoPanel();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeInfoPanel]);

  const arabicAccent =
    hotspot != null
      ? t(`ui.infoPanel.arabicLabels.${hotspot.material}`)
      : "";

  const translate = isOpen ? "translateX(0%)" : "translateX(105%)";

  return (
    <aside
      ref={panelRef}
      role="dialog"
      aria-hidden={!isOpen}
      aria-label={hotspot?.title ?? t("ui.infoPanel.fallbackLabel")}
      className="pointer-events-auto fixed right-0 top-0 z-40 h-full"
      style={{
        width: 380,
        maxWidth: "92vw",
        transform: translate,
        transition: "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        background: "hsl(var(--background)/0.94)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "var(--shadow-xl)",
        borderLeft: "1px solid hsl(var(--gold)/0.35)",
      }}
    >
      {hotspot && (
        <div className="relative flex h-full flex-col px-8 py-10">
          <button
            type="button"
            onClick={closeInfoPanel}
            aria-label={t("ui.infoPanel.closeLabel")}
            className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--gold)/0.45)] text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--gold)/0.12)]"
          >
            <X size={16} strokeWidth={1.5} />
          </button>

          <span className="eyebrow text-[hsl(var(--gold-deep))]">
            {t("ui.infoPanel.eyebrow")} · {t(`ui.infoPanel.materialLabels.${hotspot.material}`)}
          </span>

          <div
            className="arabic mt-5 text-[hsl(var(--primary))]"
            style={{ fontSize: "2.5rem", lineHeight: 1.1 }}
          >
            {arabicAccent}
          </div>

          <h3 className="h-section mt-3 text-[hsl(var(--primary))]">
            {hotspot.title}
          </h3>

          <span className="gold-rule mt-5" />

          <p
            className="mt-6 font-sans text-[hsl(var(--muted-foreground))]"
            style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
          >
            {hotspot.description}
          </p>

          <div className="mt-auto pt-10">
            <span
              className="eyebrow"
              style={{ color: "hsl(var(--gold-deep))" }}
            >
              {t("ui.infoPanel.signature")}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}

export default InfoPanel;
