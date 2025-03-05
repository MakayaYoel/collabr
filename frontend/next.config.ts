import type { NextConfig } from "next";
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const nextConfig: NextConfig = {
  env: {
    BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL
  },
  webpack: (config) => {
    if (!config.plugins) config.plugins = [];
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ["javascript", "php", "typescript", "python", "go"],
      })
    );
    return config;
  },
};

export default nextConfig;
