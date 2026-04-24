import { create } from "zustand";
import type { RoomId } from "../data/tour-data";
import type { TypologyId } from "../data/apartment-typologies";

export type TourMode = "panorama" | "3d";

interface TourState {
  currentRoom: RoomId;
  currentTypology: TypologyId;
  mode: TourMode;
  xrActive: boolean;
  audioEnabled: boolean;
  infoPanelId: string | null;
  setRoom: (room: RoomId) => void;
  setTypology: (id: TypologyId) => void;
  setMode: (mode: TourMode) => void;
  setXrActive: (active: boolean) => void;
  toggleAudio: () => void;
  openInfoPanel: (id: string) => void;
  closeInfoPanel: () => void;
}

export const useTourStore = create<TourState>((set) => ({
  currentRoom: "living",
  currentTypology: "atlantic-t3",
  mode: "panorama",
  xrActive: false,
  audioEnabled: false,
  infoPanelId: null,
  setRoom: (room) => set({ currentRoom: room }),
  setTypology: (id) => set({ currentTypology: id }),
  setMode: (mode) => set({ mode }),
  setXrActive: (active) => set({ xrActive: active }),
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
  openInfoPanel: (id) => set({ infoPanelId: id }),
  closeInfoPanel: () => set({ infoPanelId: null }),
}));
