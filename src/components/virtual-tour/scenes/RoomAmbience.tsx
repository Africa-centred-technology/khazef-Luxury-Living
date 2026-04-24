import { useEffect, useMemo, useRef, useState } from "react";
import { PositionalAudio as DreiPositionalAudio } from "@react-three/drei";
import type { PositionalAudio as ThreePositionalAudio } from "three";

import { TOUR_ROOMS, type RoomId } from "../data/tour-data";
import { useTourStore } from "../hooks/useTourStore";

interface AmbienceSource {
  room: RoomId;
  url: string;
  volume: number;
}

const AMBIENCE_SOURCES: ReadonlyArray<AmbienceSource> = [
  { room: "living", url: "/audio/ambience-fireplace.mp3", volume: 0.6 },
  { room: "kitchen", url: "/audio/ambience-water.mp3", volume: 0.55 },
  { room: "bedroom", url: "/audio/ambience-breeze.mp3", volume: 0.5 },
];

/** Head-based distance scaling used by Three's PannerNode. */
const REF_DISTANCE = 2;
const ROLLOFF_FACTOR = 1.6;
const MAX_DISTANCE = 14;

interface AmbienceAudioNodeProps {
  source: AmbienceSource;
  active: boolean;
}

/**
 * Loads a single ambience clip through drei's <PositionalAudio>.
 * If the URL 404s or the decoder fails, we silently bail — the tour
 * must never break because an audio asset is missing.
 */
function AmbienceAudioNode({ source, active }: AmbienceAudioNodeProps) {
  const room = TOUR_ROOMS[source.room];
  const audioRef = useRef<ThreePositionalAudio | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);

  // Probe the URL once. In dev, warn if missing; never throw to the user.
  useEffect(() => {
    let cancelled = false;
    fetch(source.url, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        setAvailable(res.ok);
        if (!res.ok && import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn(
            `[RoomAmbience] Missing audio file: ${source.url} (HTTP ${res.status})`,
          );
        }
      })
      .catch(() => {
        if (cancelled) return;
        setAvailable(false);
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn(
            `[RoomAmbience] Could not fetch audio file: ${source.url}`,
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, [source.url]);

  // Respond to the active / audioEnabled state by muting/unmuting,
  // without tearing the audio graph down (cheaper than remount).
  useEffect(() => {
    const node = audioRef.current;
    if (!node) return;
    try {
      node.setRefDistance(REF_DISTANCE);
      node.setRolloffFactor(ROLLOFF_FACTOR);
      node.setMaxDistance(MAX_DISTANCE);
      node.setVolume(active ? source.volume : 0);
    } catch {
      // Audio context might not be ready yet — ignore.
    }
  }, [active, source.volume]);

  if (available === false) return null;

  return (
    <group position={room.cameraPosition}>
      <DreiPositionalAudio
        ref={audioRef}
        url={source.url}
        loop
        distance={REF_DISTANCE}
        autoplay
      />
    </group>
  );
}

/**
 * Per-room ambient positional audio layer.
 *
 * - Reads `currentRoom` + `audioEnabled` from the shared tour store.
 * - Mounts nothing at all when audio is disabled, to avoid spinning up
 *   AudioContexts before the user has granted a clear opt-in (matches
 *   browser autoplay policies).
 * - Each ambience clip is positional: you hear it louder near its source
 *   and quieter far away.
 * - Only the clip matching `currentRoom` is audible; others are muted
 *   so transitions feel natural without killing the audio graph.
 */
export function RoomAmbience() {
  const currentRoom = useTourStore((s) => s.currentRoom);
  const audioEnabled = useTourStore((s) => s.audioEnabled);

  const sources = useMemo(() => AMBIENCE_SOURCES, []);

  if (!audioEnabled) return null;

  return (
    <group>
      {sources.map((src) => (
        <AmbienceAudioNode
          key={src.room}
          source={src}
          active={audioEnabled && src.room === currentRoom}
        />
      ))}
    </group>
  );
}

export default RoomAmbience;
