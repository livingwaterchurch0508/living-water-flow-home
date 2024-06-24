"use client";

import { AspectRatio, Text, Image, VStack, Divider } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function Pastor() {
  const t = useTranslations("Introduce.pastor");
  return (
    <VStack mt={4}>
      <AspectRatio w="100%" minH="200px" ratio={9 / 4}>
        <Image src="/pastor_banner.png" alt="pastor" />
      </AspectRatio>
      <VStack alignItems="flex-start" mt={4}>
        <Text fontSize="2xl">{t("overview")}</Text>
        <Divider />
        <Text whiteSpace="pre-wrap" mt={4}>
          {t("details")}
        </Text>
      </VStack>
    </VStack>
  );
}
