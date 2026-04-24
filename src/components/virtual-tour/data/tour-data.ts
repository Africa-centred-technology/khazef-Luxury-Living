/** Identifies a room in the active apartment typology. */
export type RoomId =
  | "living"
  | "kitchen"
  | "bedroom"
  | "bedroom-2"
  | "dressing"
  | "bathroom"
  | "terrace";

/** Eye-level camera waypoints (x, y, z) inside the 3D apartment, in metres. */
export type Vec3 = [number, number, number];

export interface TourHotspot {
  id: string;
  targetRoom: RoomId;
  yaw: number;
  pitch: number;
  label: string;
}

export interface MaterialHotspot {
  id: string;
  yaw: number;
  pitch: number;
  title: string;
  description: string;
  material: "tadelakt" | "marbre" | "zellige" | "bois" | "laiton";
}

export interface TourRoom {
  id: RoomId;
  name: string;
  arabic: string;
  description: string;
  surface: string;
  /** Eye-level camera position inside the 3D model (1.6 m height). */
  cameraPosition: Vec3;
  /** Where the camera initially looks at from its start position. */
  cameraLookAt: Vec3;
  mapPosition: { x: number; y: number };
  navHotspots: TourHotspot[];
  materialHotspots: MaterialHotspot[];
}

export const TOUR_ROOMS: Record<RoomId, TourRoom> = {
  living: {
    id: "living",
    name: "Salon traversant",
    arabic: "صالون",
    description: "Volume cathédrale, double orientation mer et jardin.",
    surface: "38 m²",
    cameraPosition: [0, 1.6, 0],
    cameraLookAt: [0, 1.6, -3],
    mapPosition: { x: 50, y: 55 },
    navHotspots: [
      { id: "to-kitchen", targetRoom: "kitchen", yaw: 90, pitch: 0, label: "Cuisine" },
      { id: "to-bedroom", targetRoom: "bedroom", yaw: -90, pitch: 0, label: "Suite parentale" },
    ],
    materialHotspots: [
      {
        id: "mat-tadelakt",
        yaw: 30,
        pitch: -5,
        title: "Tadelakt chaud",
        description: "Enduit marocain ciré à la pierre de Safi, ton ivoire rosé.",
        material: "tadelakt",
      },
    ],
  },
  kitchen: {
    id: "kitchen",
    name: "Cuisine & îlot",
    arabic: "مطبخ",
    description: "Îlot central en marbre veiné d'or, robinetterie laiton brossé.",
    surface: "18 m²",
    cameraPosition: [5, 1.6, 0.5],
    cameraLookAt: [5, 1.6, -2],
    mapPosition: { x: 80, y: 55 },
    navHotspots: [
      { id: "to-living-k", targetRoom: "living", yaw: -90, pitch: 0, label: "Salon" },
    ],
    materialHotspots: [
      {
        id: "mat-marbre",
        yaw: 0,
        pitch: -10,
        title: "Marbre veiné d'or",
        description: "Statuario poli, veinage doré rare.",
        material: "marbre",
      },
    ],
  },
  bedroom: {
    id: "bedroom",
    name: "Suite parentale",
    arabic: "غرفة النوم",
    description: "Dressing et salle de bain privée en marbre, vue jardin.",
    surface: "24 m²",
    cameraPosition: [-5, 1.6, 0.5],
    cameraLookAt: [-5, 1.6, -2],
    mapPosition: { x: 20, y: 55 },
    navHotspots: [
      { id: "to-living-b", targetRoom: "living", yaw: 90, pitch: 0, label: "Salon" },
    ],
    materialHotspots: [
      {
        id: "mat-zellige",
        yaw: 45,
        pitch: 0,
        title: "Zellige bleu cobalt",
        description: "Frise artisanale, hommage à la céramique de Safi.",
        material: "zellige",
      },
    ],
  },
};

export const ROOM_ORDER: RoomId[] = ["living", "kitchen", "bedroom"];
