import { useTranslation } from "react-i18next";

import { ROOM_ORDER, TOUR_ROOMS, type RoomId } from "../data/tour-data";
import { useTourStore } from "../hooks/useTourStore";

const FLOORPLAN_ROOMS = [
  { x: 8, y: 40, w: 44, h: 45, label: "Salon" },
  { x: 52, y: 30, w: 32, h: 30, label: "Cuisine" },
  { x: 14, y: 10, w: 30, h: 28, label: "Suite" },
];

export function MiniMap() {
  const { t } = useTranslation("virtualTour");
  const currentRoom = useTourStore((s) => s.currentRoom);
  const setRoom = useTourStore((s) => s.setRoom);

  return (
    <aside
      aria-label={t("ui.minimap.label")}
      className="pointer-events-auto absolute bottom-6 right-6 z-30 flex w-[240px] flex-col gap-2 rounded-sm border border-border/60 bg-background/70 p-3 backdrop-blur-md shadow-luxe-md"
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow text-primary/80">{t("ui.minimap.eyebrow")}</span>
        <span className="arabic text-xs text-gold">{t("ui.minimap.arabic")}</span>
      </div>

      <div className="relative h-[140px] w-full overflow-hidden rounded-sm bg-primary/5">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {FLOORPLAN_ROOMS.map((r) => (
            <rect
              key={r.label}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill="hsl(var(--muted) / 0.35)"
              stroke="hsl(var(--primary) / 0.25)"
              strokeWidth={0.4}
            />
          ))}
          <line x1="52" y1="55" x2="52" y2="60" stroke="hsl(var(--background))" strokeWidth={1.2} />
          <line x1="30" y1="38" x2="30" y2="42" stroke="hsl(var(--background))" strokeWidth={1.2} />
        </svg>

        {ROOM_ORDER.map((id: RoomId) => {
          const room = TOUR_ROOMS[id];
          const isActive = id === currentRoom;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setRoom(id)}
              className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${room.mapPosition.x}%`, top: `${room.mapPosition.y}%` }}
              aria-label={t("ui.minimap.goToAria", { name: room.name })}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                aria-hidden
                className={[
                  "block h-3 w-3 rounded-full border transition-transform duration-300",
                  isActive
                    ? "scale-125 border-gold bg-gold shadow-[0_0_0_4px_hsl(var(--gold)/0.25)]"
                    : "border-gold/60 bg-background group-hover:scale-110 group-hover:border-gold",
                ].join(" ")}
                style={isActive ? { animation: "pulse-gold 2.4s ease-in-out infinite" } : undefined}
              />
              <span className="arabic mt-1 block whitespace-nowrap text-[10px] leading-none text-primary/80">
                {room.arabic}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default MiniMap;
