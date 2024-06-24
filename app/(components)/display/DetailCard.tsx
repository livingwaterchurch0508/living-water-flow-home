import {
  Box,
  Button,
  HStack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import { MENU_TAB } from "@/app/(variables)/enums";
import { ROUTER_PATHS } from "@/app/(variables)/constants";

interface IDetailCard {
  children?: React.ReactNode;
  isPrev?: boolean;
  isNext?: boolean;
  findIdx: number;
  ids: { id: number | null }[];
  type: string;
  menuTab: MENU_TAB;
  title?: string | null;
}

export default function DetailCard({
  children,
  isNext,
  isPrev,
  menuTab,
  ids,
  findIdx,
  type,
  title = "",
}: IDetailCard) {
  const locale = useLocale();
  const { colorMode } = useColorMode();
  const t = useTranslations("Common");

  return (
    <Box>
      <VStack>
        <Text
          fontSize={{ sm: "lg", md: "lg", base: "lg" }}
          fontWeight="bold"
          color={colorMode === "light" ? "midnightblue" : "white"}
          p={4}
        >
          {title}
        </Text>
      </VStack>
      <Box overflow="auto" h="74vh">
        {children}
      </Box>
      <HStack my={2} justifyContent="space-between">
        <Button variant="outline" size="sm" colorScheme="black">
          <Link href={`/${locale}${ROUTER_PATHS[menuTab]}`}>
            <Text>{t("list")}</Text>
          </Link>
        </Button>
        <HStack gap={4}>
          {isPrev && (
            <Button variant="outline" size="sm" colorScheme="black">
              <Link
                href={`/${locale}${ROUTER_PATHS[menuTab]}/${ids[findIdx - 1].id}?type=${type}`}
              >
                <Text>{t("prev")}</Text>
              </Link>
            </Button>
          )}
          {isNext && (
            <Button variant="outline" size="sm" colorScheme="black">
              <Link
                href={`/${locale}${ROUTER_PATHS[menuTab]}/${ids[findIdx + 1].id}?type=${type}`}
              >
                <Text>{t("next")}</Text>
              </Link>
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}
