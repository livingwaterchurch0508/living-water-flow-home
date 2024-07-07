"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconButton, Image } from "@chakra-ui/react";

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
    // <Button onClick={changeLanguage} fontSize="xs" bg="transparent" w="40px">
    //   {isEnglish ? "KOR" : "ENG"}
    // </Button>
    <IconButton
      aria-label="Toggle color mode"
      icon={
        <Image
          alt="locale"
          src={isEnglish ? "/icon-ko.png" : "/icon-en.png"}
          w={isEnglish ? "18px" : "16px"}
        />
      }
      onClick={changeLanguage}
      bg="transparent"
    />
  );
}
