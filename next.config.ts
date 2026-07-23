import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'backend'],
  images: {
    remotePatterns: [
      new URL('https://i.scdn.co/**'),
      new URL('https://img.clerk.com/**'),
      new URL('https://archive.org/**'),
      new URL('https://**.archive.org/**'),
      new URL('https://coverartarchive.org/**'),
    ],
  },
};

export default nextConfig;
