"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useDisclosure } from "@chakra-ui/hooks";

import DetailModal from "@/app/(components)/display/DetailModal";
import useAbortableSWR from "@/app/(util)/hooks/useAbortableSWR";
import { sermonsFetcher } from "@/app/(util)/fetch/apis";
import { ISermons } from "@/app/(util)/db/lib/sermons";
import {
  API_PATHS,
  ROUTER_PATHS,
  SOUL_CATEGORY,
} from "@/app/(variables)/constants";
import {
  API_ROUTES,
  LOCALE_TYPE,
  MENU_TAB,
  SERMON_TAB,
  SOUL_TYPE,
} from "@/app/(variables)/enums";
import { ISermon } from "@/app/(variables)/interfaces";
import { useSelectMenu } from "@/app/(util)/hooks/useSelectMenu";

export default function MainSpirit() {
  const t = useTranslations("Main.Spirit");
  const menuT = useTranslations("Menu.Sermon");
  const locale = useLocale();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sermon, setSermon] = useState<ISermon>();
  const { handleMenuChange } = useSelectMenu();

  const { data: sermonsData, isLoading: sermonsIsLoading } = useAbortableSWR(
    `${API_PATHS[API_ROUTES.GET_SERMONS]}?page=1&limit=4&type=1`,
    sermonsFetcher,
  );

  const DetailOpen = (sermon: ISermon) => {
    setSermon(sermon);
    onOpen();
  };

  const displaySpirits = () => {
    if (sermonsData && sermonsData.payload) {
      const payload = sermonsData.payload as ISermons;
      if (Array.isArray(payload?.sermons)) {
        return payload.sermons.map(({ viewCount, name, nameEn }, i) => (
          <Card
            key={`spirit-card-${i}`}
            display="inline-block"
            w="100%"
            border="none"
            bg={colorMode === "light" ? "#F9FAFB" : "#2D3748"}
            cursor="pointer"
            onClick={() => DetailOpen(payload.sermons[i])}
          >
            <CardBody>
              <VStack alignItems="flex-start">
                <Text
                  fontSize={{ sm: "xs", md: "2xs", base: "xs" }}
                  color={colorMode === "light" ? "midnightblue" : "white"}
                >
                  {(viewCount === SOUL_TYPE.MISSION ||
                    viewCount === SOUL_TYPE.INTRODUCE ||
                    viewCount === SOUL_TYPE.SPIRIT) &&
                    menuT(SOUL_CATEGORY[viewCount])}
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "sm", base: "sm" }}
                  fontWeight="bold"
                  color={colorMode === "light" ? "black" : "white"}
                  whiteSpace="pre-wrap"
                >
                  {locale === LOCALE_TYPE.KO ? name : nameEn}
                </Text>
              </VStack>
            </CardBody>
          </Card>
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
          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            mb={2}
          >
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
                  detailTab: SERMON_TAB.SOUL,
                })
              }
            >
              <Link href={`/${locale}${ROUTER_PATHS[MENU_TAB.SERMON]}`}>
                <Text fontSize="sm">{t("more")}</Text>
              </Link>
            </Box>
          </HStack>

          <Grid templateColumns="1fr 1fr" gap={2} w="100%">
            {sermonsIsLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <GridItem key={i}>
                    <Skeleton height="120px" />
                  </GridItem>
                ))
              : displaySpirits()}
          </Grid>
          {isOpen && (
            <DetailModal
              name={
                "" || locale === LOCALE_TYPE.KO
                  ? sermon?.name!
                  : sermon?.nameEn!
              }
              desc={
                "" || locale === LOCALE_TYPE.KO
                  ? sermon?.desc!
                  : sermon?.descEn!
              }
              isOpen={isOpen}
              onClose={onClose}
            />
          )}
        </VStack>
      </VStack>
    </Box>
  );
}
