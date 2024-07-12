"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import getTheme from "@/app/[locale]/theme";

export function Providers({
  children,
  // locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const theme = getTheme();

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider>{children}</SessionProvider>
    </ChakraProvider>
  );
}
