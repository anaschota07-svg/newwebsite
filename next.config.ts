import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
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
      // NOTE: www → non-www redirect is handled at the Vercel domain level (not here)
      // Adding it here while Vercel also redirects non-www → www causes a redirect loop
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
      {
        source: '/blog/how-to-convert-image-to-webp-for-free',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/how-to-check-website-security',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
