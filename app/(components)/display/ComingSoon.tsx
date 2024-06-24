import { VStack, Image, Text, Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function ComingSoon() {
  const t = useTranslations("Common");
  return (
    <VStack
      mt={4}
      spacing={4}
      justify="center"
      align="center"
      height="calc(100vh - 200px)"
      minH="600px"
      bgGradient="linear(to-r, teal.500, green.500)"
      color="white"
      textAlign="center"
      p={4}
    >
      <Box bgGradient="linear(to-r, teal.500, green.500)" w="50%">
        <Image src="/comming-soon.svg" alt="Coming Soon" />
      </Box>
      <Text fontSize="4xl" fontWeight="bold">
        {t("comingSoon")}
      </Text>
      <Text fontSize="xl" whiteSpace="pre-wrap">
        {t("wait")}
      </Text>
    </VStack>
  );
}
