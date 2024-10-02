import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ko"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.png|.*\\.svg|.*\\.jpeg|.*\\.jpg).*)",
    "/",
    "/(ko|en)/:path*",
  ],
};
