import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getToolBySlug, toolsData } from '@/data/tools/toolsData'
import { getToolNarrative } from '@/data/tools/toolNarratives'
import { ToolPageLayout } from '@/components/tools/ToolPageLayout'

export async function generateStaticParams() {
  return toolsData.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) {
    return { title: 'Tool not found' }
  }
  const canonical = `https://simplewebtoolsbox.com/tools/${tool.slug}`
  const title = `${tool.name}: free ${tool.category} tool`
  const description = `${tool.description} Step-by-step use, limits, and data handling—all in your browser on SimpleWebToolsBox.`

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${tool.name} | SimpleWebToolsBox`,
      description: tool.description,
      url: canonical,
      type: 'website',
      siteName: 'SimpleWebToolsBox',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | SimpleWebToolsBox`,
      description: tool.description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical,
    },
  }
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) {
    notFound()
  }
  const narrative = getToolNarrative(slug)
  if (!narrative) {
    notFound()
  }

  return <ToolPageLayout tool={tool} narrative={narrative} />
}
