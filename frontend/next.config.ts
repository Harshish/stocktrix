import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.SERVER_DOMAIN_NAME,
    NEXT_PUBLIC_APP_NAME: process.env.APP_NAME,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
