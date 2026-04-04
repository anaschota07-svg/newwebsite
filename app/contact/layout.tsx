import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | SimpleWebToolsBox',
  description:
    'Contact the publisher of SimpleWebToolsBox for feedback, corrections, suggestions, and general support.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
