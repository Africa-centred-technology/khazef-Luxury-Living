import { Suspense, useMemo } from "react";
import { RepeatWrapping } from "three";
import { useGLTF, useTexture } from "@react-three/drei";

import marbleUrl from "@/assets/material-marble.jpg";
import zelligeUrl from "@/assets/material-zellige.jpg";

import type { ApartmentTypology, RoomKind, TypologyRoom, TypologyTheme, WindowStyle } from "../data/apartment-typologies";
import { useTourStore } from "../hooks/useTourStore";

/**
 * PARAMETRIC Luxury Living apartment — renders walls, floor, ceiling, and
 * per-room furniture according to the given `typology`. Changing the
 * typology prop produces a visibly different apartment (different
 * footprint, different rooms, different furniture per RoomKind).
 */

const WALL_HEIGHT = 2.8;
const WALL_THICKNESS = 0.12;

const COLOR_WALL_INTERIOR = "#efe6d4";
const COLOR_WALL_EXTERIOR = "#e8e0d2";
const COLOR_FLOOR = "#f2ede3";
const COLOR_CEILING = "#faf7f2";
const COLOR_INDIGO = "#0e1f4d";
const COLOR_INDIGO_SOFT = "#2d4a9a";
const COLOR_GOLD = "#c9a961";
const COLOR_COBALT = "#1a3a8c";
const COLOR_CREAM = "#faf7f2";
const COLOR_TADELAKT = "#d9ccb5";
const COLOR_TERRACE = "#8a7a5c";

interface WallProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}

function Wall({ position, size, color = COLOR_WALL_INTERIOR }: WallProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.85} metalness={0.02} />
    </mesh>
  );
}

function WindowFrame({
  position,
  width,
  height,
  style,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  style: WindowStyle;
}) {
  if (style === "porthole") {
    const radius = Math.min(width, height) / 2;
    return (
      <group position={position}>
        <mesh>
          <circleGeometry args={[radius, 32]} />
          <meshStandardMaterial
            color="#a8c8d9"
            transparent
            opacity={0.4}
            roughness={0.1}
            metalness={0.2}
            emissive="#d9e8ef"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <torusGeometry args={[radius, 0.05, 12, 48]} />
          <meshStandardMaterial color={COLOR_GOLD} roughness={0.3} metalness={0.9} />
        </mesh>
      </group>
    );
  }
  if (style === "panoramic") {
    // Floor-to-ceiling glass with minimalist dark frame
    return (
      <group position={[position[0], WALL_HEIGHT / 2, position[2]]}>
        <mesh>
          <planeGeometry args={[width * 1.4, WALL_HEIGHT - 0.15]} />
          <meshStandardMaterial
            color="#8aa8b8"
            transparent
            opacity={0.28}
            roughness={0.05}
            metalness={0.25}
            emissive="#c9dce4"
            emissiveIntensity={0.25}
          />
        </mesh>
        {/* Thin dark frames */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[width * 1.4, 0.03, 0.03]} />
          <meshStandardMaterial color="#1a1d28" roughness={0.5} metalness={0.6} />
        </mesh>
        <mesh position={[0, (WALL_HEIGHT - 0.15) / 2, 0.02]}>
          <boxGeometry args={[width * 1.4, 0.03, 0.03]} />
          <meshStandardMaterial color="#1a1d28" roughness={0.5} metalness={0.6} />
        </mesh>
        <mesh position={[0, -(WALL_HEIGHT - 0.15) / 2, 0.02]}>
          <boxGeometry args={[width * 1.4, 0.03, 0.03]} />
          <meshStandardMaterial color="#1a1d28" roughness={0.5} metalness={0.6} />
        </mesh>
      </group>
    );
  }
  // Default — rectangular with brass frame (Atlantique moroccan luxe)
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#a8c8d9"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.2}
          emissive="#d9e8ef"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[width, 0.04, 0.04]} />
        <meshStandardMaterial color={COLOR_GOLD} roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.04, height, 0.04]} />
        <meshStandardMaterial color={COLOR_GOLD} roughness={0.3} metalness={0.85} />
      </mesh>
    </group>
  );
}

function Rug({ position, size, color }: { position: [number, number, number]; size: [number, number]; color: string }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  );
}

function Sconce({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 12]} />
        <meshStandardMaterial color={COLOR_GOLD} emissive="#ffd98a" emissiveIntensity={2.2} roughness={0.3} metalness={0.7} />
      </mesh>
      <pointLight intensity={0.6} distance={3.5} decay={2} color="#ffd98a" />
    </group>
  );
}

/* --- Furniture per RoomKind, centred on the room's local origin --- */

function LivingFurniture({ center, marbleMap, theme }: { center: [number, number]; marbleMap: ReturnType<typeof useTexture>; theme: TypologyTheme }) {
  const [cx, cz] = center;
  return (
    <group>
      {/* Sofa */}
      <mesh position={[cx, 0.35, cz - 0.8]} castShadow>
        <boxGeometry args={[2.6, 0.35, 0.9]} />
        <meshStandardMaterial color={theme.sofa} roughness={0.9} />
      </mesh>
      <mesh position={[cx, 0.75, cz - 1.18]} castShadow>
        <boxGeometry args={[2.6, 0.6, 0.15]} />
        <meshStandardMaterial color={theme.sofaBack} roughness={0.9} />
      </mesh>
      <mesh position={[cx - 0.8, 0.6, cz - 0.7]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color={theme.bedThrow} roughness={0.7} />
      </mesh>
      <mesh position={[cx + 0.8, 0.6, cz - 0.7]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color={theme.bedHeadboard} roughness={0.7} />
      </mesh>
      {/* Coffee table — marble top + brass feet */}
      <mesh position={[cx, 0.4, cz + 0.5]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.7]} />
        <meshStandardMaterial map={marbleMap as unknown as undefined} roughness={0.15} metalness={0.1} />
      </mesh>
      {[[-0.55, 0.2], [0.55, 0.2], [-0.55, 0.8], [0.55, 0.8]].map(([dx, dz], i) => (
        <mesh key={i} position={[cx + dx, 0.2, cz + dz]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 12]} />
          <meshStandardMaterial color={COLOR_GOLD} roughness={0.3} metalness={0.9} />
        </mesh>
      ))}
      {/* Rug */}
      <Rug position={[cx, 0.01, cz]} size={[3.2, 2.2]} color={theme.rugLiving} />
      {/* Chandelier */}
      <mesh position={[cx, 2.4, cz]}>
        <sphereGeometry args={[0.12, 16, 12]} />
        <meshStandardMaterial color={COLOR_GOLD} emissive="#ffd98a" emissiveIntensity={1.5} metalness={0.9} roughness={0.3} />
      </mesh>
      <pointLight position={[cx, 2.3, cz]} intensity={0.8} distance={5} decay={2} color="#ffe3a3" />
    </group>
  );
}

function KitchenFurniture({ center, marbleMap, theme }: { center: [number, number]; marbleMap: ReturnType<typeof useTexture>; theme: TypologyTheme }) {
  const [cx, cz] = center;
  return (
    <group>
      {/* Island base */}
      <mesh position={[cx, 0.45, cz]} castShadow>
        <boxGeometry args={[2.6, 0.9, 1.1]} />
        <meshStandardMaterial color={theme.kitchenBase} roughness={0.5} metalness={0.15} />
      </mesh>
      {/* Marble worktop */}
      <mesh position={[cx, 0.94, cz]} castShadow receiveShadow>
        <boxGeometry args={[2.7, 0.06, 1.2]} />
        <meshStandardMaterial map={marbleMap as unknown as undefined} roughness={0.12} metalness={0.1} />
      </mesh>
      {/* Tap */}
      <mesh position={[cx + 0.8, 1.15, cz]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.3, 12]} />
        <meshStandardMaterial color={COLOR_GOLD} roughness={0.2} metalness={0.95} />
      </mesh>
      <mesh position={[cx + 0.8, 1.3, cz - 0.1]} castShadow>
        <boxGeometry args={[0.05, 0.05, 0.2]} />
        <meshStandardMaterial color={COLOR_GOLD} roughness={0.2} metalness={0.95} />
      </mesh>
      {/* Stools */}
      {[-0.7, 0, 0.7].map((dx) => (
        <group key={dx} position={[cx + dx, 0, cz + 0.9]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
            <meshStandardMaterial color="#5c9ba3" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.44, 10]} />
            <meshStandardMaterial color={COLOR_GOLD} metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      ))}
      {/* Wall cabinets + handles */}
      <mesh position={[cx, 1.1, cz - 1.2]} castShadow>
        <boxGeometry args={[3.4, 2.2, 0.55]} />
        <meshStandardMaterial color={theme.kitchenBase} roughness={0.45} metalness={0.2} />
      </mesh>
      {[-0.8, 0, 0.8].map((dx) => (
        <mesh key={dx} position={[cx + dx, 1.4, cz - 0.92]}>
          <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
          <meshStandardMaterial color={COLOR_GOLD} metalness={0.95} roughness={0.2} />
        </mesh>
      ))}
      <Rug position={[cx, 0.01, cz + 1.4]} size={[2.2, 1.2]} color={theme.rugKitchen} />
    </group>
  );
}

function BedroomFurniture({ center, zelligeMap, accent, theme }: { center: [number, number]; zelligeMap: ReturnType<typeof useTexture>; accent?: boolean; theme: TypologyTheme }) {
  const [cx, cz] = center;
  const showZelligeFrieze = accent && theme.accent === "zellige";
  const showRopeFrieze = accent && theme.accent === "rope";
  return (
    <group>
      {/* Zellige frieze (Atlantique master bedroom only) */}
      {showZelligeFrieze && (
        <mesh position={[cx, 2.2, cz - 1.65]}>
          <planeGeometry args={[3, 0.5]} />
          <meshStandardMaterial map={zelligeMap as unknown as undefined} color={COLOR_COBALT} roughness={0.4} metalness={0.1} />
        </mesh>
      )}
      {/* Rope/nautical frieze (Port) — a simple navy band with brass rivets */}
      {showRopeFrieze && (
        <>
          <mesh position={[cx, 2.2, cz - 1.65]}>
            <planeGeometry args={[3, 0.18]} />
            <meshStandardMaterial color="#1a2a4c" roughness={0.85} />
          </mesh>
          {[-1.2, -0.4, 0.4, 1.2].map((dx) => (
            <mesh key={dx} position={[cx + dx, 2.2, cz - 1.64]}>
              <sphereGeometry args={[0.04, 12, 10]} />
              <meshStandardMaterial color={COLOR_GOLD} roughness={0.2} metalness={0.95} />
            </mesh>
          ))}
        </>
      )}
      {/* Bed */}
      <mesh position={[cx, 0.3, cz - 0.3]} castShadow>
        <boxGeometry args={[2, 0.35, 2.2]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.75} />
      </mesh>
      <mesh position={[cx, 0.55, cz - 0.3]} castShadow receiveShadow>
        <boxGeometry args={[1.95, 0.18, 2.15]} />
        <meshStandardMaterial color="#f7f2e8" roughness={0.95} />
      </mesh>
      <mesh position={[cx, 0.645, cz + 0.3]} castShadow>
        <boxGeometry args={[1.9, 0.02, 0.9]} />
        <meshStandardMaterial color={theme.bedThrow} roughness={0.7} />
      </mesh>
      {[-0.5, 0.5].map((dx) => (
        <mesh key={dx} position={[cx + dx, 0.68, cz - 1.05]} castShadow>
          <boxGeometry args={[0.7, 0.12, 0.45]} />
          <meshStandardMaterial color={COLOR_CREAM} roughness={0.95} />
        </mesh>
      ))}
      {/* Headboard */}
      <mesh position={[cx, 1.1, cz - 1.35]} castShadow>
        <boxGeometry args={[2.1, 1.4, 0.12]} />
        <meshStandardMaterial color={theme.bedHeadboard} roughness={0.85} />
      </mesh>
      {/* Sconces */}
      <Sconce position={[cx - 1.2, 2, cz - 1.55]} />
      <Sconce position={[cx + 1.2, 2, cz - 1.55]} />
      <Rug position={[cx, 0.01, cz + 0.3]} size={[2.6, 2.4]} color={theme.rugBedroom} />
    </group>
  );
}

function DressingFurniture({ center }: { center: [number, number] }) {
  const [cx, cz] = center;
  return (
    <group>
      {/* Two wardrobes */}
      <mesh position={[cx - 0.9, 1.1, cz - 0.8]} castShadow>
        <boxGeometry args={[1.6, 2.2, 0.6]} />
        <meshStandardMaterial color={COLOR_INDIGO} roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh position={[cx + 0.9, 1.1, cz - 0.8]} castShadow>
        <boxGeometry args={[1.6, 2.2, 0.6]} />
        <meshStandardMaterial color={COLOR_INDIGO} roughness={0.45} metalness={0.2} />
      </mesh>
      {[-1.4, -0.4, 0.4, 1.4].map((dx) => (
        <mesh key={dx} position={[cx + dx, 1.1, cz - 0.5]}>
          <cylinderGeometry args={[0.012, 0.012, 0.25, 8]} />
          <meshStandardMaterial color={COLOR_GOLD} metalness={0.95} roughness={0.2} />
        </mesh>
      ))}
      {/* Central bench */}
      <mesh position={[cx, 0.45, cz + 0.6]} castShadow>
        <boxGeometry args={[1.2, 0.1, 0.5]} />
        <meshStandardMaterial color={COLOR_TADELAKT} roughness={0.85} />
      </mesh>
      <mesh position={[cx, 0.22, cz + 0.6]} castShadow>
        <boxGeometry args={[1.15, 0.04, 0.46]} />
        <meshStandardMaterial color={COLOR_GOLD} metalness={0.9} roughness={0.25} />
      </mesh>
      <Rug position={[cx, 0.01, cz + 0.3]} size={[2, 2]} color="#d9ccb5" />
    </group>
  );
}

function BathroomFurniture({ center, marbleMap }: { center: [number, number]; marbleMap: ReturnType<typeof useTexture> }) {
  const [cx, cz] = center;
  return (
    <group>
      {/* Freestanding tub */}
      <mesh position={[cx, 0.35, cz - 0.4]} castShadow>
        <cylinderGeometry args={[0.65, 0.55, 0.6, 32]} />
        <meshStandardMaterial color={COLOR_CREAM} roughness={0.15} metalness={0.05} />
      </mesh>
      {/* Vanity */}
      <mesh position={[cx, 0.45, cz + 1]} castShadow>
        <boxGeometry args={[1.6, 0.9, 0.55]} />
        <meshStandardMaterial color={COLOR_INDIGO} roughness={0.5} metalness={0.15} />
      </mesh>
      <mesh position={[cx, 0.94, cz + 1]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.06, 0.65]} />
        <meshStandardMaterial map={marbleMap as unknown as undefined} roughness={0.12} metalness={0.1} />
      </mesh>
      {/* Basin */}
      <mesh position={[cx, 1, cz + 1]}>
        <cylinderGeometry args={[0.22, 0.18, 0.12, 24]} />
        <meshStandardMaterial color={COLOR_CREAM} roughness={0.2} />
      </mesh>
      <mesh position={[cx, 1.25, cz + 0.9]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.25, 12]} />
        <meshStandardMaterial color={COLOR_GOLD} roughness={0.2} metalness={0.95} />
      </mesh>
    </group>
  );
}

function TerraceFurniture({ center }: { center: [number, number] }) {
  const [cx, cz] = center;
  return (
    <group>
      {/* Wooden deck overlay */}
      <mesh position={[cx, 0.02, cz]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.8, 4.8]} />
        <meshStandardMaterial color={COLOR_TERRACE} roughness={0.9} />
      </mesh>
      {/* Outdoor lounge */}
      <mesh position={[cx, 0.25, cz - 1]} castShadow>
        <boxGeometry args={[2, 0.3, 0.9]} />
        <meshStandardMaterial color={COLOR_CREAM} roughness={0.8} />
      </mesh>
      <mesh position={[cx, 0.6, cz - 1.35]} castShadow>
        <boxGeometry args={[2, 0.5, 0.15]} />
        <meshStandardMaterial color={COLOR_TADELAKT} roughness={0.8} />
      </mesh>
      {/* Coffee table */}
      <mesh position={[cx, 0.25, cz + 0.2]} castShadow>
        <boxGeometry args={[0.9, 0.05, 0.6]} />
        <meshStandardMaterial color={COLOR_GOLD} roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Olive tree (simple) */}
      <group position={[cx + 1, 0, cz + 1.5]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.35, 0.4, 0.5, 16]} />
          <meshStandardMaterial color={COLOR_TADELAKT} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1, 0]} castShadow>
          <sphereGeometry args={[0.55, 12, 10]} />
          <meshStandardMaterial color="#6a8a5a" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 0.6, 8]} />
          <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function renderFurniture(
  room: TypologyRoom,
  textures: { marble: ReturnType<typeof useTexture>; zellige: ReturnType<typeof useTexture> },
  theme: TypologyTheme,
): JSX.Element | null {
  const kind: RoomKind = room.kind;
  const { marble, zellige } = textures;
  switch (kind) {
    case "living":
      return <LivingFurniture center={room.center} marbleMap={marble} theme={theme} />;
    case "kitchen":
      return <KitchenFurniture center={room.center} marbleMap={marble} theme={theme} />;
    case "bedroom":
      return <BedroomFurniture center={room.center} zelligeMap={zellige} accent theme={theme} />;
    case "bedroom-2":
      return <BedroomFurniture center={room.center} zelligeMap={zellige} theme={theme} />;
    case "dressing":
      return <DressingFurniture center={room.center} />;
    case "bathroom":
      return <BathroomFurniture center={room.center} marbleMap={marble} />;
    case "terrace":
      return <TerraceFurniture center={room.center} />;
    default:
      return null;
  }
}

interface ClickableRoomFloorProps {
  position: [number, number, number];
  size: [number, number];
  roomKind: RoomKind;
  teleportable?: boolean;
}

function ClickableRoomFloor({ position, size, roomKind, teleportable = false }: ClickableRoomFloorProps) {
  const setRoom = useTourStore((s) => s.setRoom);
  const setMode = useTourStore((s) => s.setMode);
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      onClick={(e) => {
        if (!teleportable) return;
        e.stopPropagation();
        setRoom(roomKind);
        setMode("panorama");
      }}
      onPointerOver={(e) => {
        if (!teleportable) return;
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
}

interface ApartmentModelProps {
  typology: ApartmentTypology;
  clickableFloors?: boolean;
  /** Render the ceiling plane. Set to false for the bird-eye "doll-house" 3D view. */
  showCeiling?: boolean;
}

/**
 * Loads a real GLB/GLTF exported from the architect's CAD. Suspense-compatible
 * (useGLTF throws a promise until ready) — wrap in <Suspense> at the caller.
 */
function GLTFApartment({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
}

export function ApartmentModel({ typology, clickableFloors = false, showCeiling = true }: ApartmentModelProps) {
  // Pipeline A — architect-supplied .glb takes precedence over parametric
  if (typology.modelUrl) {
    return (
      <group>
        <Suspense fallback={null}>
          <GLTFApartment url={typology.modelUrl} />
        </Suspense>
        {/* Keep clickable-floor hit boxes so teleport + mode switch still work on top of a real model */}
        {clickableFloors &&
          typology.rooms.map((room) => (
            <ClickableRoomFloor
              key={`cf-glb-${room.kind}-${room.center.join(",")}`}
              position={[room.center[0], 0.02, room.center[1]]}
              size={[room.size[0] - 0.3, room.size[1] - 0.3]}
              roomKind={room.kind}
              teleportable
            />
          ))}
      </group>
    );
  }
  return <ApartmentParametric typology={typology} clickableFloors={clickableFloors} showCeiling={showCeiling} />;
}

function ApartmentParametric({ typology, clickableFloors = false, showCeiling = true }: ApartmentModelProps) {
  const marble = useTexture(marbleUrl);
  const zellige = useTexture(zelligeUrl);

  useMemo(() => {
    [marble, zellige].forEach((t) => {
      const tex = t as unknown as { wrapS: number; wrapT: number; repeat: { set: (x: number, y: number) => void } };
      tex.wrapS = RepeatWrapping;
      tex.wrapT = RepeatWrapping;
      tex.repeat.set(2, 2);
    });
    return null;
  }, [marble, zellige]);

  const [width, depth] = typology.footprint;
  const halfW = width / 2;
  const halfD = depth / 2;

  // Compute dividing walls between adjacent rooms along X (horizontal neighbours)
  const dividers = useMemo(() => {
    const sortedByX = [...typology.rooms].sort((a, b) => a.center[0] - b.center[0]);
    const lines: Array<{ x: number; zRange: [number, number] }> = [];
    for (let i = 0; i < sortedByX.length - 1; i += 1) {
      const a = sortedByX[i];
      const b = sortedByX[i + 1];
      // same Z band (abs diff < 0.5) → vertical divider between them
      if (Math.abs(a.center[1] - b.center[1]) < 0.5 && a.kind !== "terrace" && b.kind !== "terrace") {
        const dividerX = (a.center[0] + b.center[0]) / 2;
        const zMid = (a.center[1] + b.center[1]) / 2;
        const zHalfSpan = Math.min(a.size[1], b.size[1]) / 2;
        // Closed segment on the rear half of the room — passage on the front half
        lines.push({ x: dividerX, zRange: [zMid - zHalfSpan, zMid - 0.1] });
      }
    }
    return lines;
  }, [typology]);

  const theme = typology.theme;
  return (
    <group>
      {/* Floor — material depends on theme.floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          map={theme.floor === "marble" ? (marble as unknown as undefined) : undefined}
          color={theme.floorColor}
          roughness={theme.floor === "concrete" ? 0.7 : theme.floor === "parquet" ? 0.55 : 0.25}
          metalness={theme.floor === "marble" ? 0.05 : 0}
        />
      </mesh>

      {/* Ceiling — hidden in 3D doll-house view */}
      {showCeiling && (
        <mesh position={[0, WALL_HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, depth]} />
          <meshStandardMaterial color={theme.ceiling} roughness={0.95} />
        </mesh>
      )}

      {/* Outer walls */}
      <Wall position={[0, WALL_HEIGHT / 2, -halfD]} size={[width, WALL_HEIGHT, WALL_THICKNESS]} color={theme.wallExterior} />
      <Wall position={[0, WALL_HEIGHT / 2, halfD]} size={[width, WALL_HEIGHT, WALL_THICKNESS]} color={theme.wallExterior} />
      <Wall position={[-halfW, WALL_HEIGHT / 2, 0]} size={[WALL_THICKNESS, WALL_HEIGHT, depth]} color={theme.wallExterior} />
      <Wall position={[halfW, WALL_HEIGHT / 2, 0]} size={[WALL_THICKNESS, WALL_HEIGHT, depth]} color={theme.wallExterior} />

      {/* Windows on the rear wall — style depends on theme.window */}
      {typology.rooms
        .filter((r) => r.kind !== "terrace")
        .map((r, i) => (
          <WindowFrame
            key={`win-${i}`}
            position={[r.center[0], 1.5, -halfD + 0.01]}
            width={Math.min(r.size[0] * 0.4, 2.4)}
            height={1.4}
            style={theme.window}
          />
        ))}

      {/* Interior dividers between rooms on the same Z band */}
      {dividers.map((d, i) => {
        const zLength = d.zRange[1] - d.zRange[0];
        const zMid = (d.zRange[0] + d.zRange[1]) / 2;
        return (
          <Wall
            key={`div-${i}`}
            position={[d.x, WALL_HEIGHT / 2, zMid]}
            size={[WALL_THICKNESS, WALL_HEIGHT, Math.max(0.1, zLength)]}
            color={theme.wallInterior}
          />
        );
      })}

      {/* Per-room furniture */}
      {typology.rooms.map((room) => (
        <group key={`f-${room.kind}-${room.center.join(",")}`}>{renderFurniture(room, { marble, zellige }, theme)}</group>
      ))}

      {/* Clickable floors — bird-eye teleport */}
      {clickableFloors &&
        typology.rooms.map((room) => (
          <ClickableRoomFloor
            key={`cf-${room.kind}-${room.center.join(",")}`}
            position={[room.center[0], 0.02, room.center[1]]}
            size={[room.size[0] - 0.3, room.size[1] - 0.3]}
            roomKind={room.kind}
            teleportable
          />
        ))}
    </group>
  );
}

export default ApartmentModel;
