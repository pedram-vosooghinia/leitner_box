"use strict";
import { create } from "zustand";
import Cookies from "js-cookie";
import { User } from "@/types/user";

interface IuseUserStore {
  user: User | null;
  addToUser: (newUser: User) => void;
  clearUser: () => void;
}
const useUserStore = create<IuseUserStore>((set) => ({
  user: Cookies.get("user")
    ? JSON.parse(Cookies.get("user") as string)
    : null,

  addToUser: (newUser: User) => {
    Cookies.set("user", JSON.stringify(newUser), {
      sameSite: "Strict",
      secure: true,
    });
    set({ user: newUser });
  },

  clearUser: () => {
    set({ user: null });
    Cookies.remove("user");
  },
}));

export default useUserStore;
