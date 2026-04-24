import { useTourStore } from "./useTourStore";
import {
  TYPOLOGIES,
  getTypologyById,
  type ApartmentTypology,
} from "../data/apartment-typologies";

/**
 * Resolves the currently-selected typology from the tour store.
 * Falls back to the first typology when the id cannot be matched
 * (defensive — should not happen under normal use).
 */
export function useCurrentTypology(): ApartmentTypology {
  const currentTypology = useTourStore((s) => s.currentTypology);
  const resolved = getTypologyById(currentTypology);
  return resolved ?? TYPOLOGIES[0];
}

export default useCurrentTypology;
