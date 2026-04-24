import { useEffect, useState } from "react";
import { X, Keyboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTourStore } from "../hooks/useTourStore";

/**
 * Discrete bottom-centered HUD that teaches the user how to navigate in the
 * current mode. Collapses to a tiny "keyboard" icon after 8 seconds or on
 * user dismiss; re-expands on click.
 */
export function ControlsHint() {
  const { t } = useTranslation("virtualTour");
  const mode = useTourStore((s) => s.mode);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
    const t = window.setTimeout(() => setOpen(false), 8000);
    return () => window.clearTimeout(t);
  }, [mode]);

  const content =
    mode === "panorama"
      ? [
          { key: t("ui.controlsHint.panorama.drag.key"), label: t("ui.controlsHint.panorama.drag.label") },
          { key: t("ui.controlsHint.panorama.wheel.key"), label: t("ui.controlsHint.panorama.wheel.label") },
          { key: t("ui.controlsHint.panorama.wasd.key"), label: t("ui.controlsHint.panorama.wasd.label") },
          { key: t("ui.controlsHint.panorama.clickFloor.key"), label: t("ui.controlsHint.panorama.clickFloor.label") },
        ]
      : [
          { key: t("ui.controlsHint.threeD.drag.key"), label: t("ui.controlsHint.threeD.drag.label") },
          { key: t("ui.controlsHint.threeD.wheel.key"), label: t("ui.controlsHint.threeD.wheel.label") },
          { key: t("ui.controlsHint.threeD.rightClick.key"), label: t("ui.controlsHint.threeD.rightClick.label") },
          { key: t("ui.controlsHint.threeD.clickRoom.key"), label: t("ui.controlsHint.threeD.clickRoom.label") },
        ];

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("ui.controlsHint.showLabel")}
        className="pointer-events-auto absolute bottom-28 right-6 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-primary hover:text-gold transition-colors shadow-luxe-sm"
      >
        <Keyboard className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="pointer-events-auto absolute bottom-28 right-6 z-30 max-w-[280px] bg-background/85 backdrop-blur-md border border-border/60 shadow-luxe-md animate-fade-in">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <span className="eyebrow text-[10px] text-gold">{t("ui.controlsHint.eyebrow")}</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("ui.controlsHint.hideLabel")}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <ul className="flex flex-col gap-2 p-4">
        {content.map((row) => (
          <li key={row.key} className="flex items-center justify-between gap-4">
            <kbd className="font-sans text-[10px] uppercase tracking-[0.18em] text-primary bg-secondary/70 border border-border/60 px-2 py-1">
              {row.key}
            </kbd>
            <span className="font-light text-xs text-muted-foreground">{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ControlsHint;
