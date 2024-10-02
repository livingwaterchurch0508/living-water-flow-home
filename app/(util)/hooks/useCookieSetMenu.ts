import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useSearchStore } from "@/app/(store)/search-store";
import { useMenuStore } from "@/app/(store)/menu-store";
import { getMenuCookie } from "@/app/(util)/fetch/apis";
import { searchPath } from "@/app/(util)/search/search-util";

export const useCookieSetMenu = () => {
  const [hasRun, setHasRun] = useState(false);

  const pathname = usePathname();
  const { setMenuDetailTab } = useMenuStore((state) => state);
  const { setSearch } = useSearchStore((state) => state);

  useEffect(() => {
    if (hasRun) return;

    setSearch("");
    getMenuCookie().then((data) => {
      if (!data) return;

      setMenuDetailTab({
        menuTab: searchPath(pathname),
        detailTab: data["detailTab"],
      });
      setHasRun(true);
    });
  }, [hasRun, pathname, setSearch, setMenuDetailTab]);
};
