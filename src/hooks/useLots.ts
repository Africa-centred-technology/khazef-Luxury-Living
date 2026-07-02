/**
 * Hook de chargement des lots avec polling (temps reel CDC §7.7).
 *
 * Rafraichit les statuts toutes les 20 s via TanStack Query. En cas d'echec
 * (API indisponible), on retombe sur les donnees statiques `LOTS` pour que
 * le site reste consultable (degradation gracieuse).
 */
import { useQuery } from "@tanstack/react-query";

import { fetchLots } from "@/lib/api";
import { LOTS, type Lot } from "@/data/lots";

const POLL_INTERVAL_MS = 20_000;

export interface UseLotsResult {
  lots: Lot[];
  isLoading: boolean;
  isError: boolean;
  /** true si on affiche le fallback statique faute d'API. */
  isFallback: boolean;
}

export function useLots(): UseLotsResult {
  const query = useQuery({
    queryKey: ["lots"],
    queryFn: fetchLots,
    refetchInterval: POLL_INTERVAL_MS,
    refetchOnWindowFocus: true,
    staleTime: 10_000,
    retry: 1,
  });

  const isFallback = query.isError;
  return {
    lots: query.data ?? LOTS,
    isLoading: query.isLoading,
    isError: query.isError,
    isFallback,
  };
}
