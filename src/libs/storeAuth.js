import { create } from "zustand";

const useCurrentUserStore = create((set) => ({
  currentUser: null,
  setUser: (user) => set({ currentUser: user }),
}));

export default useCurrentUserStore;
