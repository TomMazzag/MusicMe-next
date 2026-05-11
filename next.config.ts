import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'backend'],
  images: {
    remotePatterns: [new URL('https://i.scdn.co/**')],
  },
};

export default nextConfig;
