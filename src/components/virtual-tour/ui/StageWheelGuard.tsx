import { useEffect } from "react";

interface StageWheelGuardProps {
  /** Stage container ref — wheel events inside this element are captured. */
  stageRef: React.RefObject<HTMLElement>;
}

/**
 * Captures wheel + touch-pinch events inside the immersive stage so they
 * cannot bubble to the page. Without this:
 *  - scrolling over the minimap / carousel overlays scrolls the page
 *  - Ctrl+wheel zooms the whole browser
 *  - iOS two-finger pinch zooms the page
 *
 * We register native listeners with `{ passive: false }` so `preventDefault`
 * actually blocks the browser default. OrbitControls still works: it attaches
 * its own wheel listener directly on the canvas element and reads the event
 * before it bubbles up to us.
 */
export function StageWheelGuard({ stageRef }: StageWheelGuardProps) {
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Always swallow — blocks page scroll AND Ctrl+wheel browser zoom.
      e.preventDefault();
    };

    // Block pinch-to-zoom on touch devices
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Block the global Ctrl+ / Ctrl- browser zoom while the viewer is focused
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("keydown", onKeyDown);
    };
  }, [stageRef]);

  return null;
}

export default StageWheelGuard;
