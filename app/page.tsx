import { Metadata } from 'next'
import { HomePageContent } from '@/components/HomePage'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  // Use absolute to bypass the root layout template (prevents "SimpleWebToolsBox | SimpleWebToolsBox")
  title: {
    absolute: 'SimpleWebToolsBox — Free Tools & Practical Guides',
  },
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
    title: 'SimpleWebToolsBox — Free Tools & Practical Guides',
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
  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is SimpleWebToolsBox focused on?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'SimpleWebToolsBox focuses on practical guides and clearly explained resources in areas like finance, study, and technology. The goal is to publish useful content that helps people make sense of common topics without unnecessary filler.',
              },
            },
            {
              '@type': 'Question',
              name: 'Who publishes the content on this site?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The site is published and maintained by Mohd Washid under the SimpleWebToolsBox brand, with supporting policy, contact, and editorial pages available for transparency.',
              },
            },
            {
              '@type': 'Question',
              name: 'How are the guides maintained?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Guides are reviewed and updated when examples, recommendations, or important context become outdated. The published set is intentionally smaller so the site can focus on quality and clarity.',
              },
            },
            {
              '@type': 'Question',
              name: 'How can I contact the site owner?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can use the contact page to reach the publisher for questions, corrections, or business communication. Supporting trust pages like the editorial policy, disclaimer, and DMCA page are also available in the footer.',
              },
            },
          ],
        }}
      />
      <HomePageContent />
    </>
  )
}
