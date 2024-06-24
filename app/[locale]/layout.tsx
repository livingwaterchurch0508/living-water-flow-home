import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { Providers } from "@/app/[locale]/providers";
import "./globals.css";
import "swiper/swiper-bundle.css";
import Navbar from "@/app/(components)/navigation/Navbar";
import ScrollToTop from "@/app/(components)/button/ScrollToTop";

export const metadata: Metadata = {
  title: "생수가 흐르는 교회💒",
  description: "생수가 흐르는 교회에 오신걸 환영합니다!",
  icons: [
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon.png" },
  ],
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers locale={locale}>
            <ScrollToTop />
            <Navbar />
            {children}
            <SpeedInsights />
            <Analytics />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
