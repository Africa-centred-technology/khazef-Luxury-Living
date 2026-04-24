/**
 * Central asset module for panorama sources and environment maps.
 *
 * Placeholder strategy
 * --------------------
 * We do NOT yet have real equirectangular (2:1, 360deg x 180deg) photographs.
 * As a temporary measure, we re-export the flat interior images from
 * `@/assets/interior-*.jpg`. photo-sphere-viewer will stretch those across
 * a 2:1 sphere and the result will look wrong, but it lets us wire the UI
 * end-to-end without blocking on a photo shoot.
 *
 * Swapping to real panoramas
 * --------------------------
 * 1. Drop 6K equirectangular JPEGs into `public/panoramas/`:
 *      - living-6k.jpg
 *      - kitchen-6k.jpg
 *      - bedroom-6k.jpg
 *    See `public/panoramas/README.md` for spec.
 * 2. Flip `USE_REAL_PANORAMAS` below from `false` to `true`.
 * 3. Optionally drop a real `.hdr` at `public/hdri/apartment-interior.hdr`
 *    (see `public/hdri/README.md`).
 *
 * No other code change should be necessary — consumers call `getPanorama()`.
 */

import livingFlat from "@/assets/interior-living.jpg";
import kitchenFlat from "@/assets/interior-kitchen.jpg";
import bedroomFlat from "@/assets/interior-bedroom.jpg";
import type { RoomId } from "./tour-data";

export type { RoomId } from "./tour-data";

/**
 * Flip this to `true` once the three equirectangular panoramas have been
 * uploaded to `public/panoramas/`. Until then, flat interior photos are
 * served as a low-fidelity placeholder.
 */
export const USE_REAL_PANORAMAS = false;

const REAL_PANORAMAS: Record<RoomId, string> = {
  living: "/panoramas/living-6k.jpg",
  kitchen: "/panoramas/kitchen-6k.jpg",
  bedroom: "/panoramas/bedroom-6k.jpg",
};

const FLAT_PLACEHOLDERS: Record<RoomId, string> = {
  living: livingFlat,
  kitchen: kitchenFlat,
  bedroom: bedroomFlat,
};

/**
 * Resolved panorama URLs, keyed by room id. Safe to pass directly to
 * photo-sphere-viewer as a `panorama` prop.
 */
export const PANORAMA_PLACEHOLDERS: Record<RoomId, string> = USE_REAL_PANORAMAS
  ? REAL_PANORAMAS
  : FLAT_PLACEHOLDERS;

/**
 * Path (relative to the site root) to the environment HDR used by the 3D
 * apartment scene. The file is expected to live at `public/hdri/`. If it is
 * missing, the 3D scene should fall back gracefully — do not hardcode an
 * external URL here.
 */
export const HDRI_URL: string = "/hdri/apartment-interior.hdr";

/**
 * Safe accessor for the current panorama URL for a given room.
 */
export function getPanorama(roomId: RoomId): string {
  return PANORAMA_PLACEHOLDERS[roomId];
}
