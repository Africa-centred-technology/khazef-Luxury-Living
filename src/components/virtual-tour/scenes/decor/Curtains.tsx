interface CurtainsProps {
  position: [number, number, number];
  width: number;
  height: number;
  color?: string;
}

const DEFAULT_COLOR = "#faf7f2";
const ROD_COLOR = "#c9a961";
const PANEL_THICKNESS = 0.015;

interface PanelProps {
  offsetX: number;
  panelWidth: number;
  height: number;
  color: string;
  rotationY: number;
  zOffset: number;
}

function CurtainPanel({ offsetX, panelWidth, height, color, rotationY, zOffset }: PanelProps) {
  return (
    <mesh
      position={[offsetX, height / 2, zOffset]}
      rotation={[0, rotationY, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[panelWidth, height, PANEL_THICKNESS]} />
      <meshStandardMaterial
        color={color}
        roughness={0.95}
        metalness={0}
        transparent
        opacity={0.82}
      />
    </mesh>
  );
}

export function Curtains({ position, width, height, color = DEFAULT_COLOR }: CurtainsProps) {
  const panelWidth = width * 0.42;
  const rodY = height + 0.05;
  const innerEdge = width / 2 - panelWidth / 2;

  return (
    <group position={position}>
      <mesh position={[0, rodY, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, width + 0.3, 14]} />
        <meshStandardMaterial color={ROD_COLOR} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-width / 2 - 0.15, rodY, 0]} castShadow>
        <sphereGeometry args={[0.05, 16, 12]} />
        <meshStandardMaterial color={ROD_COLOR} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[width / 2 + 0.15, rodY, 0]} castShadow>
        <sphereGeometry args={[0.05, 16, 12]} />
        <meshStandardMaterial color={ROD_COLOR} roughness={0.3} metalness={0.8} />
      </mesh>
      <CurtainPanel offsetX={-innerEdge} panelWidth={panelWidth} height={height} color={color} rotationY={0.08} zOffset={0} />
      <CurtainPanel offsetX={-innerEdge - 0.05} panelWidth={panelWidth * 0.9} height={height} color={color} rotationY={-0.06} zOffset={0.03} />
      <CurtainPanel offsetX={innerEdge} panelWidth={panelWidth} height={height} color={color} rotationY={-0.08} zOffset={0} />
      <CurtainPanel offsetX={innerEdge + 0.05} panelWidth={panelWidth * 0.9} height={height} color={color} rotationY={0.06} zOffset={0.03} />
    </group>
  );
}
