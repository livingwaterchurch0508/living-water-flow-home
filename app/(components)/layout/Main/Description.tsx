"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function Description() {
  const t = useTranslations("Main.Description");
  return (
    <Box w="97vw" justifyContent="center" display="flex" py={20}>
      <VStack w="90%" maxW="900px">
        <VStack alignItems="flex-start" w="90%" maxW="900px">
          <Text whiteSpace="pre-wrap" fontWeight="bold">
            {t("message")}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
