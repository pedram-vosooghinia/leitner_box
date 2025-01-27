import { create } from "zustand";

interface BoxState {
  boxId: number | null;
  setBoxId: (id: number) => void;
}

export const useBoxStore = create<BoxState>((set) => ({
  boxId: null,
  setBoxId: (id) => set({ boxId: id }),
}));
