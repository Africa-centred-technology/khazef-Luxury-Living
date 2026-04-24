import { useCallback, useState } from "react";

interface CinematicIntroApi {
  isPlaying: boolean;
  play: () => void;
  skip: () => void;
}

/**
 * Minimal, isolated state hook for the cinematic intro. Kept local on
 * purpose — we do not want to pollute the main tour store with transient
 * per-render animation state.
 */
export function useCinematicIntro(): CinematicIntroApi {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => setIsPlaying(true), []);
  const skip = useCallback(() => setIsPlaying(false), []);

  return { isPlaying, play, skip };
}

export default useCinematicIntro;
