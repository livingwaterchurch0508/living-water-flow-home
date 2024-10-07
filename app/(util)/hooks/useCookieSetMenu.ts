import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useSearchStore } from "@/app/(store)/search-store";
import { useMenuStore } from "@/app/(store)/menu-store";
import { useCookieStore } from "@/app/(store)/cookie-store";
import { getMenuCookie } from "@/app/(util)/fetch/apis";
import { searchPath } from "@/app/(util)/search/search-util";

export const useCookieSetMenu = () => {
  const pathname = usePathname();
  const { initialize, setInitialize } = useCookieStore((state) => state);
  const { setMenuDetailTab } = useMenuStore((state) => state);
  const { setSearch } = useSearchStore((state) => state);

  useEffect(() => {
    if (initialize) return;

    getMenuCookie().then((data) => {
      if (!data) return;

      setSearch("");
      setMenuDetailTab({
        menuTab: searchPath(pathname),
        detailTab: data["detailTab"],
      });
      setInitialize(true);
    });
  }, []);
};
