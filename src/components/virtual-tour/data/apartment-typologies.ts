import type { Vec3 } from "./tour-data";

/**
 * Shared contract — agents 2, 3, 4 produce content against this interface.
 * Do not mutate the shape without coordinating cross-agent.
 */

export type TypologyId = "harbour-t2" | "atlantic-t3" | "penthouse-duplex";

export type RoomKind = "living" | "kitchen" | "bedroom" | "bedroom-2" | "dressing" | "bathroom" | "terrace";

export type WindowStyle = "rectangular" | "porthole" | "panoramic";
export type FloorFinish = "parquet" | "marble" | "concrete";
export type AccentStyle = "zellige" | "rope" | "none";

/**
 * Visual theme applied to a typology. Each typology gets its own palette
 * and material identity so that switching typologies produces a genuinely
 * different apartment, not just a resized one.
 */
export interface TypologyTheme {
  floor: FloorFinish;
  floorColor: string;
  wallInterior: string;
  wallExterior: string;
  ceiling: string;
  window: WindowStyle;
  accent: AccentStyle;
  sofa: string;
  sofaBack: string;
  bedHeadboard: string;
  bedThrow: string;
  kitchenBase: string;
  rugLiving: string;
  rugBedroom: string;
  rugKitchen: string;
}

export interface TypologyRoom {
  kind: RoomKind;
  name: string;
  arabic: string;
  surface: string;
  /** World position of the room center on the XZ plane (meters). */
  center: [number, number];
  /** Room footprint in meters (x, z). */
  size: [number, number];
  cameraPosition: Vec3;
  cameraLookAt: Vec3;
}

export interface ApartmentTypology {
  id: TypologyId;
  name: string;
  arabic: string;
  /** Total apartment surface (e.g. "78 m²"). */
  surface: string;
  /** Floor number and view (e.g. "5ᵉ étage · Vue mer"). */
  floor: string;
  /** One-sentence editorial tagline. */
  tagline: string;
  /** Poetic paragraph (2-3 sentences). */
  description: string;
  /** Apartment footprint (width × depth), meters. Used by the 3D model. */
  footprint: [number, number];
  /** Price range (optional, French formatting). */
  priceRange?: string;
  /** Bedrooms count badge. */
  bedrooms: number;
  rooms: TypologyRoom[];
  /** Visual theme applied by the 3D model when no `.glb` is provided. */
  theme: TypologyTheme;
  /**
   * Optional path to a `.glb` / `.gltf` model exported from the architect's
   * plans. When present, the 3D viewer loads this model INSTEAD of rendering
   * parametric primitives. Example: "/models/ciel-duplex.glb".
   */
  modelUrl?: string;
  /**
   * Optional path to the 2D architect floor plan image (PNG or WebP). When
   * present, a "Voir le plan" button appears in the typology fiche and opens
   * a lightbox.
   */
  blueprintUrl?: string;
  /** Short caption to annotate the blueprint in the lightbox. */
  blueprintCaption?: string;
}

/**
 * Default typology — kept in sync with TOUR_ROOMS for backward compat.
 * Agent 2 may extend this array with 2 more typologies.
 */
/** Maritime minimalist — whitewash walls, light oak parquet, navy accents. */
const THEME_HARBOUR: TypologyTheme = {
  floor: "parquet",
  floorColor: "#d6c4a6",
  wallInterior: "#f4efe6",
  wallExterior: "#e9e2d3",
  ceiling: "#faf7f2",
  window: "porthole",
  accent: "rope",
  sofa: "#2a3a5c",
  sofaBack: "#1a2a4c",
  bedHeadboard: "#c9bfae",
  bedThrow: "#2d4a9a",
  kitchenBase: "#2a3a5c",
  rugLiving: "#c9bfae",
  rugBedroom: "#e0d5bf",
  rugKitchen: "#a8b8c4",
};

/** Moroccan luxe — tadelakt walls, cream marble, cobalt zellige, indigo + gold. */
const THEME_ATLANTIC: TypologyTheme = {
  floor: "marble",
  floorColor: "#f2ede3",
  wallInterior: "#efe6d4",
  wallExterior: "#e8e0d2",
  ceiling: "#faf7f2",
  window: "rectangular",
  accent: "zellige",
  sofa: "#2d4a9a",
  sofaBack: "#1a3a8c",
  bedHeadboard: "#d9ccb5",
  bedThrow: "#c9a961",
  kitchenBase: "#0e1f4d",
  rugLiving: "#d9b873",
  rugBedroom: "#e8dcc0",
  rugKitchen: "#5c9ba3",
};

/** Panoramic contemporary — charcoal walls, polished concrete, floor-to-ceiling glass. */
const THEME_CIEL: TypologyTheme = {
  floor: "concrete",
  floorColor: "#b8b2a6",
  wallInterior: "#2a2e3a",
  wallExterior: "#1a1d28",
  ceiling: "#22262f",
  window: "panoramic",
  accent: "none",
  sofa: "#4a4a4a",
  sofaBack: "#2a2a2a",
  bedHeadboard: "#3a3a3a",
  bedThrow: "#c9a961",
  kitchenBase: "#222530",
  rugLiving: "#5a5a5a",
  rugBedroom: "#4a4a4a",
  rugKitchen: "#6a6a6a",
};

export const TYPOLOGIES: ApartmentTypology[] = [
  {
    id: "harbour-t2",
    name: "Port",
    arabic: "الميناء",
    surface: "65 m²",
    floor: "2ᵉ étage · Vue port",
    tagline: "Un refuge compact, tourné vers les barques de Safi.",
    description:
      "Le séjour et la cuisine partagent une seule lumière, celle qui rebondit sur le môle. La chambre se love à l'arrière, tadelakt sable et linge écru. À taille d'artisan, à hauteur de port.",
    footprint: [10, 5],
    priceRange: "à partir de 1 250 000 MAD",
    bedrooms: 1,
    theme: THEME_HARBOUR,
    rooms: [
      {
        kind: "bedroom",
        name: "Chambre",
        arabic: "غرفة النوم",
        surface: "14 m²",
        center: [-3, 0],
        size: [3.8, 4],
        cameraPosition: [-3, 1.6, 0.5],
        cameraLookAt: [-3, 1.6, -2],
      },
      {
        kind: "living",
        name: "Séjour ouvert",
        arabic: "صالون",
        surface: "26 m²",
        center: [0, 0],
        size: [3.8, 4],
        cameraPosition: [0, 1.6, 0.5],
        cameraLookAt: [0, 1.6, -2],
      },
      {
        kind: "kitchen",
        name: "Cuisine en prolongement",
        arabic: "مطبخ",
        surface: "12 m²",
        center: [3, 0],
        size: [3.8, 4],
        cameraPosition: [3, 1.6, 0.5],
        cameraLookAt: [3, 1.6, -2],
      },
    ],
  },
  {
    id: "atlantic-t3",
    name: "Atlantique",
    arabic: "الأطلسي",
    surface: "92 m²",
    floor: "4ᵉ étage · Vue Atlantique",
    tagline: "Traversant, double orientation mer et jardin.",
    description:
      "Le salon cathédrale ouvre sur l'océan, la cuisine sur le jardin clos. La suite parentale s'habille de zellige cobalt et de tadelakt chaud.",
    footprint: [14, 5],
    priceRange: "à partir de 1 850 000 MAD",
    bedrooms: 2,
    theme: THEME_ATLANTIC,
    rooms: [
      {
        kind: "bedroom",
        name: "Suite parentale",
        arabic: "غرفة النوم",
        surface: "24 m²",
        center: [-5, 0],
        size: [4.8, 4.7],
        cameraPosition: [-5, 1.6, 0.5],
        cameraLookAt: [-5, 1.6, -2],
      },
      {
        kind: "living",
        name: "Salon traversant",
        arabic: "صالون",
        surface: "38 m²",
        center: [0, 0],
        size: [4.8, 4.7],
        cameraPosition: [0, 1.6, 0],
        cameraLookAt: [0, 1.6, -3],
      },
      {
        kind: "kitchen",
        name: "Cuisine & îlot",
        arabic: "مطبخ",
        surface: "18 m²",
        center: [5, 0],
        size: [4.8, 4.7],
        cameraPosition: [5, 1.6, 0.5],
        cameraLookAt: [5, 1.6, -2],
      },
    ],
  },
  {
    id: "penthouse-duplex",
    name: "Ciel",
    arabic: "السماء",
    surface: "140 m²",
    floor: "6ᵉ étage · Terrasse panoramique",
    tagline: "Le dernier étage, taillé pour le ciel de Safi.",
    description:
      "Un duplex où le salon monte vers la lumière et la terrasse tient l'Atlantique dans sa paume. Trois chambres, un dressing ombré, et cette vue qui porte de la médina au large. L'art de vivre marocain, posé à six étages du sol.",
    footprint: [18, 6],
    priceRange: "à partir de 3 400 000 MAD",
    bedrooms: 3,
    theme: THEME_CIEL,
    rooms: [
      {
        kind: "bedroom",
        name: "Suite parentale",
        arabic: "غرفة النوم",
        surface: "22 m²",
        center: [-7, -0.8],
        size: [4, 3.8],
        cameraPosition: [-7, 1.6, -0.3],
        cameraLookAt: [-7, 1.6, -2.8],
      },
      {
        kind: "bedroom-2",
        name: "Chambre enfant",
        arabic: "غرفة الطفل",
        surface: "16 m²",
        center: [-7, 1.6],
        size: [4, 2.4],
        cameraPosition: [-7, 1.6, 2.1],
        cameraLookAt: [-7, 1.6, -0.4],
      },
      {
        kind: "dressing",
        name: "Dressing",
        arabic: "خزانة",
        surface: "8 m²",
        center: [-3.5, 1.6],
        size: [3, 2.4],
        cameraPosition: [-3.5, 1.6, 2.1],
        cameraLookAt: [-3.5, 1.6, -0.4],
      },
      {
        kind: "living",
        name: "Salon cathédrale",
        arabic: "صالون",
        surface: "42 m²",
        center: [-1, -0.8],
        size: [5, 3.8],
        cameraPosition: [-1, 1.6, -0.3],
        cameraLookAt: [-1, 1.6, -2.8],
      },
      {
        kind: "kitchen",
        name: "Cuisine ouverte",
        arabic: "مطبخ",
        surface: "18 m²",
        center: [3.5, 0],
        size: [4, 4.8],
        cameraPosition: [3.5, 1.6, 0.5],
        cameraLookAt: [3.5, 1.6, -2],
      },
      {
        kind: "terrace",
        name: "Terrasse panoramique",
        arabic: "شرفة",
        surface: "34 m²",
        center: [7.5, 0],
        size: [3, 5],
        cameraPosition: [6, 1.6, 0.5],
        cameraLookAt: [10, 1.6, 0.5],
      },
    ],
  },
];

export function getTypologyById(id: TypologyId): ApartmentTypology | undefined {
  return TYPOLOGIES.find((t) => t.id === id);
}
