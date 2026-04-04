import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs & Guides | SimpleWebToolsBox',
  description:
    'Read the reviewed set of blogs and guides on SimpleWebToolsBox, focused on practical explanations that support our tools and calculators.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/blog',
  },
  openGraph: {
    title: 'Blogs & Guides | SimpleWebToolsBox',
    description:
      'Read the reviewed set of blogs and guides on SimpleWebToolsBox, focused on practical explanations that support our tools and calculators.',
    url: 'https://simplewebtoolsbox.com/blog',
    type: 'website',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
