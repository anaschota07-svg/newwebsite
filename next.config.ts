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
      // Redirect all www traffic to the canonical non-www domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.simplewebtoolsbox.com' }],
        destination: 'https://simplewebtoolsbox.com/:path*',
        permanent: true,
      },
      // Old blog post slugs → relevant tools
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
      // Removed blog posts → blog listing
      {
        source: '/blog/css-optimization-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/online-learning-platforms-guide',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
