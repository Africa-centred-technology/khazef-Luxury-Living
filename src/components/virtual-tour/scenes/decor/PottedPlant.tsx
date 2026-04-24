import { useMemo } from "react";

type PlantVariant = "olive" | "palm" | "fig";

interface PottedPlantProps {
  position: [number, number, number];
  variant?: PlantVariant;
}

const POT_TADELAKT = "#d9ccb5";
const POT_INDIGO = "#0e1f4d";
const FOLIAGE_DEEP = "#5a7a4a";
const FOLIAGE_LIGHT = "#6a8a5a";
const TRUNK = "#6b5338";

interface Cluster {
  position: [number, number, number];
  scale: number;
  color: string;
}

function buildFoliage(variant: PlantVariant): Cluster[] {
  if (variant === "palm") {
    return Array.from({ length: 7 }, (_, index) => {
      const angle = (index / 7) * Math.PI * 2;
      return {
        position: [Math.cos(angle) * 0.42, 1.45 + Math.sin(index) * 0.1, Math.sin(angle) * 0.42],
        scale: 0.55,
        color: index % 2 === 0 ? FOLIAGE_DEEP : FOLIAGE_LIGHT,
      };
    });
  }
  if (variant === "fig") {
    return [
      { position: [0, 1.15, 0], scale: 0.6, color: FOLIAGE_DEEP },
      { position: [0.18, 1.35, 0.12], scale: 0.45, color: FOLIAGE_LIGHT },
      { position: [-0.22, 1.3, -0.1], scale: 0.5, color: FOLIAGE_DEEP },
      { position: [0.05, 1.55, -0.18], scale: 0.4, color: FOLIAGE_LIGHT },
    ];
  }
  return [
    { position: [0, 1.2, 0], scale: 0.42, color: FOLIAGE_DEEP },
    { position: [0.22, 1.4, 0.1], scale: 0.34, color: FOLIAGE_LIGHT },
    { position: [-0.2, 1.35, -0.12], scale: 0.36, color: FOLIAGE_DEEP },
    { position: [0.08, 1.6, 0.05], scale: 0.3, color: FOLIAGE_LIGHT },
    { position: [-0.12, 1.55, 0.15], scale: 0.28, color: FOLIAGE_DEEP },
  ];
}

export function PottedPlant({ position, variant = "olive" }: PottedPlantProps) {
  const foliage = useMemo(() => buildFoliage(variant), [variant]);
  const potColor = variant === "palm" ? POT_INDIGO : POT_TADELAKT;

  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.26, 0.5, 24]} />
        <meshStandardMaterial color={potColor} roughness={0.9} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <torusGeometry args={[0.32, 0.015, 8, 24]} />
        <meshStandardMaterial color="#c9a961" roughness={0.35} metalness={0.75} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.7, 10]} />
        <meshStandardMaterial color={TRUNK} roughness={0.95} />
      </mesh>
      {foliage.map((cluster, index) => (
        <mesh key={index} position={cluster.position} castShadow>
          <sphereGeometry args={[cluster.scale, 14, 12]} />
          <meshStandardMaterial color={cluster.color} roughness={0.88} />
        </mesh>
      ))}
    </group>
  );
}
