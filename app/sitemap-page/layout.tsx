import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HTML Sitemap',
  description: 'Human-readable sitemap for browsing the reviewed pages on SimpleWebToolsBox.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/sitemap-page',
  },
}

export default function SitemapPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
