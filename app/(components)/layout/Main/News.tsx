"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";

import { API_PATHS, ROUTER_PATHS } from "@/app/(variables)/constants";
import {
  API_ROUTES,
  LOCALE_TYPE,
  MENU_TAB,
  NEWS_TAB,
} from "@/app/(variables)/enums";
import { communitiesFetcher } from "@/app/(util)/fetch/apis";
import { ICommunities } from "@/app/(util)/db/lib/communities";
import { formattedDate } from "@/app/(util)/format/date-formatter";
import useAbortableSWR from "@/app/(util)/hooks/useAbortableSWR";
import { useSelectMenu } from "@/app/(util)/hooks/useSelectMenu";

export default function MainNews() {
  const t = useTranslations("Main.News");
  const locale = useLocale();
  const { handleMenuChange } = useSelectMenu();

  const { data: communitiesData, isLoading: communitiesIsLoading } =
    useAbortableSWR(
      `${API_PATHS[API_ROUTES.GET_COMMUNITIES]}?page=1&limit=5`,
      communitiesFetcher,
    );

  const displayCommunities = () => {
    if (communitiesData && communitiesData.payload) {
      const payload = communitiesData.payload as ICommunities;
      if (Array.isArray(payload?.communities)) {
        return payload.communities.map((item, i) => (
          <GridItem key={i}>
            <HStack justifyContent="space-between">
              <Link
                href={`/${locale}${ROUTER_PATHS[MENU_TAB.NEWS]}/${item.id}?type=${item.type}`}
              >
                <Text
                  fontSize={{ sm: "sm", md: "sm", base: "sm" }}
                  cursor="pointer"
                >
                  {locale === LOCALE_TYPE.KO ? item.name : item.nameEn}
                </Text>
              </Link>
              <Text fontSize={{ sm: "sm", md: "sm", base: "sm" }}>
                {formattedDate(item.createdAt?.toString() || "")}
              </Text>
            </HStack>
          </GridItem>
        ));
      }
    }
    return null;
  };

  return (
    <VStack alignItems="flex-start" w="90%" position="relative">
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb={2}
      >
        <Text fontSize={{ sm: "xl", md: "xl", base: "xl" }} fontWeight="bold">
          {t("title")}
        </Text>
        <Box
          onClick={() =>
            handleMenuChange({
              menuTab: MENU_TAB.NEWS,
              detailTab: NEWS_TAB.NEWS,
            })
          }
        >
          <Link href={`/${locale}${ROUTER_PATHS[MENU_TAB.NEWS]}`}>
            <Text fontSize="sm">{t("more")}</Text>
          </Link>
        </Box>
      </HStack>
      <Grid templateColumns="1fr" gap={2} w="100%">
        {communitiesIsLoading
          ? Array.from({ length: 1 }).map((_, i) => (
              <GridItem key={i}>
                <Skeleton height="200px" />
              </GridItem>
            ))
          : displayCommunities()}
      </Grid>
    </VStack>
  );
}
