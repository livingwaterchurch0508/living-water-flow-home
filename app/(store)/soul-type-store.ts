import { create } from "zustand";
import { SOUL_TYPE } from "@/app/(variables)/enums";

interface SoulTypeState {
  soulType: SOUL_TYPE;
  setSoulType: (soulType: SOUL_TYPE) => void;
}

const useSoulTypeStore = create<SoulTypeState>((set) => ({
  soulType: SOUL_TYPE.ALL,
  setSoulType: (soulType) => set({ soulType }),
}));

export { useSoulTypeStore };
