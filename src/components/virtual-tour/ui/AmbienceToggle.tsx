import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTourStore } from "../hooks/useTourStore";

const AMBIENCE_SRC = "/audio/ambience-atlantic.mp3";

/**
 * Glass circular toggle (top-right) that plays a looping ambience track.
 * Silently fails if the audio file is not present.
 */
export function AmbienceToggle() {
  const { t } = useTranslation("virtualTour");
  const audioEnabled = useTourStore((s) => s.audioEnabled);
  const toggleAudio = useTourStore((s) => s.toggleAudio);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (audioEnabled) {
      const playAttempt = el.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch((error: unknown) => {
          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.warn(
              "[AmbienceToggle] Could not play ambience:",
              error,
            );
          }
        });
      }
    } else {
      el.pause();
      try {
        el.currentTime = 0;
      } catch {
        // ignore — some browsers throw before metadata is loaded
      }
    }
  }, [audioEnabled]);

  return (
    <>
      <button
        type="button"
        onClick={toggleAudio}
        aria-pressed={audioEnabled}
        aria-label={
          audioEnabled
            ? t("ui.ambienceToggle.disable")
            : t("ui.ambienceToggle.enable")
        }
        className="pointer-events-auto absolute right-5 top-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--gold)/0.45)] bg-[hsl(var(--primary)/0.18)] backdrop-blur-md transition-colors hover:bg-[hsl(var(--primary)/0.32)]"
        style={{
          color: audioEnabled
            ? "hsl(var(--gold-bright))"
            : "hsl(var(--gold)/0.7)",
        }}
      >
        {audioEnabled ? (
          <Volume2 size={18} strokeWidth={1.5} />
        ) : (
          <VolumeX size={18} strokeWidth={1.5} />
        )}
      </button>

      <audio
        ref={audioRef}
        src={AMBIENCE_SRC}
        loop
        preload="none"
        onError={() => {
          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.warn(
              `[AmbienceToggle] Ambience track missing at ${AMBIENCE_SRC}`,
            );
          }
        }}
      />
    </>
  );
}

export default AmbienceToggle;
