import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guides on security, performance, frameworks, and money—published as Markdown in the repo for easy updates.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/blog',
  },
  openGraph: {
    title: 'Blog | SimpleWebToolsBox',
    description:
      'Guides on security, performance, frameworks, and money—published as Markdown in the repo for easy updates.',
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
