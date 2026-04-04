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
  async redirects() {
    return [
      {
        source: '/blog/text-case-conversion-guide',
        destination: '/tools/text-case-converter',
        permanent: true,
      },
      {
        source: '/blog/base64-encoding-tutorial',
        destination: '/tools/base64-encoder-decoder',
        permanent: true,
      },
      {
        source: '/blog/hash-functions-guide',
        destination: '/tools/hash-generator',
        permanent: true,
      },
      {
        source: '/blog/base64-encoding-applications',
        destination: '/tools/base64-encoder-decoder',
        permanent: true,
      },
      {
        source: '/blog/understanding-bmi',
        destination: '/tools/bmi-calculator',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
