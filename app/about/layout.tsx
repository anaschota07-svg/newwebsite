import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | SimpleWebToolsBox',
  description:
    'Learn about SimpleWebToolsBox, its publisher, editorial standards, and the purpose behind the site’s tools and guides.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
