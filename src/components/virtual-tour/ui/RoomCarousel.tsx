import { useTranslation } from "react-i18next";

import { ROOM_ORDER, TOUR_ROOMS } from "../data/tour-data";
import { useTourStore } from "../hooks/useTourStore";

export function RoomCarousel() {
  const { t } = useTranslation("virtualTour");
  const currentRoom = useTourStore((s) => s.currentRoom);
  const setRoom = useTourStore((s) => s.setRoom);

  const rooms = ROOM_ORDER.map((id) => TOUR_ROOMS[id]);

  return (
    <nav
      aria-label={t("ui.roomCarousel.label")}
      className="pointer-events-auto absolute bottom-6 left-1/2 z-30 -translate-x-1/2"
    >
      <ul className="flex items-end gap-3 rounded-sm border border-border/60 bg-background/70 px-4 py-3 backdrop-blur-md shadow-luxe-md">
        {rooms.map((room) => {
          const isActive = room.id === currentRoom;
          return (
            <li key={room.id}>
              <button
                type="button"
                onClick={() => setRoom(room.id)}
                aria-label={t("ui.roomCarousel.viewAria", { name: room.name })}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "group relative flex flex-col items-center gap-2 overflow-hidden rounded-sm transition-all duration-500",
                  "focus:outline-none",
                ].join(" ")}
              >
                <span
                  className={[
                    "relative block overflow-hidden rounded-sm border transition-all duration-500",
                    "h-16 w-24 flex flex-col items-center justify-center gap-1",
                    isActive
                      ? "border-gold scale-105 shadow-luxe-md bg-gradient-gold text-primary"
                      : "border-border/60 bg-primary/85 text-secondary group-hover:-translate-y-0.5 group-hover:border-gold/70",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <span className="font-display text-lg leading-none">{room.surface}</span>
                  <span className="arabic text-[10px] leading-none opacity-80">{room.arabic}</span>
                  {isActive && (
                    <span className="absolute inset-0 ring-1 ring-inset ring-gold/60" />
                  )}
                </span>
                <span
                  className={[
                    "font-display text-xs tracking-wide transition-colors",
                    isActive ? "text-gold" : "text-primary/80 group-hover:text-primary",
                  ].join(" ")}
                >
                  {room.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomCarousel;
