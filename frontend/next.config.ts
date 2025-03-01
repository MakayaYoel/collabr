import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL
  }
};

export default nextConfig;
