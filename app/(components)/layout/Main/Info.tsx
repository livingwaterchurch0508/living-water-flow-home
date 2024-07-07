import { useTranslations } from "next-intl";
import { AspectRatio, Box, Image, Text, VStack } from "@chakra-ui/react";

export default function MainInfo() {
  const t = useTranslations("Main.Info");
  return (
    <Box w="97vw" justifyContent="center" display="flex" py={10}>
      <VStack w="90%" maxW="900px">
        <VStack alignItems="flex-start" w="90%" maxW="900px">
          <AspectRatio w="100%" ratio={5 / 2.8}>
            <Image src="/home_banner.png" alt="main" />
          </AspectRatio>
          <Text
            fontSize={{ sm: "xl", md: "xl", base: "xl" }}
            fontWeight="bold"
            mt={15}
          >
            {t("title")}
          </Text>
          <Text
            fontSize={{ sm: "sm", md: "sm", base: "sm" }}
            whiteSpace="pre-wrap"
          >
            {t("description")}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
