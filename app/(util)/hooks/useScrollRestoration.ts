import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const useScrollRestoration = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isWeb =
      typeof window !== "undefined" && typeof window.navigator !== "undefined";

    const saveScrollPosition = () => {
      if (!isWeb) {
        sessionStorage.setItem(
          "scrollPosition",
          JSON.stringify({ x: window.scrollX, y: window.scrollY }),
        );
      }
    };

    const restoreScrollPosition = () => {
      if (!isWeb) {
        const scrollPosition = JSON.parse(
          sessionStorage.getItem("scrollPosition") || "null",
        );
        if (scrollPosition) {
          window.scrollTo(scrollPosition.x, scrollPosition.y);
          sessionStorage.removeItem("scrollPosition");
        }
      }
    };

    window.addEventListener("beforeunload", saveScrollPosition);
    window.addEventListener("popstate", restoreScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.removeEventListener("popstate", restoreScrollPosition);
    };
  }, [pathname, searchParams, router]);
};
