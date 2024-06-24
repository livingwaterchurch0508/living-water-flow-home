import { create } from "zustand";
import { IMoveTab } from "@/app/(variables)/interfaces";
import { INTRODUCE_TAB, MENU_TAB } from "@/app/(variables)/enums";

interface MenuState extends IMoveTab {
  setMenuDetailTab: (props: IMoveTab) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  menuTab: MENU_TAB.INTRODUCE,
  detailTab: INTRODUCE_TAB.PASTOR,
  setMenuDetailTab: ({ menuTab, detailTab }) => set({ menuTab, detailTab }),
}));

export { useMenuStore };
