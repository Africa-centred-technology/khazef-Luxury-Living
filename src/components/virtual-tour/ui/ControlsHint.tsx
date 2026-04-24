import { useEffect, useState } from "react";
import { X, Keyboard } from "lucide-react";
import { useTourStore } from "../hooks/useTourStore";

/**
 * Discrete bottom-centered HUD that teaches the user how to navigate in the
 * current mode. Collapses to a tiny "keyboard" icon after 8 seconds or on
 * user dismiss; re-expands on click.
 */
export function ControlsHint() {
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
          { key: "Glisser", label: "Regarder" },
          { key: "Molette", label: "Zoomer" },
          { key: "W A S D", label: "Marcher" },
          { key: "Clic sol", label: "Se rendre" },
        ]
      : [
          { key: "Glisser", label: "Orbiter" },
          { key: "Molette", label: "Zoomer" },
          { key: "Clic droit", label: "Déplacer" },
          { key: "Clic pièce", label: "Entrer" },
        ];

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Afficher les contrôles"
        className="pointer-events-auto absolute bottom-28 right-6 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-primary hover:text-gold transition-colors shadow-luxe-sm"
      >
        <Keyboard className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="pointer-events-auto absolute bottom-28 right-6 z-30 max-w-[280px] bg-background/85 backdrop-blur-md border border-border/60 shadow-luxe-md animate-fade-in">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <span className="eyebrow text-[10px] text-gold">Contrôles</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Masquer"
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
