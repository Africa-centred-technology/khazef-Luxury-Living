import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type {
  ApartmentTypology,
  RoomKind,
  TypologyRoom,
} from "@/components/virtual-tour/data/apartment-typologies";
import { useTourStore } from "@/components/virtual-tour/hooks/useTourStore";

interface RoomGridProps {
  typology: ApartmentTypology;
}

type TFn = (key: string, options?: Record<string, unknown>) => string;

const ROOM_SWATCH: Record<RoomKind, string> = {
  living: "#2d4a9a",
  kitchen: "#c9a961",
  bedroom: "#1a3a8c",
  "bedroom-2": "#5c9ba3",
  dressing: "#d9ccb5",
  bathroom: "#a8c8d9",
  terrace: "#6a8a5a",
};

function formatDimensions(size: TypologyRoom["size"]): string {
  const [w, d] = size;
  return `${w.toFixed(1)} × ${d.toFixed(1)} m`;
}

function orientationLabel(center: TypologyRoom["center"], t: TFn): string {
  const z = center[1];
  if (z < 0) return t("rooms.orientation.south");
  if (z > 0) return t("rooms.orientation.north");
  return t("rooms.orientation.double");
}

interface RoomCardProps {
  room: TypologyRoom;
  onExplore: (kind: RoomKind) => void;
}

function RoomCard({ room, onExplore }: RoomCardProps) {
  const { t } = useTranslation("apartmentDetail");
  const swatch = ROOM_SWATCH[room.kind];
  const kindLabel = t(`rooms.kindLabels.${room.kind}`);
  const description = t(`rooms.descriptions.${room.kind}`);

  return (
    <article className="group relative flex flex-col border border-border/60 bg-background/60 p-6 md:p-8 shadow-luxe-sm hover:shadow-luxe-md hover:-translate-y-1 transition-all duration-500">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="inline-block h-12 w-2 shrink-0"
          style={{ backgroundColor: swatch }}
        />
        <span
          aria-hidden
          className="inline-block h-1 w-16 bg-gold mt-1"
        />
      </div>

      <p className="eyebrow mt-6">
        {t("rooms.cardLabel")} · {kindLabel}
      </p>
      <p className="arabic text-gold mt-2 text-lg">{room.arabic}</p>
      <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight mt-1 text-primary">
        {room.name}
      </h3>

      <dl className="mt-6 grid grid-cols-3 gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <div>
          <dt className="opacity-70">{t("rooms.surface")}</dt>
          <dd className="mt-1 text-foreground font-medium normal-case tracking-normal">
            {room.surface}
          </dd>
        </div>
        <div>
          <dt className="opacity-70">{t("rooms.dimensions")}</dt>
          <dd className="mt-1 text-foreground font-medium normal-case tracking-normal">
            {formatDimensions(room.size)}
          </dd>
        </div>
        <div>
          <dt className="opacity-70">{t("rooms.orientationLabel")}</dt>
          <dd className="mt-1 text-foreground font-medium normal-case tracking-normal">
            {orientationLabel(room.center, t)}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => onExplore(room.kind)}
          className="link-luxe inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-primary hover:text-gold transition-colors"
        >
          {t("rooms.explore")}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </button>
      </div>
    </article>
  );
}

export function RoomGrid({ typology }: RoomGridProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("apartmentDetail");

  const handleExplore = (kind: RoomKind): void => {
    useTourStore.getState().setRoom(kind);
    useTourStore.getState().setTypology(typology.id);
    navigate("/virtual-tour");
  };

  return (
    <section className="container-luxe py-20 md:py-28">
      <div className="flex items-center gap-4">
        <span aria-hidden className="gold-rule" />
        <p className="eyebrow">{t("rooms.eyebrow")}</p>
        <span className="arabic text-gold text-sm">{t("rooms.arabic")}</span>
      </div>

      <h2 className="h-display mt-4 text-primary max-w-3xl">
        {t("rooms.title")}
      </h2>

      <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
        {t("rooms.intro")}
      </p>

      <div className="mt-12 md:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {typology.rooms.map((room) => (
          <RoomCard
            key={`${typology.id}-${room.kind}`}
            room={room}
            onExplore={handleExplore}
          />
        ))}
      </div>
    </section>
  );
}

export default RoomGrid;
