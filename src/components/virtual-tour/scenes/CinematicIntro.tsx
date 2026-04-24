import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

import { TOUR_ROOMS } from "../data/tour-data";
import { useTourStore } from "../hooks/useTourStore";

interface CinematicIntroProps {
  enabled?: boolean;
  durationMs?: number;
  onComplete?: () => void;
}

/** cubic ease-in-out */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const START_POSITION: [number, number, number] = [10, 4, 10];
const START_LOOKAT: [number, number, number] = [0, 1.2, 0];

/**
 * One-shot cinematic "reveal" sweep when the tour first mounts or when
 * the current typology/room changes. Starts from an elevated exterior
 * vantage and eases toward the current room's first-person waypoint.
 *
 * Non-destructive: simply writes to `camera.position` and calls
 * `camera.lookAt()` each frame until the target is reached, then
 * releases control back to `FirstPersonControls`.
 *
 * Kept intentionally short (≤ 1800 ms) so user input takes over quickly
 * — we cannot freeze the FirstPersonControls listeners without touching
 * their source, so short-duration is the graceful compromise.
 */
export function CinematicIntro({
  enabled = true,
  durationMs = 1600,
  onComplete,
}: CinematicIntroProps) {
  const { camera } = useThree();
  const currentRoom = useTourStore((s) => s.currentRoom);
  const currentTypology = useTourStore((s) => s.currentTypology);

  const startedAtRef = useRef<number | null>(null);
  const isActiveRef = useRef(false);
  const fromPos = useRef(new Vector3());
  const toPos = useRef(new Vector3());
  const fromLook = useRef(new Vector3());
  const toLook = useRef(new Vector3());
  const tmpLook = useRef(new Vector3());
  const onCompleteRef = useRef(onComplete);

  // Keep latest callback without retriggering the effect.
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Retrigger the intro whenever the typology or room identity changes.
  useEffect(() => {
    if (!enabled) return;

    const room = TOUR_ROOMS[currentRoom];
    fromPos.current.set(...START_POSITION);
    fromLook.current.set(...START_LOOKAT);
    toPos.current.set(...room.cameraPosition);
    toLook.current.set(...room.cameraLookAt);

    camera.position.copy(fromPos.current);
    camera.lookAt(fromLook.current);

    startedAtRef.current = performance.now();
    isActiveRef.current = true;
  }, [enabled, camera, currentRoom, currentTypology]);

  useFrame(() => {
    if (!isActiveRef.current || startedAtRef.current === null) return;

    const elapsed = performance.now() - startedAtRef.current;
    const t = Math.min(1, elapsed / durationMs);
    const e = easeInOutCubic(t);

    camera.position.lerpVectors(fromPos.current, toPos.current, e);
    tmpLook.current.lerpVectors(fromLook.current, toLook.current, e);
    camera.lookAt(tmpLook.current);

    if (t >= 1) {
      isActiveRef.current = false;
      startedAtRef.current = null;
      onCompleteRef.current?.();
    }
  });

  return null;
}

export default CinematicIntro;
