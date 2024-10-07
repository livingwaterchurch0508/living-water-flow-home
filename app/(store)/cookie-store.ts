import { create } from "zustand";

interface CookieStore {
  initialize: boolean;
  setInitialize: (initialize: boolean) => void;
}

const useCookieStore = create<CookieStore>((set) => ({
  initialize: false,
  setInitialize: (initialize) => set({ initialize }),
}));

export { useCookieStore };
