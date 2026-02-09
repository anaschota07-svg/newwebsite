import { Metadata } from 'next'
import { HomePageContent } from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'SimpleWebToolsBox - 35+ Free Online Tools & Calculators',
  description: 'Free online tools and calculators: Age Calculator, BMI Calculator, Password Generator, QR Code Generator, JSON Formatter, Base64 Encoder, Hash Generator, and 35+ more tools. Expert how-to guides and tutorials. No registration required. 100% free forever.',
  keywords: [
    'free online tools',
    'online calculator',
    'age calculator',
    'bmi calculator',
    'password generator',
    'qr code generator',
    'json formatter',
    'base64 encoder',
    'hash generator',
    'text converter',
    'word counter',
    'uuid generator',
    'unit converter',
    'percentage calculator',
    'random number generator',
    'html encoder',
    'url encoder',
    'timestamp converter',
    'css minifier',
    'javascript minifier',
    'gradient generator',
    'box shadow generator',
    'how-to guides',
    'tutorials',
    'web tools',
    'developer tools',
    'productivity tools',
    'text tools',
    'security tools',
    'design tools',
  ],
  openGraph: {
    title: 'SimpleWebToolsBox - 35+ Free Online Tools & Calculators',
    description: 'Free online tools and calculators: Age Calculator, BMI Calculator, Password Generator, QR Code Generator, JSON Formatter, and 35+ more tools. Expert how-to guides and tutorials. No registration required.',
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
    title: 'SimpleWebToolsBox - 35+ Free Online Tools & Calculators',
    description: 'Free online tools and calculators: Age Calculator, BMI Calculator, Password Generator, QR Code Generator, JSON Formatter, and 35+ more tools. Expert how-to guides and tutorials.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://simplewebtoolsbox.com',
  },
}

export default function Home() {
  return <HomePageContent />
}
