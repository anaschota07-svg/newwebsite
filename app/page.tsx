import { Metadata } from 'next'
import { HomePageContent } from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'SimpleWebToolsBox - Practical Guides & Resources',
  description:
    'Practical guides plus free browser tools (calculators, text utilities, developer helpers) with clear how-to text on every page. Published by SimpleWebToolsBox with transparent policies and contact information.',
  keywords: [
    'Blogs & guides',
    'free online tools',
    'tutorials',
    'study guides',
    'finance guides',
    'technology guides',
    'credit score guide',
    'loan calculator guide',
    'cloud computing guide',
    'effective study techniques',
  ],
  openGraph: {
    title: 'SimpleWebToolsBox - Practical Guides & Resources',
    description: 'A curated set of practical guides and publisher-quality resources from SimpleWebToolsBox, focused on finance, study, and technology topics.',
    type: 'website',
    url: 'https://simplewebtoolsbox.com',
    siteName: 'SimpleWebToolsBox',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SimpleWebToolsBox - Free Online Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimpleWebToolsBox - Practical Guides & Resources',
    description: 'A curated set of practical guides and publisher-quality resources from SimpleWebToolsBox, focused on finance, study, and technology topics.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://simplewebtoolsbox.com',
  },
}

export default function Home() {
  return <HomePageContent />
}
