"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Text, VStack } from "@chakra-ui/react";

import Hymns from "@/app/(components)/layout/Hymns/Hymns";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";
import { HYMN_TAB } from "@/app/(variables)/enums";

export default function HymnsPage() {
  const t = useTranslations("Menu.Hymn");

  return (
    <SwiperTabs
      tabList={[t("hymn"), t("song")]}
      panelList={[
        <Hymns key="hymn" type={HYMN_TAB.HYMN} />,
        <>
          <VStack alignItems="center" mb={4}>
            <Text fontSize="xs" w="90%" whiteSpace="pre-wrap">
              {t("content")}
            </Text>
          </VStack>
          <Hymns type={HYMN_TAB.SONG} />
        </>,
      ]}
    />
  );
}
