import {
  Grid,
  GridItem,
  HStack,
  Skeleton,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import SignIn from "@/app/(components)/button/Inquiry";

export default function Contact() {
  const t = useTranslations("Menu.Info");
  return (
    <VStack mt={4}>
      <HStack justifyContent="space-between" w="90%">
        <Text>{t("inquiry")}</Text>
        <SignIn />
      </HStack>
      <Grid templateColumns="1fr" gap={2} w="100%">
        {Array.from({ length: 10 }).map((_, i) => (
          <GridItem key={i}>
            <Skeleton height="40px" />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}
