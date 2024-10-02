import { useMenuStore } from "@/app/(store)/menu-store";
import { useSearchStore } from "@/app/(store)/search-store";
import { setMenuCookie } from "@/app/(util)/fetch/apis";
import { IMoveTab } from "@/app/(variables)/interfaces";

export const useSelectMenu = () => {
  const { menuTab, detailTab, setMenuDetailTab } = useMenuStore(
    (state) => state,
  );
  const { setSearch } = useSearchStore((state) => state);

  const handleChange = async (detailTab: any) => {
    setSearch("");
    await setMenuCookie({ menuTab, detailTab });
    setMenuDetailTab({ menuTab, detailTab });
  };

  const handleMenuChange = async ({ menuTab, detailTab }: IMoveTab) => {
    setSearch("");
    await setMenuCookie({ menuTab, detailTab });
    setMenuDetailTab({ menuTab, detailTab });
  };

  return { handleChange, handleMenuChange, detailTab, menuTab };
};
