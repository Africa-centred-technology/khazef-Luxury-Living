import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { ACESFilmicToneMapping, Vector3 } from "three";
import type { Camera, Mesh } from "three";

import type { RoomId } from "../data/tour-data";
import type { RoomKind, TypologyRoom, ApartmentTypology } from "../data/apartment-typologies";
import { useTourStore } from "../hooks/useTourStore";
import { useCurrentTypology } from "../hooks/useCurrentTypology";
import { ApartmentModel } from "./ApartmentModel";
import { FirstPersonControls } from "./FirstPersonControls";
import { CinematicIntro } from "./CinematicIntro";
import { RoomAmbience } from "./RoomAmbience";
import { PostFxPanorama } from "./effects/PostFxPanorama";

interface FirstPersonViewerProps {
  roomId: RoomId;
}

/** Resolve a room in the current typology; fallback to the first one. */
function resolveRoom(typology: ApartmentTypology, kind: RoomId): TypologyRoom {
  return typology.rooms.find((r) => r.kind === (kind as RoomKind)) ?? typology.rooms[0];
}

function CameraTeleport({ typology, roomId }: { typology: ApartmentTypology; roomId: RoomId }) {
  const { camera } = useThree();
  const target = useRef(new Vector3());
  const lookAt = useRef(new Vector3());
  const isAnimating = useRef(false);

  useEffect(() => {
    const room = resolveRoom(typology, roomId);
    target.current.set(...room.cameraPosition);
    lookAt.current.set(...room.cameraLookAt);
    isAnimating.current = true;
  }, [roomId, typology]);

  useFrame(() => {
    if (!isAnimating.current) return;
    camera.position.lerp(target.current, 0.18);
    camera.lookAt(lookAt.current);
    if (camera.position.distanceTo(target.current) < 0.04) {
      camera.position.copy(target.current);
      isAnimating.current = false;
    }
  });

  return null;
}

function NavHotspot3D({
  position,
  label,
  onActivate,
}: {
  position: [number, number, number];
  label: string;
  onActivate: () => void;
}) {
  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onActivate();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "grab";
        }}
      >
        <torusGeometry args={[0.35, 0.06, 16, 32]} />
        <meshStandardMaterial
          color="#c9a961"
          emissive="#ffd98a"
          emissiveIntensity={1.2}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      <mesh>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial
          color="#c9a961"
          transparent
          opacity={0.35}
          emissive="#ffd98a"
          emissiveIntensity={0.5}
        />
      </mesh>
      <Html
        position={[0, 0.55, 0]}
        center
        distanceFactor={6}
        style={{ pointerEvents: "none" }}
      >
        <span
          className="uppercase text-[10px] tracking-[0.22em] font-medium text-secondary bg-primary/80 px-3 py-1 backdrop-blur-sm"
          style={{ whiteSpace: "nowrap" }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

/** One hotspot per OTHER room in the typology. */
function FirstPersonRig({ typology, roomId }: { typology: ApartmentTypology; roomId: RoomId }) {
  const setRoom = useTourStore((s) => s.setRoom);
  return (
    <>
      {typology.rooms
        .filter((r) => r.kind !== (roomId as RoomKind))
        .map((r) => (
          <NavHotspot3D
            key={`hs-${r.kind}`}
            position={[r.center[0], 1, r.center[1]]}
            label={r.name}
            onActivate={() => setRoom(r.kind as unknown as RoomId)}
          />
        ))}
    </>
  );
}

function PickFloor({ floorRef, size }: { floorRef: React.MutableRefObject<Mesh | null>; size: [number, number] }) {
  return (
    <mesh ref={floorRef} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <planeGeometry args={size} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}

export function FirstPersonViewer({ roomId }: FirstPersonViewerProps) {
  const typology = useCurrentTypology();
  const floorRef = useRef<Mesh | null>(null);

  const initialRoom = useMemo(() => resolveRoom(typology, roomId), [typology, roomId]);
  const bounds = useMemo(
    () => ({
      halfWidth: typology.footprint[0] / 2 - 0.4,
      halfDepth: typology.footprint[1] / 2 - 0.4,
    }),
    [typology],
  );

  return (
    <Canvas
      key={typology.id}
      shadows
      camera={{ position: initialRoom.cameraPosition, fov: 72, near: 0.05, far: 60 }}
      gl={{ toneMapping: ACESFilmicToneMapping, antialias: true } as unknown as { toneMapping: number; antialias: boolean }}
      onCreated={({ camera }: { camera: Camera }) => {
        camera.lookAt(new Vector3(...initialRoom.cameraLookAt));
      }}
    >
      <CinematicIntro enabled />

      <ambientLight intensity={0.55} color="#fff4dc" />
      <directionalLight
        position={[10, 8, 4]}
        intensity={1.1}
        color="#ffeccc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight args={["#fff4dc", "#4a5a7a", 0.4]} />

      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <ApartmentModel typology={typology} />
        <RoomAmbience />
      </Suspense>

      <PickFloor floorRef={floorRef} size={typology.footprint} />
      <FirstPersonRig typology={typology} roomId={roomId} />

      <CameraTeleport typology={typology} roomId={roomId} />
      <FirstPersonControls floorRef={floorRef} bounds={bounds} />

      <PostFxPanorama />
    </Canvas>
  );
}

export default FirstPersonViewer;
