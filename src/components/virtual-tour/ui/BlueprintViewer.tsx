import { useEffect } from "react";
import { X } from "lucide-react";

interface BlueprintViewerProps {
  open: boolean;
  src: string;
  caption?: string;
  typologyName: string;
  onClose: () => void;
}

/**
 * Editorial lightbox for the 2D architect floor plan. Keyboard: Esc closes.
 * Click on the dark backdrop also closes. The image is served from `public/`.
 */
export function BlueprintViewer({ open, src, caption, typologyName, onClose }: BlueprintViewerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // lock page scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Plan de l'appartement ${typologyName}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/92 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[92vw] bg-background shadow-luxe-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-border/60">
          <div>
            <div className="eyebrow text-gold text-[10px]">Plan d'architecte</div>
            <h2 className="font-display text-2xl text-primary leading-tight">{typologyName}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le plan"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="relative bg-secondary/40 flex items-center justify-center p-6">
          <img
            src={src}
            alt={`Plan 2D — ${typologyName}`}
            className="max-h-[70vh] max-w-full object-contain"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const parent = img.parentElement;
              if (parent) {
                parent.innerHTML = `<p class="font-light text-muted-foreground p-12 text-center">Le plan n'est pas encore disponible.<br/><span class="eyebrow text-[10px] mt-3 inline-block">Attendu : ${src}</span></p>`;
              }
            }}
          />
        </div>
        {caption && (
          <footer className="px-6 py-4 border-t border-border/60">
            <p className="font-light text-sm text-muted-foreground">{caption}</p>
          </footer>
        )}
      </div>
    </div>
  );
}

export default BlueprintViewer;
