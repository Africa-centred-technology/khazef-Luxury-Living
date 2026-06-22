import { useMemo, useState } from "react";
import { type Lot, STATUT_META } from "@/data/lots";
import { formatDH } from "@/data/villas-ahlam";

interface LotsMapProps {
  lots: Lot[];
  selectedNumero: number | null;
  onSelectLot: (lot: Lot) => void;
  /** Numéros visibles (selon filtres) ; les autres sont estompés. */
  visibleNumeros: Set<number>;
}

interface Placed {
  lot: Lot;
  x: number;
  y: number;
  w: number;
  h: number;
}

const COLS = 8;
const CELL = 116;
const GAP = 10;
const PAD = 24;
const ILOT_GAP = 64;

/** Taille de tuile selon la surface (les grands lots ressortent). */
function tier(surface: number): number {
  if (surface >= 400) return 1.0;
  if (surface >= 300) return 0.9;
  if (surface >= 250) return 0.82;
  return 0.74;
}

/** Place une liste de lots en grille à partir d'un y de départ. Retourne les tuiles + le y final. */
function layoutSection(lots: Lot[], startY: number): { placed: Placed[]; endY: number } {
  const placed: Placed[] = lots.map((lot, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const scale = tier(lot.surfaceM2);
    const w = CELL * scale;
    const h = CELL * scale;
    const cx = PAD + col * (CELL + GAP) + CELL / 2;
    const cy = startY + row * (CELL + GAP) + CELL / 2;
    return { lot, x: cx - w / 2, y: cy - h / 2, w, h };
  });
  const rows = Math.ceil(lots.length / COLS);
  return { placed, endY: startY + rows * (CELL + GAP) };
}

/**
 * Carte interactive schématique des 42 lots — CDC §7 (mode "moyens du bord").
 * Chaque lot est un <g> SVG porteur de data-lot-id / data-status, coloré selon
 * son statut. Quand le plan PDF tracé sera disponible, remplacer les rectangles
 * par les <path> calés sur le plan — la logique d'interaction reste identique.
 */
export function LotsMap({ lots, selectedNumero, onSelectLot, visibleNumeros }: LotsMapProps) {
  const [hover, setHover] = useState<Placed | null>(null);

  const { sections, width, height } = useMemo(() => {
    const ilotA = lots.filter((l) => l.ilot === "A");
    const ilotB = lots.filter((l) => l.ilot === "B");
    const aStart = PAD + 36;
    const a = layoutSection(ilotA, aStart);
    const bStart = a.endY + ILOT_GAP;
    const b = layoutSection(ilotB, bStart);
    const w = PAD * 2 + COLS * (CELL + GAP);
    const h = b.endY + PAD;
    return {
      sections: [
        { label: "Îlot A", y: aStart - 30, placed: a.placed },
        { label: "Îlot B", y: bStart - 30, placed: b.placed },
      ],
      width: w,
      height: h,
    };
  }, [lots]);

  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-border/60 bg-secondary/30 pattern-zellige">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="group"
        aria-label="Plan interactif des 42 lots"
      >
        {sections.map((section) => (
          <g key={section.label}>
            <text
              x={PAD}
              y={section.y}
              className="fill-primary"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26 }}
            >
              {section.label}
            </text>
            {section.placed.map((p) => {
              const meta = STATUT_META[p.lot.statut];
              const isSelected = selectedNumero === p.lot.numero;
              const isVisible = visibleNumeros.has(p.lot.numero);
              const interactive = meta.cliquable && isVisible;
              return (
                <g
                  key={p.lot.id}
                  data-lot-id={p.lot.id}
                  data-status={p.lot.statut}
                  data-surface={p.lot.surfaceM2}
                  transform={`translate(${p.x} ${p.y})`}
                  className={interactive ? "cursor-pointer" : "cursor-not-allowed"}
                  opacity={isVisible ? 1 : 0.18}
                  onMouseEnter={() => isVisible && setHover(p)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => interactive && onSelectLot(p.lot)}
                  role="button"
                  aria-label={`Lot ${p.lot.numero}, ${p.lot.surfaceM2} m², ${meta.label}`}
                  tabIndex={interactive ? 0 : -1}
                  onKeyDown={(e) => {
                    if (interactive && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      onSelectLot(p.lot);
                    }
                  }}
                >
                  <rect
                    width={p.w}
                    height={p.h}
                    rx={4}
                    fill={`hsl(${meta.colorVar})`}
                    fillOpacity={p.lot.statut === "vendu" ? 0.45 : 0.85}
                    stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--background))"}
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    x={p.w / 2}
                    y={p.h / 2 - 4}
                    textAnchor="middle"
                    className="fill-background"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 600 }}
                  >
                    {p.lot.numero}
                  </text>
                  <text
                    x={p.w / 2}
                    y={p.h / 2 + 16}
                    textAnchor="middle"
                    className="fill-background"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 12, opacity: 0.9 }}
                  >
                    {p.lot.surfaceM2} m²
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>

      {/* Tooltip — CDC §7.3 */}
      {hover && (
        <div
          className="pointer-events-none absolute z-10 rounded-sm bg-charcoal px-3 py-2 text-background shadow-luxe-md"
          style={{
            left: `${(hover.x / width) * 100}%`,
            top: `${(hover.y / height) * 100}%`,
            transform: "translate(-50%, -120%)",
          }}
        >
          <div className="font-display text-base leading-none">Lot {hover.lot.numero}</div>
          <div className="text-xs opacity-90">
            {hover.lot.surfaceM2} m² · {STATUT_META[hover.lot.statut].label}
          </div>
          <div className="text-xs font-medium text-gold">
            À partir de {formatDH(hover.lot.prixIndicatif)}
          </div>
        </div>
      )}
    </div>
  );
}

/** Légende des statuts — CDC §7.2. */
export function LotsLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {(["disponible", "en_cours", "vendu"] as const).map((s) => (
        <span key={s} className="inline-flex items-center gap-2">
          <span
            className="inline-block h-3.5 w-3.5 rounded-sm"
            style={{ backgroundColor: `hsl(${STATUT_META[s].colorVar})` }}
          />
          <span className="text-muted-foreground">{STATUT_META[s].label}</span>
        </span>
      ))}
    </div>
  );
}
