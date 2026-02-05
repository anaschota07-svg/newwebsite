import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chart.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Optimize production builds
  poweredByHeader: false,
  // Compression
  compress: true,
};

export default nextConfig;
