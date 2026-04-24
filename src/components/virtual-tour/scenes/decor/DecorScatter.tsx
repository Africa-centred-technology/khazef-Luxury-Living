import { BookStack } from "./BookStack";
import { Curtains } from "./Curtains";
import { FloorLamp } from "./FloorLamp";
import { PottedPlant } from "./PottedPlant";
import { Vase } from "./Vase";
import { WallArt } from "./WallArt";

type ScatterVariant = "living" | "kitchen" | "bedroom";

interface DecorScatterProps {
  center: [number, number];
  variant: ScatterVariant;
}

const COFFEE_TABLE_HEIGHT = 0.38;
const SIDEBOARD_HEIGHT = 0.86;
const BED_ART_HEIGHT = 1.9;
const WALL_ART_HEIGHT = 1.75;

function LivingArrangement({ cx, cz }: { cx: number; cz: number }) {
  return (
    <group>
      <PottedPlant position={[cx - 2.4, 0, cz - 1.6]} variant="olive" />
      <WallArt
        position={[cx, WALL_ART_HEIGHT, cz - 2.35]}
        rotation={[0, 0, 0]}
        size={[1.4, 0.95]}
        tone="indigo"
      />
      <FloorLamp position={[cx + 2.2, 0, cz - 1.5]} />
      <BookStack position={[cx + 0.2, COFFEE_TABLE_HEIGHT, cz + 0.1]} count={4} palette="indigo-gold" />
      <Vase position={[cx - 0.25, COFFEE_TABLE_HEIGHT, cz - 0.05]} tone="brass" />
    </group>
  );
}

function KitchenArrangement({ cx, cz }: { cx: number; cz: number }) {
  return (
    <group>
      <PottedPlant position={[cx + 2.1, 0, cz - 1.4]} variant="fig" />
      <Vase position={[cx - 0.5, SIDEBOARD_HEIGHT, cz - 0.3]} tone="ceramic" />
      <BookStack position={[cx + 0.4, SIDEBOARD_HEIGHT, cz - 0.2]} count={3} palette="cream" />
      <WallArt
        position={[cx, WALL_ART_HEIGHT, cz - 2.3]}
        size={[0.9, 0.7]}
        tone="ochre"
      />
    </group>
  );
}

function BedroomArrangement({ cx, cz }: { cx: number; cz: number }) {
  return (
    <group>
      <PottedPlant position={[cx - 2.2, 0, cz + 1.5]} variant="palm" />
      <WallArt
        position={[cx - 0.9, BED_ART_HEIGHT, cz - 2.3]}
        size={[0.75, 1.05]}
        tone="terracotta"
      />
      <WallArt
        position={[cx + 0.9, BED_ART_HEIGHT, cz - 2.3]}
        size={[0.75, 1.05]}
        tone="indigo"
      />
      <Curtains position={[cx + 2.3, 0, cz - 2.0]} width={2.1} height={2.3} color="#faf7f2" />
      <FloorLamp position={[cx - 1.8, 0, cz - 1.2]} />
      <BookStack position={[cx + 1.6, 0.55, cz + 1.2]} count={3} palette="cream" />
    </group>
  );
}

export function DecorScatter({ center, variant }: DecorScatterProps) {
  const [cx, cz] = center;

  if (variant === "living") {
    return <LivingArrangement cx={cx} cz={cz} />;
  }

  if (variant === "kitchen") {
    return <KitchenArrangement cx={cx} cz={cz} />;
  }

  return <BedroomArrangement cx={cx} cz={cz} />;
}
