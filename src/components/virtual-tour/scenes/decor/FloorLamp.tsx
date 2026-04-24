interface FloorLampProps {
  position: [number, number, number];
}

const BRASS = "#c9a961";
const SHADE_CREAM = "#faf7f2";
const SHADE_EMISSIVE = "#f5e3b8";
const BASE_INDIGO = "#0e1f4d";

const STEM_HEIGHT = 1.55;
const SHADE_HEIGHT = 0.35;
const SHADE_TOP_RADIUS = 0.12;
const SHADE_BOTTOM_RADIUS = 0.22;

export function FloorLamp({ position }: FloorLampProps) {
  const baseY = 0.03;
  const stemCenterY = baseY + STEM_HEIGHT / 2;
  const shadeCenterY = baseY + STEM_HEIGHT + SHADE_HEIGHT / 2;
  const lightY = shadeCenterY - SHADE_HEIGHT * 0.3;

  return (
    <group position={position}>
      <mesh position={[0, baseY, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
        <meshStandardMaterial color={BASE_INDIGO} roughness={0.55} metalness={0.35} />
      </mesh>
      <mesh position={[0, baseY + 0.04, 0]}>
        <torusGeometry args={[0.2, 0.012, 8, 28]} />
        <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, stemCenterY, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.022, STEM_HEIGHT, 14]} />
        <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, shadeCenterY, 0]} castShadow>
        <coneGeometry args={[SHADE_BOTTOM_RADIUS, SHADE_HEIGHT, 24, 1, true]} />
        <meshStandardMaterial
          color={SHADE_CREAM}
          emissive={SHADE_EMISSIVE}
          emissiveIntensity={0.6}
          roughness={0.85}
          side={2}
        />
      </mesh>
      <mesh position={[0, shadeCenterY + SHADE_HEIGHT / 2 - 0.005, 0]}>
        <ringGeometry args={[SHADE_TOP_RADIUS - 0.01, SHADE_TOP_RADIUS + 0.005, 24]} />
        <meshStandardMaterial color={BRASS} roughness={0.35} metalness={0.8} />
      </mesh>
      <pointLight
        position={[0, lightY, 0]}
        intensity={0.9}
        distance={3.5}
        decay={2}
        color="#ffd9a1"
        castShadow={false}
      />
    </group>
  );
}
