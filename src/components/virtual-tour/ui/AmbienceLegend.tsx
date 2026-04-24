import { Radio } from "lucide-react";

import { TOUR_ROOMS } from "../data/tour-data";
import { useTourStore } from "../hooks/useTourStore";

const AMBIENCE_LABEL: Record<string, string> = {
  living: "Crépitement de cheminée",
  kitchen: "Eau & porcelaine",
  bedroom: "Brise atlantique",
};

/**
 * Small editorial overlay that names the ambient sound currently playing.
 * Only visible when the user has opted into audio.
 *
 * Positioned above the MiniMap so it never fights it for real-estate.
 */
export function AmbienceLegend() {
  const audioEnabled = useTourStore((s) => s.audioEnabled);
  const currentRoom = useTourStore((s) => s.currentRoom);

  if (!audioEnabled) return null;

  const room = TOUR_ROOMS[currentRoom];
  const label = AMBIENCE_LABEL[currentRoom] ?? "Ambiance";

  return (
    <aside
      className="absolute right-6 z-20 w-[240px] rounded-sm border border-primary/10 bg-white/80 p-4 backdrop-blur-md shadow-lg"
      style={{ bottom: "calc(180px + 1.5rem)" }}
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <span className="relative block h-2 w-2 rounded-full bg-primary" />
        </div>
        <span className="uppercase text-[10px] tracking-[0.22em] font-medium text-primary/70">
          Ambiance
        </span>
        <Radio className="ml-auto h-4 w-4 text-primary/70" aria-hidden />
      </div>
      <p className="mt-2 font-display text-base leading-tight text-primary">
        {room.name}
      </p>
      <p className="text-xs text-primary/60 mt-0.5">{label}</p>
    </aside>
  );
}

export default AmbienceLegend;
