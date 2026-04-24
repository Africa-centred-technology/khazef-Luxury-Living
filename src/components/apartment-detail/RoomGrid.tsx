import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type {
  ApartmentTypology,
  RoomKind,
  TypologyRoom,
} from "@/components/virtual-tour/data/apartment-typologies";
import { useTourStore } from "@/components/virtual-tour/hooks/useTourStore";

interface RoomGridProps {
  typology: ApartmentTypology;
}

const ROOM_SWATCH: Record<RoomKind, string> = {
  living: "#2d4a9a",
  kitchen: "#c9a961",
  bedroom: "#1a3a8c",
  "bedroom-2": "#5c9ba3",
  dressing: "#d9ccb5",
  bathroom: "#a8c8d9",
  terrace: "#6a8a5a",
};

const ROOM_KIND_LABEL: Record<RoomKind, string> = {
  living: "Séjour",
  kitchen: "Cuisine",
  bedroom: "Chambre",
  "bedroom-2": "Chambre",
  dressing: "Dressing",
  bathroom: "Salle d'eau",
  terrace: "Terrasse",
};

const ROOM_DESCRIPTION: Record<RoomKind, string> = {
  living: "Volume traversant, ouverture sur l'océan et jardin clos.",
  kitchen: "Îlot central en marbre veiné, plan ouvert sur le séjour.",
  bedroom: "Suite parentale avec tadelakt, zellige accent et vue dégagée.",
  "bedroom-2": "Chambre secondaire, linge écru et parquet chaud.",
  dressing: "Dressing pleine hauteur, matières sobres, miroir cadré laiton.",
  bathroom: "Baignoire îlot, marbre poli, robinetterie laiton brossé.",
  terrace:
    "Deck en bois exotique, vue panoramique sur l'Atlantique et la médina.",
};

function formatDimensions(size: TypologyRoom["size"]): string {
  const [w, d] = size;
  return `${w.toFixed(1)} × ${d.toFixed(1)} m`;
}

function orientationLabel(center: TypologyRoom["center"]): string {
  const z = center[1];
  if (z < 0) return "Exposition sud";
  if (z > 0) return "Exposition nord";
  return "Double orientation";
}

interface RoomCardProps {
  room: TypologyRoom;
  onExplore: (kind: RoomKind) => void;
}

function RoomCard({ room, onExplore }: RoomCardProps) {
  const swatch = ROOM_SWATCH[room.kind];
  const kindLabel = ROOM_KIND_LABEL[room.kind];
  const description = ROOM_DESCRIPTION[room.kind];

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

      <p className="eyebrow mt-6">Pièce · {kindLabel}</p>
      <p className="arabic text-gold mt-2 text-lg">{room.arabic}</p>
      <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight mt-1 text-primary">
        {room.name}
      </h3>

      <dl className="mt-6 grid grid-cols-3 gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <div>
          <dt className="opacity-70">Surface</dt>
          <dd className="mt-1 text-foreground font-medium normal-case tracking-normal">
            {room.surface}
          </dd>
        </div>
        <div>
          <dt className="opacity-70">Dimensions</dt>
          <dd className="mt-1 text-foreground font-medium normal-case tracking-normal">
            {formatDimensions(room.size)}
          </dd>
        </div>
        <div>
          <dt className="opacity-70">Orientation</dt>
          <dd className="mt-1 text-foreground font-medium normal-case tracking-normal">
            {orientationLabel(room.center)}
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
          Explorer
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

  const handleExplore = (kind: RoomKind): void => {
    useTourStore.getState().setRoom(kind);
    useTourStore.getState().setTypology(typology.id);
    navigate("/virtual-tour");
  };

  return (
    <section className="container-luxe py-20 md:py-28">
      <div className="flex items-center gap-4">
        <span aria-hidden className="gold-rule" />
        <p className="eyebrow">Les pièces</p>
        <span className="arabic text-gold text-sm">الغرف</span>
      </div>

      <h2 className="h-display mt-4 text-primary max-w-3xl">
        Chaque pièce, un geste
      </h2>

      <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
        Chaque pièce est pensée pour une matière et une orientation précises —
        le marbre pour l'éclat du matin, le tadelakt pour la douceur du soir, le
        bois pour tenir l'air de l'Atlantique.
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
