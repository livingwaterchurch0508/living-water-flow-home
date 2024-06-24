"use client";

import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Skeleton,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa6";

import useAbortableSWR from "@/app/(util)/hooks/useAbortableSWR";
import { sermonsFetcher } from "@/app/(util)/fetch/apis";
import { ISermons } from "@/app/(util)/db/lib/sermons";
import { API_PATHS, YOUTUBE_URL } from "@/app/(variables)/constants";
import { API_ROUTES, LOCALE_TYPE } from "@/app/(variables)/enums";

export default function MainSermon() {
  const t = useTranslations("Main.Sermon");
  const locale = useLocale();
  const { colorMode } = useColorMode();

  const { data: sermonsData, isLoading: sermonsIsLoading } = useAbortableSWR(
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
              href={YOUTUBE_URL.VIEW + item.url}
              target="_blank"
              rel="noopener noreferrer"
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
    <VStack alignItems="flex-start" w="90%" position="relative">
      <HStack justifyContent="space-between" w="100%">
        <Text fontSize={{ sm: "xl", md: "xl", base: "xl" }} fontWeight="bold">
          {t("title")}
        </Text>
        <IconButton
          as="a"
          href={YOUTUBE_URL.CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="youtube"
          icon={<FaYoutube style={{ color: "red" }} />}
        />
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
  );
}
