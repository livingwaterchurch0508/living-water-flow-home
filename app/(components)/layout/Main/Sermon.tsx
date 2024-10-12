"use client";

import React from "react";
import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  HStack,
  Image,
  Skeleton,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import useAbortControllerSWR from "@/app/(util)/hooks/useAbortControllerSWR";
import { sermonsFetcher } from "@/app/(util)/fetch/apis";
import { ISermons } from "@/app/(util)/db/mysql/sermons";
import {
  API_PATHS,
  ROUTER_PATHS,
  YOUTUBE_URL,
} from "@/app/(variables)/constants";
import {
  API_ROUTES,
  LOCALE_TYPE,
  MENU_TAB,
  SERMON_TAB,
} from "@/app/(variables)/enums";
import { useSelectMenu } from "@/app/(util)/hooks/useSelectMenu";

export default function MainSermon() {
  const t = useTranslations("Main.Sermon");
  const locale = useLocale();
  const { colorMode } = useColorMode();
  const { handleMenuChange } = useSelectMenu();

  const { data: sermonsData, isLoading: sermonsIsLoading } =
    useAbortControllerSWR(
      `${API_PATHS[API_ROUTES.GET_SERMONS]}?page=1&limit=3`,
      sermonsFetcher,
    );

  const displaySermons = () => {
    if (sermonsData && sermonsData.payload) {
      const payload = sermonsData.payload as ISermons;
      if (Array.isArray(payload?.sermons)) {
        return payload.sermons.map((item, i) => (
          <GridItem key={i}>
            <Link
              href={`/${locale}${ROUTER_PATHS[MENU_TAB.SERMON]}/${item.id}?type=${item.type}`}
            >
              <VStack overflow="hidden">
                <AspectRatio ratio={4 / 3} style={{ scale: 1.2 }} w="100%">
                  <Image
                    src={`${YOUTUBE_URL.THUMB_NAIL}${item.url}/0.jpg`}
                    objectFit="cover"
                    alt="youtube"
                  />
                </AspectRatio>
              </VStack>
              <Box alignItems="flex-start">
                <Text
                  mt={2}
                  fontSize={{ sm: "sm", md: "sm", base: "sm" }}
                  fontWeight="bold"
                  color={colorMode === "light" ? "midnightblue" : "white"}
                >
                  {locale === LOCALE_TYPE.KO ? item.name : item.nameEn}
                </Text>
                <Text fontSize={{ sm: "xs", md: "xs", base: "xs" }}>
                  {`${locale === LOCALE_TYPE.KO ? item.desc : item.descEn}`}
                </Text>
              </Box>
            </Link>
          </GridItem>
        ));
      }
    }

    return null;
  };

  return (
    <Box
      w="97vw"
      justifyContent="center"
      display="flex"
      py={10}
      bg={colorMode === "light" ? "#f9fafb" : "rgba(45, 55, 72, 0.3)"}
    >
      <VStack w="90%" maxW="900px">
        <VStack
          alignItems="flex-start"
          w="90%"
          position="relative"
          maxW="900px"
        >
          <HStack justifyContent="space-between" w="100%">
            <Text
              fontSize={{ sm: "xl", md: "xl", base: "xl" }}
              fontWeight="bold"
            >
              {t("title")}
            </Text>
            <Box
              onClick={() =>
                handleMenuChange({
                  menuTab: MENU_TAB.SERMON,
                  detailTab: SERMON_TAB.RHEMA,
                })
              }
            >
              <Link href={`/${locale}${ROUTER_PATHS[MENU_TAB.SERMON]}`}>
                <Text fontSize="sm">{t("more")}</Text>
              </Link>
            </Box>
          </HStack>

          <Grid templateColumns="repeat(3, 1fr)" gap="4px" w="100%">
            {sermonsIsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <GridItem key={i}>
                    <Skeleton height="200px" />
                  </GridItem>
                ))
              : displaySermons()}
          </Grid>
        </VStack>
      </VStack>
    </Box>
  );
}
