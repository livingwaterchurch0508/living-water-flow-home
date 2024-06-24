"use client";

import { useTranslations } from "next-intl";
import { Text, useColorMode, VStack } from "@chakra-ui/react";

export default function Footer() {
  const { colorMode } = useColorMode();
  const t = useTranslations("Footer");
  return (
    <VStack
      alignItems="flex-start"
      position="relative"
      gap={0}
      bg={colorMode === "light" ? "#F9FAFB" : "initial"}
      mt={10}
      py={4}
      px="8%"
    >
      <Text fontSize="xs" fontWeight="bold">
        {t("sect")}
      </Text>
      <Text fontSize="xs" fontWeight="bold" mb={1}>
        {t("church")}
      </Text>
      <Text fontSize="xs">{t("address")}</Text>
      <Text fontSize="xs">{t("contact")}</Text>
    </VStack>
  );
}
