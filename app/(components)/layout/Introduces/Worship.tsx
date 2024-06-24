"use client";

import { AspectRatio, Divider, Image, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function Worship() {
  const t = useTranslations("Introduce.worship");
  return (
    <VStack mt={4}>
      <AspectRatio w="100%" minH="200px" ratio={9 / 4}>
        <Image src="/church_banner.png" alt="pastor" />
      </AspectRatio>
      <VStack alignItems="flex-start" mt={4} w="100%">
        <Text fontSize="2xl">{t("name")}</Text>
        <Divider />
        <Text fontSize="xl">{t("sunday")}</Text>
        <Text>{t("sunWorship")}</Text>
        <Text fontSize="xl" mt={4}>
          {t("wednesday")}
        </Text>
        <Text>{t("wedWorship")}</Text>
      </VStack>
    </VStack>
  );
}
