"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Text, VStack } from "@chakra-ui/react";

import Sermons from "@/app/(components)/layout/Sermons/Sermons";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";
import { SERMON_TAB } from "@/app/(variables)/enums";
import { useCookieSetMenu } from "@/app/(util)/hooks/useCookieSetMenu";

export default function SermonsPage() {
  useCookieSetMenu();
  const t = useTranslations("Menu.Sermon");

  return (
    <SwiperTabs
      tabList={[t("sermon"), t("soul")]}
      panelList={[
        <Sermons key="rhema" type={SERMON_TAB.RHEMA} />,
        <>
          <VStack alignItems="center" mb={4}>
            <Text fontSize="xs" w="90%" whiteSpace="pre-wrap">
              {t("content")}
            </Text>
          </VStack>
          <Sermons key="soul" type={SERMON_TAB.SOUL} />
        </>,
      ]}
    />
  );
}
