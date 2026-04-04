import { Metadata } from 'next'
import { ToolsPageContent } from '@/components/ToolsPage'

export const metadata: Metadata = {
  title: 'Free Online Tools | SimpleWebToolsBox',
  description:
    'Browse the reviewed set of free online tools on SimpleWebToolsBox, including calculators, generators, formatters, and utility tools.',
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/tools',
  },
  openGraph: {
    title: 'Free Online Tools | SimpleWebToolsBox',
    description:
      'Browse the reviewed set of free online tools on SimpleWebToolsBox, including calculators, generators, formatters, and utility tools.',
    url: 'https://simplewebtoolsbox.com/tools',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ToolsPage() {
  return <ToolsPageContent />
}
