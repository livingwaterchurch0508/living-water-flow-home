import { Container, VStack } from "@chakra-ui/react";

import MainInfo from "@/app/(components)/layout/Main/Info";
import MainSermon from "@/app/(components)/layout/Main/Sermon";
import MainNews from "@/app/(components)/layout/Main/News";
import Footer from "@/app/(components)/navigation/Footer";

export default async function Home() {
  return (
    <main>
      <Container w="97vw" maxW="900px">
        <VStack gap={20} alignItems="center">
          <MainInfo />
          <MainSermon />
          <MainNews />
        </VStack>
      </Container>
      <Footer />
    </main>
  );
}
