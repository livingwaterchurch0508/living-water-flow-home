import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useMenuStore } from "@/app/(store)/menu-store";
import { useSearchStore } from "@/app/(store)/search-store";
import { getMenuCookie, setMenuCookie } from "@/app/(util)/fetch/apis";
import { IMoveTab } from "@/app/(variables)/interfaces";
import { searchPath } from "@/app/(util)/search/search-util";

export const useSelectMenu = () => {
  const pathname = usePathname();
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
    getMenuCookie().then((data) => {
      if (searchPath(pathname) !== data["menuTab"]) {
        setMenuDetailTab({
          menuTab: searchPath(pathname),
          detailTab: data["detailTab"],
        });
        return;
      }

      if (detailTab !== data["detailTab"]) {
        setMenuDetailTab({
          menuTab: searchPath(pathname),
          detailTab,
        });
      }
    });
  }, []);

  return { handleChange, handleMenuChange, detailTab, menuTab };
};
