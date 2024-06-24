import { useEffect } from "react";

import { useMenuStore } from "@/app/(store)/menu-store";
import { useSearchStore } from "@/app/(store)/search-store";
import { getMenuCookie, setMenuCookie } from "@/app/(util)/fetch/apis";
import { MENU_TAB } from "@/app/(variables)/enums";

interface IUseSelectMenu {
  menuTab: MENU_TAB;
}

export const useSelectMenu = ({ menuTab }: IUseSelectMenu) => {
  const { detailTab, setMenuDetailTab } = useMenuStore((state) => state);
  const { setSearch } = useSearchStore((state) => state);

  const handleChange = async (detailTab: any) => {
    setSearch("");
    await setMenuCookie({ menuTab, detailTab });
    setMenuDetailTab({ menuTab, detailTab });
  };

  useEffect(() => {
    setSearch("");
    getMenuCookie().then((detailTab) =>
      setMenuDetailTab({ menuTab, detailTab }),
    );
  }, []);

  return { handleChange, detailTab };
};
