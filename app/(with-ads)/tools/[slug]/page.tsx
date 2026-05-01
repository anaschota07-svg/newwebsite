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
  return {
    title: `${tool.name} — free online tool`,
    description: `${tool.description} Learn how to use it, what the limits are, and how we handle your data on SimpleWebToolsBox.`,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${tool.name} | SimpleWebToolsBox`,
      description: tool.description,
      url: `https://simplewebtoolsbox.com/tools/${tool.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://simplewebtoolsbox.com/tools/${tool.slug}`,
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
