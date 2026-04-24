import { useTranslation } from "react-i18next";
import { useTourStore, type TourMode } from "../hooks/useTourStore";

interface Segment {
  value: TourMode;
  labelKey: string;
}

const SEGMENTS: Segment[] = [
  { value: "panorama", labelKey: "ui.modeSwitcher.panorama" },
  { value: "3d", labelKey: "ui.modeSwitcher.threeD" },
];

/**
 * Top-left pill toggle switching between the 360° panorama and the 3D scene.
 */
export function ModeSwitcher() {
  const { t } = useTranslation("virtualTour");
  const mode = useTourStore((s) => s.mode);
  const setMode = useTourStore((s) => s.setMode);

  return (
    <div
      role="tablist"
      aria-label={t("ui.modeSwitcher.label")}
      className="pointer-events-auto absolute left-5 top-5 z-30 inline-flex items-center gap-1 rounded-full border border-[hsl(var(--gold)/0.45)] bg-[hsl(var(--primary)/0.18)] p-1 backdrop-blur-md"
    >
      {SEGMENTS.map((segment) => {
        const active = mode === segment.value;
        return (
          <button
            key={segment.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => setMode(segment.value)}
            className="eyebrow rounded-full px-4 py-1.5 transition-colors"
            style={{
              background: active ? "hsl(var(--gold))" : "transparent",
              color: active
                ? "hsl(var(--primary))"
                : "hsl(var(--gold-bright))",
              border: active
                ? "1px solid transparent"
                : "1px solid hsl(var(--gold)/0.4)",
              letterSpacing: "0.22em",
            }}
          >
            {t(segment.labelKey)}
          </button>
        );
      })}
    </div>
  );
}

export default ModeSwitcher;
