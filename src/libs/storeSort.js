import { create } from "zustand";

const useSortStore = create((set) => ({
  input: {
    sort: "",
    order: "",
  },
  setInput: (input) => set((state) => ({ input: { ...state.input, ...input } })),
}));

export default useSortStore;
