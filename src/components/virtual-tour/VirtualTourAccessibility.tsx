import { useEffect } from "react";
import { useTourStore } from "./hooks/useTourStore";
import { ROOM_ORDER, type RoomId } from "./data/tour-data";

interface VirtualTourAccessibilityProps {
  /**
   * Fired once if the browser reports prefers-reduced-motion: reduce.
   * Orchestrator can use it to disable autorotate, parallax, etc.
   */
  onReducedMotion?: () => void;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function nextRoom(current: RoomId, direction: 1 | -1): RoomId {
  const index = ROOM_ORDER.indexOf(current);
  if (index === -1) {
    return ROOM_ORDER[0];
  }
  const total = ROOM_ORDER.length;
  const nextIndex = (index + direction + total) % total;
  return ROOM_ORDER[nextIndex];
}

/**
 * Invisible side-effect component:
 * - sets <html lang="fr"> while mounted
 * - honours prefers-reduced-motion (disables XR, keeps audio off)
 * - wires keyboard shortcuts: ArrowLeft / ArrowRight navigate rooms, Escape closes panels
 */
function VirtualTourAccessibility({
  onReducedMotion,
}: VirtualTourAccessibilityProps): null {
  useEffect(() => {
    const html = document.documentElement;
    const previousLang = html.lang;
    html.lang = "fr";

    return () => {
      html.lang = previousLang;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    if (!media.matches) {
      return;
    }

    const store = useTourStore.getState();
    store.setXrActive(false);
    if (store.audioEnabled) {
      store.toggleAudio();
    }

    onReducedMotion?.();
  }, [onReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleKey = (event: KeyboardEvent): void => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const isEditable =
        target?.isContentEditable === true ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT";
      if (isEditable) {
        return;
      }

      const store = useTourStore.getState();

      if (event.key === "ArrowRight") {
        event.preventDefault();
        store.setRoom(nextRoom(store.currentRoom, 1));
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        store.setRoom(nextRoom(store.currentRoom, -1));
        return;
      }

      if (event.key === "Escape" && store.infoPanelId !== null) {
        event.preventDefault();
        store.closeInfoPanel();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return null;
}

export default VirtualTourAccessibility;
