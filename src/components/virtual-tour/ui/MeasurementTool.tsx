import { useCallback, useEffect, useRef, useState } from "react";
import { Ruler, Eraser } from "lucide-react";
import { useTourStore } from "../hooks/useTourStore";

const DEMO_SCALE = 0.5; // 1 px = 0.5 m in the demo scene

interface Point {
  x: number;
  y: number;
}

interface MeasurementToolProps {
  /**
   * The canvas (or overlay host) on which the user will click to place points.
   * If omitted, the tool listens on its own SVG overlay (full-viewer click capture).
   */
  canvasRef?: React.RefObject<HTMLElement>;
}

/**
 * Lightweight virtual tape-measure. Only visible when the tour is in 3D mode.
 * The user clicks "Mesurer" to arm the tool, then places two points.
 */
export function MeasurementTool({ canvasRef }: MeasurementToolProps) {
  const mode = useTourStore((s) => s.mode);
  const [active, setActive] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const clear = useCallback(() => {
    setPoints([]);
  }, []);

  const toggle = useCallback(() => {
    setActive((prev) => !prev);
    if (!active) {
      setPoints([]);
    }
  }, [active]);

  // Capture clicks on the external canvas (if provided) or the self overlay
  useEffect(() => {
    if (mode !== "3d" || !active) return;

    const host: HTMLElement | null =
      canvasRef?.current ?? overlayRef.current;
    if (!host) return;

    function handleClick(event: MouseEvent) {
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const point: Point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      setPoints((prev) => {
        if (prev.length >= 2) {
          return [point];
        }
        return [...prev, point];
      });
    }

    host.addEventListener("click", handleClick);
    return () => {
      host.removeEventListener("click", handleClick);
    };
  }, [active, canvasRef, mode]);

  // Reset when leaving 3D mode
  useEffect(() => {
    if (mode !== "3d") {
      setActive(false);
      setPoints([]);
    }
  }, [mode]);

  if (mode !== "3d") {
    return null;
  }

  const [p1, p2] = points;
  const distanceMeters =
    p1 && p2
      ? Math.hypot(p2.x - p1.x, p2.y - p1.y) * DEMO_SCALE
      : 0;

  return (
    <>
      {/* Toolbar */}
      <div className="pointer-events-auto absolute left-1/2 top-5 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.45)] bg-[hsl(var(--primary)/0.18)] px-2 py-1.5 backdrop-blur-md">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={active}
          className="eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1 transition-colors"
          style={{
            background: active ? "hsl(var(--gold))" : "transparent",
            color: active
              ? "hsl(var(--primary))"
              : "hsl(var(--gold-bright))",
          }}
        >
          <Ruler size={14} strokeWidth={1.6} />
          Mesurer
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={points.length === 0}
          className="eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1 text-[hsl(var(--gold-bright))] transition-colors hover:bg-[hsl(var(--gold)/0.12)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Eraser size={14} strokeWidth={1.6} />
          Effacer
        </button>
      </div>

      {/* Click-capture + SVG overlay (only when no external canvas and active) */}
      {active && !canvasRef && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20"
          style={{ cursor: "crosshair" }}
        />
      )}

      {/* Measurement visualization */}
      {(p1 || p2) && (
        <svg
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          aria-hidden="true"
        >
          {p1 && (
            <circle
              cx={p1.x}
              cy={p1.y}
              r={5}
              fill="hsl(var(--gold))"
              stroke="hsl(var(--primary))"
              strokeWidth={1}
            />
          )}
          {p2 && (
            <circle
              cx={p2.x}
              cy={p2.y}
              r={5}
              fill="hsl(var(--gold))"
              stroke="hsl(var(--primary))"
              strokeWidth={1}
            />
          )}
          {p1 && p2 && (
            <>
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="hsl(var(--gold))"
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              <g
                transform={`translate(${(p1.x + p2.x) / 2}, ${
                  (p1.y + p2.y) / 2 - 14
                })`}
              >
                <rect
                  x={-30}
                  y={-12}
                  width={60}
                  height={22}
                  rx={11}
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--gold))"
                  strokeWidth={1}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  y={0}
                  fill="hsl(var(--gold-bright))"
                  fontSize={11}
                  fontFamily="Outfit, sans-serif"
                  letterSpacing="0.08em"
                >
                  {`~ ${distanceMeters.toFixed(1)} m`}
                </text>
              </g>
            </>
          )}
        </svg>
      )}
    </>
  );
}

export default MeasurementTool;
