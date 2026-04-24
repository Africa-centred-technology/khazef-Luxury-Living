type VaseTone = "cobalt" | "brass" | "ceramic";

interface VaseProps {
  position: [number, number, number];
  tone?: VaseTone;
}

interface ToneSpec {
  color: string;
  roughness: number;
  metalness: number;
}

const TONE_MAP: Record<VaseTone, ToneSpec> = {
  cobalt: { color: "#1a3a8c", roughness: 0.35, metalness: 0.15 },
  brass: { color: "#c9a961", roughness: 0.32, metalness: 0.75 },
  ceramic: { color: "#d9ccb5", roughness: 0.85, metalness: 0.04 },
};

const STEM_COLOR = "#6b5338";
const LEAF_COLOR = "#5a7a4a";

export function Vase({ position, tone = "cobalt" }: VaseProps) {
  const spec = TONE_MAP[tone];

  return (
    <group position={position}>
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.08, 24]} />
        <meshStandardMaterial color={spec.color} roughness={spec.roughness} metalness={spec.metalness} />
      </mesh>
      <mesh position={[0, 0.23, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.12, 0.3, 24]} />
        <meshStandardMaterial color={spec.color} roughness={spec.roughness} metalness={spec.metalness} />
      </mesh>
      <mesh position={[0, 0.48, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.16, 0.2, 24]} />
        <meshStandardMaterial color={spec.color} roughness={spec.roughness} metalness={spec.metalness} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <torusGeometry args={[0.08, 0.01, 8, 20]} />
        <meshStandardMaterial color="#c9a961" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh position={[0.02, 1.05, 0.01]} rotation={[0, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.006, 0.008, 0.9, 8]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.9} />
      </mesh>
      <mesh position={[0.1, 1.2, 0.05]} rotation={[0, 0, 0.6]} castShadow>
        <sphereGeometry args={[0.06, 10, 8]} />
        <meshStandardMaterial color={LEAF_COLOR} roughness={0.85} />
      </mesh>
      <mesh position={[-0.07, 1.4, -0.04]} rotation={[0.3, 0, -0.4]} castShadow>
        <sphereGeometry args={[0.05, 10, 8]} />
        <meshStandardMaterial color={LEAF_COLOR} roughness={0.85} />
      </mesh>
      <mesh position={[0.04, 1.55, 0.02]} castShadow>
        <sphereGeometry args={[0.045, 10, 8]} />
        <meshStandardMaterial color={LEAF_COLOR} roughness={0.85} />
      </mesh>
    </group>
  );
}
