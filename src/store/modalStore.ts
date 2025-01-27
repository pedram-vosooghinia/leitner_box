"use strict";

interface ModalState {
  isOpen: boolean;
  activeModal: string | null;
  openModal: (modalType: string) => void;
  closeModal: () => void;
}
import { create } from "zustand";
export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  activeModal: null,
  openModal: (modalType:string) => set({ isOpen: true, activeModal: modalType }),
  closeModal: () => set({ isOpen: false, activeModal: null }),
}));
