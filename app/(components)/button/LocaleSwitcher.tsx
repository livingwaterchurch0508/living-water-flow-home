"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const isEnglish = pathname.startsWith("/en");

  const changeLanguage = () => {
    router.replace(
      pathname.replace(isEnglish ? "/en" : "/ko", isEnglish ? "/ko" : "/en"),
    );
  };

  return (
    <Button onClick={changeLanguage} fontSize="xs" bg="transparent">
      {isEnglish ? "KOR" : "ENG"}
    </Button>
  );
}
