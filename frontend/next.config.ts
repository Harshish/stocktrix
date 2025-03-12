import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.SERVER_DOMAIN_NAME,
    NEXT_PUBLIC_APP_NAME: process.env.APP_NAME,
  },
};

export default nextConfig;
