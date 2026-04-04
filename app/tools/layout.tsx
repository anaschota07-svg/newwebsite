import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/tools',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
