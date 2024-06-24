import { Container } from "@chakra-ui/react";

export default async function IntroduceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Container w="97vw" maxW="900px">
        {children}
      </Container>
    </main>
  );
}
