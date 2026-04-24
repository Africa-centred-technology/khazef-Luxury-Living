import { useMemo } from "react";

type BookPalette = "cream" | "indigo-gold";

interface BookStackProps {
  position: [number, number, number];
  count?: number;
  palette?: BookPalette;
}

const CREAM_PALETTE = ["#faf7f2", "#e8dfce", "#d9ccb5", "#c9b89a", "#efe4d0"];
const INDIGO_GOLD_PALETTE = ["#0e1f4d", "#1a3a8c", "#c9a961", "#8a6d2e", "#1f2f5a"];
const BOOK_HEIGHT = 0.055;
const BOOK_BASE_WIDTH = 0.28;
const BOOK_BASE_DEPTH = 0.2;

interface BookDesc {
  width: number;
  depth: number;
  y: number;
  rotationY: number;
  color: string;
}

function buildBooks(count: number, palette: BookPalette): BookDesc[] {
  const colors = palette === "cream" ? CREAM_PALETTE : INDIGO_GOLD_PALETTE;
  return Array.from({ length: count }, (_, index) => ({
    width: BOOK_BASE_WIDTH + (index % 2 === 0 ? 0.02 : -0.015),
    depth: BOOK_BASE_DEPTH + (index % 3 === 0 ? 0.015 : -0.01),
    y: BOOK_HEIGHT / 2 + index * BOOK_HEIGHT,
    rotationY: (index % 2 === 0 ? 1 : -1) * 0.04 * index,
    color: colors[index % colors.length],
  }));
}

export function BookStack({ position, count = 4, palette = "cream" }: BookStackProps) {
  const safeCount = Math.min(Math.max(count, 1), 6);
  const books = useMemo(() => buildBooks(safeCount, palette), [safeCount, palette]);
  const topY = safeCount * BOOK_HEIGHT;

  return (
    <group position={position}>
      {books.map((book, index) => (
        <mesh
          key={index}
          position={[0, book.y, 0]}
          rotation={[0, book.rotationY, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[book.width, BOOK_HEIGHT, book.depth]} />
          <meshStandardMaterial color={book.color} roughness={0.75} />
        </mesh>
      ))}
      <mesh position={[0.06, topY + 0.012, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.024, 16]} />
        <meshStandardMaterial color="#c9a961" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}
