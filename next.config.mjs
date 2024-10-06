import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TZ: "Asia/Seoul",
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
