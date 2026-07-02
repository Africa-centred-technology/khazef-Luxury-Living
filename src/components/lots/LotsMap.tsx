import { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, Maximize } from "lucide-react";
import { type Lot, STATUT_META } from "@/data/lots";
import { formatDH } from "@/data/villas-ahlam";
import { LOT_PARCELS, PLAN_IMAGE, PLAN_WIDTH, PLAN_HEIGHT } from "@/data/lot-parcels";

interface LotsMapProps {
  lots: Lot[];
  selectedNumero: number | null;
  onSelectLot: (lot: Lot) => void;
  /** Numéros visibles (selon filtres) ; les autres sont estompés. */
  visibleNumeros: Set<number>;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

/** Centroïde (moyenne des sommets) d'un polygone normalisé. */
function centroid(poly: ReadonlyArray<readonly [number, number]>): { x: number; y: number } {
  const s = poly.reduce((a, [x, y]) => ({ x: a.x + x, y: a.y + y }), { x: 0, y: 0 });
  return { x: s.x / poly.length, y: s.y / poly.length };
}

/**
 * Carte interactive des 42 lots — CDC §7.
 * Le plan réel de l'architecte (LOTISSEMENT BOUSKOURA) sert de fond ; chaque lot
 * est un polygone réel extrait du vectoriel PDF (src/data/lot-parcels.ts), rempli
 * selon son statut temps réel. Zoom molette/pinch + pan glisser.
 */
export function LotsMap({ lots, selectedNumero, onSelectLot, visibleNumeros }: LotsMapProps) {
  const [hover, setHover] = useState<Lot | null>(null);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchDist = useRef<number | null>(null);
  const moved = useRef(false);

  // Géométrie SVG (points + centroïde) précalculée par lot.
  const geom = useMemo(() => {
    const m = new Map<number, { points: string; cx: number; cy: number; nx: number; ny: number }>();
    for (const [numStr, poly] of Object.entries(LOT_PARCELS)) {
      const num = Number(numStr);
      const points = poly.map(([x, y]) => `${x * PLAN_WIDTH},${y * PLAN_HEIGHT}`).join(" ");
      const c = centroid(poly);
      m.set(num, { points, cx: c.x * PLAN_WIDTH, cy: c.y * PLAN_HEIGHT, nx: c.x, ny: c.y });
    }
    return m;
  }, []);

  const hoverGeom = hover ? geom.get(hover.numero) : null;

  const clamp = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  const zoomBy = (factor: number, clientX?: number, clientY?: number) => {
    setView((v) => {
      const ns = clamp(v.scale * factor);
      if (ns === v.scale) return v;
      const rect = wrapRef.current?.getBoundingClientRect();
      const px = clientX != null && rect ? clientX - rect.left : rect ? rect.width / 2 : 0;
      const py = clientY != null && rect ? clientY - rect.top : rect ? rect.height / 2 : 0;
      const f = ns / v.scale;
      return { scale: ns, x: px - (px - v.x) * f, y: py - (py - v.y) * f };
    });
  };

  // Molette : zoom (listener non-passif pour preventDefault).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const twoFingerDist = () => {
    const p = [...pointers.current.values()];
    return p.length >= 2 ? Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) : 0;
  };
  const twoFingerMid = () => {
    const p = [...pointers.current.values()];
    return { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    wrapRef.current?.setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;
    if (pointers.current.size === 2) pinchDist.current = twoFingerDist();
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const count = pointers.current.size;

    if (count >= 2) {
      const nd = twoFingerDist();
      if (pinchDist.current && nd > 0) {
        const mid = twoFingerMid();
        zoomBy(nd / pinchDist.current, mid.x, mid.y);
      }
      pinchDist.current = nd;
      moved.current = true;
    } else if (count === 1) {
      if (e.pointerType === "mouse" && (e.buttons & 1) === 0) return;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved.current = true;
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchDist.current = null;
    window.setTimeout(() => {
      if (pointers.current.size === 0) moved.current = false;
    }, 0);
  };

  const reset = () => setView({ scale: 1, x: 0, y: 0 });

  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-border/60 bg-secondary/20">
      {/* Contrôles zoom */}
      <div className="absolute right-3 top-3 z-20 flex flex-col overflow-hidden rounded-sm border border-border/60 bg-background/90 shadow-luxe-sm backdrop-blur">
        <button type="button" onClick={() => zoomBy(1.3)} aria-label="Zoomer"
          className="p-2 text-primary transition-colors hover:bg-secondary">
          <Plus className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => zoomBy(1 / 1.3)} aria-label="Dézoomer"
          className="border-t border-border/60 p-2 text-primary transition-colors hover:bg-secondary">
          <Minus className="h-4 w-4" />
        </button>
        <button type="button" onClick={reset} aria-label="Réinitialiser la vue"
          className="border-t border-border/60 p-2 text-primary transition-colors hover:bg-secondary">
          <Maximize className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={wrapRef}
        className="relative w-full touch-none"
        style={{ cursor: view.scale > 1 ? "grab" : "default" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="relative origin-top-left"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        >
          <img
            src={PLAN_IMAGE}
            alt="Plan du lotissement Les Villas Ahlam — Bouskoura"
            width={PLAN_WIDTH}
            height={PLAN_HEIGHT}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full select-none"
            draggable={false}
          />

          <svg
            viewBox={`0 0 ${PLAN_WIDTH} ${PLAN_HEIGHT}`}
            className="absolute inset-0 h-full w-full"
            role="group"
            aria-label="Plan interactif des 42 lots"
          >
            {lots.map((lot) => {
              const g = geom.get(lot.numero);
              if (!g) return null;
              const meta = STATUT_META[lot.statut];
              const isSelected = selectedNumero === lot.numero;
              const isVisible = visibleNumeros.has(lot.numero);
              const isHovered = hover?.numero === lot.numero;
              const interactive = meta.cliquable && isVisible;
              const baseOpacity = lot.statut === "vendu" ? 0.42 : 0.52;
              // Étiquette lisible : sombre sur Honeycomb, ivoire sinon.
              const labelFill = lot.statut === "en_cours" ? "hsl(21 12% 20%)" : "hsl(var(--background))";
              return (
                <g
                  key={lot.id}
                  data-lot-id={lot.id}
                  data-status={lot.statut}
                  data-surface={lot.surfaceM2}
                  className={interactive ? "cursor-pointer" : "cursor-not-allowed"}
                  opacity={isVisible ? 1 : 0.18}
                  onMouseEnter={() => isVisible && setHover(lot)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => {
                    if (moved.current) return; // pan/pinch, pas un clic
                    if (interactive) onSelectLot(lot);
                  }}
                  role="button"
                  aria-label={`Lot ${lot.numero}, ${lot.surfaceM2} m², ${meta.label}`}
                  tabIndex={interactive ? 0 : -1}
                  onKeyDown={(e) => {
                    if (interactive && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      onSelectLot(lot);
                    }
                  }}
                >
                  <polygon
                    points={g.points}
                    fill={`hsl(${meta.colorVar})`}
                    fillOpacity={isHovered ? baseOpacity + 0.25 : baseOpacity}
                    stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--background))"}
                    strokeWidth={isSelected ? 6 : 2}
                    strokeLinejoin="round"
                    className="transition-[fill-opacity]"
                  />
                  <text
                    x={g.cx}
                    y={g.cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 30, fontWeight: 700 }}
                    fill={labelFill}
                  >
                    {lot.numero}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip — CDC §7.3 (contre-scalé pour rester lisible au zoom) */}
          {hover && hoverGeom && (
            <div
              className="pointer-events-none absolute z-10 rounded-sm bg-charcoal px-3 py-2 text-background shadow-luxe-md"
              style={{
                left: `${hoverGeom.nx * 100}%`,
                top: `${hoverGeom.ny * 100}%`,
                transform: `translate(-50%, calc(-100% - 10px)) scale(${1 / view.scale})`,
                transformOrigin: "bottom center",
              }}
            >
              <div className="font-display text-base leading-none">Lot {hover.numero}</div>
              <div className="text-xs opacity-90">
                {hover.surfaceM2} m² · {STATUT_META[hover.statut].label}
              </div>
              <div className="text-xs font-medium text-gold">
                À partir de {formatDH(hover.prixIndicatif)}
              </div>
            </div>
          )}
        </div>
      </div>
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
