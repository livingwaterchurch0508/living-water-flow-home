import { Container, VStack } from "@chakra-ui/react";

import MainInfo from "@/app/(components)/layout/Main/Info";
import MainSpirit from "@/app/(components)/layout/Main/Spirit";
import MainSermon from "@/app/(components)/layout/Main/Sermon";
import MainNews from "@/app/(components)/layout/Main/News";
import Footer from "@/app/(components)/navigation/Footer";
import Description from "@/app/(components)/layout/Main/Description";

export default async function Home() {
  return (
    <main>
      <Container w="97vw">
        <VStack alignItems="center" gap={0}>
          <MainInfo />
          <MainSpirit />
          <Description />
          <MainSermon />
          <MainNews />
        </VStack>
      </Container>
      <Footer />
    </main>
  );
}
