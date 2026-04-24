import { useState } from "react";
import type { Material } from "three";
import { DoubleSide } from "three";
import type { RoomId } from "../data/tour-data";

export interface RoomVolumeProps {
  position: [number, number, number];
  size: [number, number, number];
  label: string;
  roomId: RoomId;
  material: Material;
  onSelect: (roomId: RoomId) => void;
}

const GOLD_HEX = "#c9a961";

/**
 * Low-poly room volume.
 * Combines a user-provided material (walls/skin) with hover feedback through
 * a gold emissive tint rendered as an overlay box, so we never mutate the
 * incoming material instance.
 */
export function RoomVolume({
  position,
  size,
  label,
  roomId,
  material,
  onSelect,
}: RoomVolumeProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  const [width, height, depth] = size;

  const handlePointerOver = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setHovered(true);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "";
    }
  };

  const handleClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onSelect(roomId);
  };

  return (
    <group
      position={position}
      name={`room-${roomId}`}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Primary skin — walls/floor material provided by parent */}
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Gold hover overlay — slightly inflated, transparent when idle */}
      <mesh position={[0, height / 2, 0]} visible={hovered}>
        <boxGeometry args={[width + 0.06, height + 0.06, depth + 0.06]} />
        <meshStandardMaterial
          color={GOLD_HEX}
          emissive={GOLD_HEX}
          emissiveIntensity={0.6}
          transparent
          opacity={0.18}
          side={DoubleSide}
        />
      </mesh>

      {/* Invisible label anchor — kept in the scene graph for future Html/Text use */}
      <group position={[0, height + 0.2, 0]} name={`label-${roomId}`} userData={{ label }} />
    </group>
  );
}

export default RoomVolume;
