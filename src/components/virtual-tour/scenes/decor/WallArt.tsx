type ArtTone = "indigo" | "ochre" | "terracotta";

interface WallArtProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number];
  tone?: ArtTone;
}

const FRAME_BRASS = "#c9a961";
const MAT_CREAM = "#faf7f2";

const TONE_MAP: Record<ArtTone, { base: string; accent: string }> = {
  indigo: { base: "#1a3a8c", accent: "#0e1f4d" },
  ochre: { base: "#c9a961", accent: "#8a6d2e" },
  terracotta: { base: "#b56a4a", accent: "#7a3f2a" },
};

const FRAME_DEPTH = 0.04;
const FRAME_THICKNESS = 0.05;

export function WallArt({
  position,
  rotation = [0, 0, 0],
  size,
  tone = "indigo",
}: WallArtProps) {
  const [width, height] = size;
  const palette = TONE_MAP[tone];
  const innerWidth = width - FRAME_THICKNESS * 2;
  const innerHeight = height - FRAME_THICKNESS * 2;

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, FRAME_DEPTH]} />
        <meshStandardMaterial color={FRAME_BRASS} roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0, FRAME_DEPTH / 2 + 0.002]} castShadow>
        <planeGeometry args={[innerWidth + 0.02, innerHeight + 0.02]} />
        <meshStandardMaterial color={MAT_CREAM} roughness={0.9} />
      </mesh>
      <mesh position={[0, innerHeight * 0.15, FRAME_DEPTH / 2 + 0.004]}>
        <planeGeometry args={[innerWidth, innerHeight * 0.6]} />
        <meshStandardMaterial color={palette.base} roughness={0.85} />
      </mesh>
      <mesh position={[0, -innerHeight * 0.28, FRAME_DEPTH / 2 + 0.005]}>
        <planeGeometry args={[innerWidth, innerHeight * 0.3]} />
        <meshStandardMaterial color={palette.accent} roughness={0.85} />
      </mesh>
      <mesh position={[0, innerHeight * 0.42, FRAME_DEPTH / 2 + 0.006]}>
        <planeGeometry args={[innerWidth * 0.22, innerHeight * 0.03]} />
        <meshStandardMaterial color={FRAME_BRASS} roughness={0.4} metalness={0.75} />
      </mesh>
    </group>
  );
}
