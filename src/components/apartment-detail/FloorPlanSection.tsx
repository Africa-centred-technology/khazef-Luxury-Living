import type {
  ApartmentTypology,
  RoomKind,
  TypologyRoom,
} from "@/components/virtual-tour/data/apartment-typologies";

interface FloorPlanSectionProps {
  typology: ApartmentTypology;
}

interface ParametricPlanGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly scale: number;
  readonly padding: number;
  readonly footprintWidth: number;
  readonly footprintDepth: number;
  readonly originX: number;
  readonly originY: number;
}

interface RoomRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly centerX: number;
  readonly centerY: number;
  readonly fill: string;
  readonly room: TypologyRoom;
}

/**
 * Pixels per metre used by the parametric SVG plan. Chosen so that the
 * largest footprint (penthouse: 18m × 6m) renders comfortably inside a
 * standard 16:10 container without losing label legibility on smaller
 * rooms like the dressing (3m × 2.4m).
 */
const SVG_SCALE = 40;

/** Padding, in SVG units, around the outer footprint rectangle. */
const SVG_PADDING = 48;

/** Wall stroke + accent colors (brand tokens, hex values because the SVG lives outside Tailwind). */
const WALL_STROKE = "#c9a961";
const WALL_BG = "#faf7f2";
const LABEL_PRIMARY = "#2a2a2a";
const LABEL_SECONDARY = "#6b6b6b";

/**
 * Light, airy tints per room kind. Derived from the project cream palette;
 * intentionally low-saturation so the gold strokes and labels remain the
 * dominant visual signal.
 */
const ROOM_TINTS: Readonly<Record<RoomKind, string>> = {
  living: "#f1eadc",
  kitchen: "#ede4d0",
  bedroom: "#f4ece0",
  "bedroom-2": "#efe7d8",
  dressing: "#ebe2cf",
  bathroom: "#e8e4d8",
  terrace: "#e5ddc8",
};

function getRoomTint(kind: RoomKind): string {
  return ROOM_TINTS[kind] ?? "#f1eadc";
}

/**
 * Derives north/south/double orientation from the room's depth coordinate.
 * Positive Y is interpreted as "back of the plot" (Nord), negative Y as the
 * front facade (Sud). A centered room faces both orientations.
 */
function getOrientationLabel(room: TypologyRoom): string {
  const [, depthCenter] = room.center;
  if (depthCenter < 0) return "Sud";
  if (depthCenter > 0) return "Nord";
  return "Double";
}

function formatDimensions(room: TypologyRoom): string {
  const [width, depth] = room.size;
  return `${width.toFixed(1)} × ${depth.toFixed(1)} m`;
}

function buildGeometry(typology: ApartmentTypology): ParametricPlanGeometry {
  const [footprintWidth, footprintDepth] = typology.footprint;
  const viewBoxWidth = footprintWidth * SVG_SCALE + SVG_PADDING * 2;
  const viewBoxHeight = footprintDepth * SVG_SCALE + SVG_PADDING * 2;
  const originX = SVG_PADDING + (footprintWidth * SVG_SCALE) / 2;
  const originY = SVG_PADDING + (footprintDepth * SVG_SCALE) / 2;

  return {
    viewBoxWidth,
    viewBoxHeight,
    scale: SVG_SCALE,
    padding: SVG_PADDING,
    footprintWidth,
    footprintDepth,
    originX,
    originY,
  };
}

function buildRoomRects(
  rooms: readonly TypologyRoom[],
  geometry: ParametricPlanGeometry,
): readonly RoomRect[] {
  return rooms.map((room) => {
    const [cx, cy] = room.center;
    const [sw, sd] = room.size;
    const width = sw * geometry.scale;
    const height = sd * geometry.scale;
    const centerX = geometry.originX + cx * geometry.scale;
    const centerY = geometry.originY + cy * geometry.scale;

    return {
      x: centerX - width / 2,
      y: centerY - height / 2,
      width,
      height,
      centerX,
      centerY,
      fill: getRoomTint(room.kind),
      room,
    };
  });
}

interface ParametricFloorPlanProps {
  typology: ApartmentTypology;
}

function ParametricFloorPlan({ typology }: ParametricFloorPlanProps) {
  const geometry = buildGeometry(typology);
  const roomRects = buildRoomRects(typology.rooms, geometry);

  const compassX = geometry.viewBoxWidth - 56;
  const compassY = 56;
  const compassRadius = 22;

  return (
    <svg
      viewBox={`0 0 ${geometry.viewBoxWidth} ${geometry.viewBoxHeight}`}
      role="img"
      aria-label={`Plan schématique ${typology.name}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Outer walls */}
      <rect
        x={geometry.padding}
        y={geometry.padding}
        width={geometry.footprintWidth * geometry.scale}
        height={geometry.footprintDepth * geometry.scale}
        fill={WALL_BG}
        stroke={WALL_STROKE}
        strokeWidth={3}
      />

      {/* Rooms */}
      {roomRects.map((rect) => (
        <g key={`${rect.room.name}-${rect.room.center[0]}-${rect.room.center[1]}`}>
          <rect
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            fill={rect.fill}
            stroke={WALL_STROKE}
            strokeWidth={1.25}
            strokeLinejoin="miter"
          />
          <text
            x={rect.centerX}
            y={rect.centerY - 4}
            textAnchor="middle"
            fill={LABEL_PRIMARY}
            fontFamily="'Cormorant Garamond', serif"
            fontSize={Math.min(rect.width, rect.height) > 120 ? 17 : 14}
            fontWeight={500}
          >
            {rect.room.name}
          </text>
          <text
            x={rect.centerX}
            y={rect.centerY + 14}
            textAnchor="middle"
            fill={LABEL_SECONDARY}
            fontFamily="'Outfit', sans-serif"
            fontSize={11}
            letterSpacing="0.08em"
          >
            {rect.room.surface}
          </text>
        </g>
      ))}

      {/* Compass rose */}
      <g transform={`translate(${compassX}, ${compassY})`}>
        <circle
          r={compassRadius}
          fill="#ffffff"
          stroke={WALL_STROKE}
          strokeWidth={1}
          opacity={0.9}
        />
        <line
          x1={0}
          y1={compassRadius - 4}
          x2={0}
          y2={-(compassRadius - 4)}
          stroke={WALL_STROKE}
          strokeWidth={1.25}
        />
        <polygon
          points={`0,${-(compassRadius - 2)} -5,${-(compassRadius - 12)} 5,${-(compassRadius - 12)}`}
          fill={WALL_STROKE}
        />
        <text
          x={0}
          y={-compassRadius - 4}
          textAnchor="middle"
          fill={LABEL_PRIMARY}
          fontFamily="'Outfit', sans-serif"
          fontSize={10}
          letterSpacing="0.12em"
          fontWeight={500}
        >
          N
        </text>
      </g>
    </svg>
  );
}

interface RoomTableRow {
  readonly key: string;
  readonly name: string;
  readonly surface: string;
  readonly dimensions: string;
  readonly orientation: string;
}

function buildTableRows(rooms: readonly TypologyRoom[]): readonly RoomTableRow[] {
  return rooms.map((room, index) => ({
    key: `${room.name}-${index}`,
    name: room.name,
    surface: room.surface,
    dimensions: formatDimensions(room),
    orientation: getOrientationLabel(room),
  }));
}

export function FloorPlanSection({ typology }: FloorPlanSectionProps) {
  const hasBlueprint = Boolean(typology.blueprintUrl);
  const tableRows = buildTableRows(typology.rooms);

  return (
    <section
      aria-labelledby="floor-plan-heading"
      className="container-luxe py-20 md:py-28"
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="gold-rule" aria-hidden="true" />
        <span className="eyebrow text-primary/70">Plan d&rsquo;architecte</span>
        <span
          className="arabic text-lg md:text-xl text-gold"
          lang="ar"
          dir="rtl"
        >
          المخطط
        </span>
      </div>

      <h2
        id="floor-plan-heading"
        className="mt-6 h-display text-primary max-w-3xl"
      >
        Le plan, à la règle et au compas.
      </h2>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        {/* LEFT — visual floor plan */}
        <div className="flex flex-col gap-5">
          <div className="relative aspect-[4/3] border border-border/60 bg-secondary/40 overflow-hidden">
            {hasBlueprint ? (
              <img
                src={typology.blueprintUrl}
                alt={
                  typology.blueprintCaption ??
                  `Plan d'architecte de ${typology.name}`
                }
                className="absolute inset-0 h-full w-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <ParametricFloorPlan typology={typology} />
              </div>
            )}
          </div>

          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground/80">
            {hasBlueprint && typology.blueprintCaption
              ? typology.blueprintCaption
              : "Représentation schématique. Plan d’architecte définitif sur demande."}
          </p>

          <div>
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Bientôt disponible"
              className="inline-flex items-center gap-3 border border-gold/60 px-5 py-3 text-xs uppercase tracking-[0.28em] text-primary opacity-60 cursor-not-allowed"
            >
              <span className="gold-rule" aria-hidden="true" />
              Télécharger le plan (PDF)
            </button>
          </div>
        </div>

        {/* RIGHT — room table */}
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Détails des pièces, surfaces, dimensions et orientation pour {typology.name}.
              </caption>
              <thead>
                <tr className="border-b border-gold/50">
                  <th
                    scope="col"
                    className="py-4 pr-4 eyebrow text-muted-foreground/80"
                  >
                    Pièce
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 eyebrow text-muted-foreground/80"
                  >
                    Surface
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 eyebrow text-muted-foreground/80 whitespace-nowrap"
                  >
                    Dimensions
                  </th>
                  <th
                    scope="col"
                    className="py-4 pl-4 eyebrow text-muted-foreground/80"
                  >
                    Orientation
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row.key}
                    className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-4 pr-4 font-display text-lg md:text-xl text-primary">
                      {row.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-primary/85 whitespace-nowrap">
                      {row.surface}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground whitespace-nowrap">
                      {row.dimensions}
                    </td>
                    <td className="py-4 pl-4 text-sm text-muted-foreground">
                      {row.orientation}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gold/60">
                  <td className="pt-5 pr-4 eyebrow text-primary">
                    Total utile
                  </td>
                  <td
                    className="pt-5 px-4 font-display text-lg md:text-xl text-primary whitespace-nowrap"
                    colSpan={3}
                  >
                    {typology.surface}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
