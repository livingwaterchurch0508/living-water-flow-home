"use client";

import { AspectRatio, Divider, Image, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function Church() {
  const t = useTranslations("Introduce.church");
  return (
    <VStack mt={4}>
      <AspectRatio w="100%" minH="200px" ratio={9 / 4}>
        <Image src="/church_banner.png" alt="pastor" />
      </AspectRatio>
      <VStack alignItems="flex-start" mt={4}>
        <Text fontSize="2xl">{t("name")}</Text>
        <Divider />
        <Text whiteSpace="pre-wrap" mt={4}>
          {t("content")}
        </Text>
      </VStack>
    </VStack>
  );
}
