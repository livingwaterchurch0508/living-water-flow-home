import { useEffect } from "react";

import { useMenuStore } from "@/app/(store)/menu-store";
import { useSearchStore } from "@/app/(store)/search-store";
import { getMenuCookie, setMenuCookie } from "@/app/(util)/fetch/apis";
import { IMoveTab } from "@/app/(variables)/interfaces";

export const useSelectMenu = () => {
  const { menuTab, detailTab, setMenuDetailTab } = useMenuStore(
    (state) => state,
  );
  const { setSearch } = useSearchStore((state) => state);

  const handleChange = async (detailTab: any) => {
    setSearch("");
    setMenuDetailTab({ menuTab, detailTab });
    await setMenuCookie({ menuTab, detailTab });
  };

  const handleMenuChange = async ({ menuTab, detailTab }: IMoveTab) => {
    setSearch("");
    setMenuDetailTab({ menuTab, detailTab });
    await setMenuCookie({ menuTab, detailTab });
  };

  useEffect(() => {
    setSearch("");
    getMenuCookie().then((cookieDetailTab) => {
      if (detailTab !== cookieDetailTab)
        setMenuDetailTab({ menuTab, detailTab });
    });
  }, []);

  return { handleChange, handleMenuChange, detailTab, menuTab };
};
