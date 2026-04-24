import { useEffect, useRef, useState } from "react";
import { MousePointer2, CircleDot, Maximize2 } from "lucide-react";

const STORAGE_KEY = "khazef-tour-seen";

interface HelpStep {
  icon: typeof MousePointer2;
  title: string;
  description: string;
}

const STEPS: HelpStep[] = [
  {
    icon: MousePointer2,
    title: "Glissez pour explorer",
    description: "Maintenez le clic, déplacez la vue à votre rythme.",
  },
  {
    icon: CircleDot,
    title: "Cliquez les points dorés",
    description: "Chaque halo dévoile un matériau et sa provenance.",
  },
  {
    icon: Maximize2,
    title: "Passez en mode 3D ou VR",
    description: "Plan volumique, ou immersion complète au casque.",
  },
];

function readSeenFlag(): boolean {
  if (typeof window === "undefined") {
    return true;
  }
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Private browsing or storage blocked — skip the overlay rather than nag.
    return true;
  }
}

function writeSeenFlag(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Ignore write errors; overlay will simply reappear next visit.
  }
}

/**
 * First-visit teaching overlay for the virtual tour.
 * Dismissed via "Entrer" button; decision persists in localStorage.
 */
function HelpOverlay(): JSX.Element | null {
  const [visible, setVisible] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!readSeenFlag()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [visible]);

  const handleDismiss = (): void => {
    writeSeenFlag();
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="khazef-help-title"
      aria-describedby="khazef-help-description"
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-background/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-xl rounded-lg border border-gold/30 bg-background/95 p-8 md:p-10 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <span
            className="arabic text-2xl text-gold mb-2"
            aria-hidden="true"
          >
            أهلاً بكم
          </span>
          <span className="eyebrow text-foreground/70">
            Visite immersive
          </span>
          <h2
            id="khazef-help-title"
            className="font-display text-3xl md:text-4xl mt-3 text-primary"
          >
            Bienvenue dans la visite
          </h2>
          <span
            className="gold-rule my-5"
            aria-hidden="true"
          />
          <p
            id="khazef-help-description"
            className="font-sans text-sm md:text-base text-foreground/75 max-w-md"
          >
            Trois pièces, trois lumières. Prenez le temps du regard.
          </p>
        </div>

        <ul className="mt-8 space-y-5">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="flex items-start gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
                <div className="text-left">
                  <p className="font-display text-lg text-primary">
                    {step.title}
                  </p>
                  <p className="font-sans text-sm text-foreground/70">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-center">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleDismiss}
            className="group inline-flex items-center gap-3 rounded-full border border-gold px-8 py-3 font-sans text-sm uppercase tracking-[0.25em] text-primary transition-colors hover:bg-gold hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            Entrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpOverlay;
