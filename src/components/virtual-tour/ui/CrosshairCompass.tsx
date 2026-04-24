import { useTranslation } from "react-i18next";
import { useTourStore } from "../hooks/useTourStore";

/**
 * Centered gold crosshair with a compass ring at the top edge of the viewer.
 * Hidden while the 3D mode is active.
 */
export function CrosshairCompass() {
  const { t } = useTranslation("virtualTour");
  const mode = useTourStore((s) => s.mode);

  if (mode === "3d") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20"
      style={{ opacity: 0.6 }}
    >
      {/* Compass ring — top of viewer */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <div className="flex items-center gap-6 rounded-full border border-[hsl(var(--gold)/0.45)] bg-[hsl(var(--primary)/0.12)] px-5 py-1.5 backdrop-blur-sm">
          <CompassMark label={t("ui.compass.n")} accent />
          <CompassMark label={t("ui.compass.e")} />
          <CompassMark label={t("ui.compass.s")} />
          <CompassMark label={t("ui.compass.w")} />
        </div>
      </div>

      {/* Crosshair — centred, 16px */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 16, height: 16 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8"
            cy="8"
            r="1"
            fill="hsl(var(--gold))"
          />
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="5"
            stroke="hsl(var(--gold))"
            strokeWidth="1"
          />
          <line
            x1="8"
            y1="11"
            x2="8"
            y2="16"
            stroke="hsl(var(--gold))"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="8"
            x2="5"
            y2="8"
            stroke="hsl(var(--gold))"
            strokeWidth="1"
          />
          <line
            x1="11"
            y1="8"
            x2="16"
            y2="8"
            stroke="hsl(var(--gold))"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}

interface CompassMarkProps {
  label: string;
  accent?: boolean;
}

function CompassMark({ label, accent = false }: CompassMarkProps) {
  return (
    <span
      className="eyebrow"
      style={{
        color: accent ? "hsl(var(--gold-bright))" : "hsl(var(--gold)/0.8)",
        fontSize: "0.625rem",
      }}
    >
      {label}
    </span>
  );
}

export default CrosshairCompass;
