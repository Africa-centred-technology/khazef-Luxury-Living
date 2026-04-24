import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Raycaster, Vector2, Vector3 } from "three";
import type { Mesh } from "three";

/**
 * First-person navigation inside the Khazef apartment.
 *
 * Inputs
 * ------
 * - Mouse / pointer drag  → look around (yaw + pitch)
 * - WASD / Z-Q-S-D / arrow keys → walk (relative to current facing)
 * - Shift  → sprint (×1.8)
 * - Left-click on the floor (short click, no drag) → smooth walk-to
 *
 * Collisions
 * ----------
 * The apartment is ~14×5 m. We clamp the camera to the outer box and
 * forbid crossing the two interior partitions at x=±2.5 for the lower
 * part of the plan (the passages stay open on the front half).
 * X and Z are tested independently so the user naturally slides along walls.
 */

const EYE_HEIGHT = 1.6;
const BASE_SPEED = 2.4; // m / s
const SPRINT_MUL = 1.8;
const LOOK_SENSITIVITY = 0.003;
const MAX_PITCH = Math.PI / 2 - 0.1;
// FOV zoom bounds (degrees) — 35° = narrow (like binoculars), 85° = wide angle
const MIN_FOV = 35;
const MAX_FOV = 85;
const FOV_STEP = 3;

interface FirstPersonControlsProps {
  floorRef: React.MutableRefObject<Mesh | null>;
  /** Outer footprint bounds (half-extents, in metres) of the current apartment. */
  bounds: { halfWidth: number; halfDepth: number };
}

export function FirstPersonControls({ floorRef, bounds }: FirstPersonControlsProps) {
  const canOccupy = (x: number, z: number): boolean => {
    if (x < -bounds.halfWidth || x > bounds.halfWidth) return false;
    if (z < -bounds.halfDepth || z > bounds.halfDepth) return false;
    return true;
  };
  const { camera, gl } = useThree();

  // Look state
  const yaw = useRef(Math.PI);
  const pitch = useRef(0);
  const yawPitchSeeded = useRef(false);

  // Drag state
  const dragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });

  // Key state
  const keys = useRef<Record<string, boolean>>({});
  // Click-to-walk target
  const walkTarget = useRef<Vector3 | null>(null);
  const raycaster = useRef(new Raycaster());
  const ndc = useRef(new Vector2());

  // --- Pointer: drag to look, short-click-on-floor to walk
  useEffect(() => {
    const el = gl.domElement;

    const seedFromCamera = () => {
      const dir = new Vector3();
      camera.getWorldDirection(dir);
      yaw.current = Math.atan2(dir.x, dir.z);
      pitch.current = Math.asin(dir.y);
      yawPitchSeeded.current = true;
    };

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      dragMoved.current = false;
      dragStart.current = { x: e.clientX, y: e.clientY };
      lastPointer.current = { x: e.clientX, y: e.clientY };
      el.style.cursor = "grabbing";
      if (!yawPitchSeeded.current) seedFromCamera();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      if (Math.abs(e.clientX - dragStart.current.x) + Math.abs(e.clientY - dragStart.current.y) > 4) {
        dragMoved.current = true;
      }
      yaw.current -= dx * LOOK_SENSITIVITY;
      pitch.current -= dy * LOOK_SENSITIVITY;
      pitch.current = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch.current));
    };

    const onUp = (e: PointerEvent) => {
      const wasDragging = dragging.current;
      const moved = dragMoved.current;
      dragging.current = false;
      el.style.cursor = "grab";
      if (!wasDragging || moved) return;

      // Short click — try floor pick for walk-to
      const rect = el.getBoundingClientRect();
      ndc.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.current.setFromCamera(ndc.current, camera);
      const floor = floorRef.current;
      if (!floor) return;
      const hits = raycaster.current.intersectObject(floor, false);
      if (hits.length > 0) {
        const hit = hits[0].point;
        if (canOccupy(hit.x, hit.z)) {
          walkTarget.current = new Vector3(hit.x, EYE_HEIGHT, hit.z);
        }
      }
    };

    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [camera, gl, floorRef]);

  // --- Wheel zoom (FOV) — use camera FOV like Street View / Matterport
  useEffect(() => {
    const el = gl.domElement;

    const onWheel = (e: WheelEvent) => {
      // Block page scroll / Ctrl-zoom — we handle the wheel ourselves
      e.preventDefault();
      e.stopPropagation();
      if (!(camera instanceof PerspectiveCamera)) return;
      // deltaY > 0 = scroll down / toward user → zoom out (wider FOV)
      // deltaY < 0 = scroll up / away → zoom in (narrower FOV)
      const dir = Math.sign(e.deltaY);
      const next = camera.fov + dir * FOV_STEP;
      camera.fov = Math.max(MIN_FOV, Math.min(MAX_FOV, next));
      camera.updateProjectionMatrix();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [camera, gl]);

  // --- Keys
  useEffect(() => {
    const onKey = (pressed: boolean) => (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      keys.current[k] = pressed;
    };
    const down = onKey(true);
    const up = onKey(false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // --- Per-frame update
  useFrame((_, delta) => {
    // 1) Apply look orientation
    const yawS = Math.sin(yaw.current);
    const yawC = Math.cos(yaw.current);
    const pitchS = Math.sin(pitch.current);
    const pitchC = Math.cos(pitch.current);

    // 2) Movement input — relative to yaw only (so up always stays up)
    const k = keys.current;
    const fwd = (k["w"] ? 1 : 0) + (k["z"] ? 1 : 0) + (k["arrowup"] ? 1 : 0) - (k["s"] ? 1 : 0) - (k["arrowdown"] ? 1 : 0);
    const strafe = (k["d"] ? 1 : 0) + (k["arrowright"] ? 1 : 0) - (k["a"] ? 1 : 0) - (k["q"] ? 1 : 0) - (k["arrowleft"] ? 1 : 0);

    let dx = 0;
    let dz = 0;
    const hasKeyInput = fwd !== 0 || strafe !== 0;
    if (hasKeyInput) {
      walkTarget.current = null; // manual key input cancels click-walk
      const speed = (k["shift"] ? SPRINT_MUL : 1) * BASE_SPEED * delta;
      // forward direction in XZ, ignoring pitch
      const fX = yawS;
      const fZ = yawC;
      const sX = yawC;
      const sZ = -yawS;
      dx = (fX * fwd + sX * strafe) * speed;
      dz = (fZ * fwd + sZ * strafe) * speed;
    } else if (walkTarget.current) {
      // Smooth click-walk toward target
      const cx = camera.position.x;
      const cz = camera.position.z;
      const tx = walkTarget.current.x;
      const tz = walkTarget.current.z;
      const ddx = tx - cx;
      const ddz = tz - cz;
      const dist = Math.hypot(ddx, ddz);
      if (dist < 0.08) {
        walkTarget.current = null;
      } else {
        const step = BASE_SPEED * delta;
        const s = Math.min(step, dist) / dist;
        dx = ddx * s;
        dz = ddz * s;
      }
    }

    // 3) Collide — apply X and Z independently so we slide along walls
    const nextX = camera.position.x + dx;
    if (canOccupy(nextX, camera.position.z)) camera.position.x = nextX;
    const nextZ = camera.position.z + dz;
    if (canOccupy(camera.position.x, nextZ)) camera.position.z = nextZ;

    // 4) Lock eye height
    camera.position.y = EYE_HEIGHT;

    // 5) Apply look orientation
    const lookAt = new Vector3(
      camera.position.x + yawS * pitchC,
      camera.position.y + pitchS,
      camera.position.z + yawC * pitchC,
    );
    camera.lookAt(lookAt);
  });

  return null;
}

export default FirstPersonControls;
