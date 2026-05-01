import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getAllPosts, getPostBySlug, normalizeBlogAuthor } from '@/lib/blog/posts'
import { BlogArticle } from '@/components/BlogArticle'
import { articleJsonLd } from '@/lib/seo/articleJsonLd'
import { stringifyJsonLd } from '@/lib/seo/stringifyJsonLd'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.description,
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://simplewebtoolsbox.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [normalizeBlogAuthor(post.author)],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    alternates: {
      canonical: `https://simplewebtoolsbox.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const file = getPostBySlug(slug)

  if (!file) {
    notFound()
  }

  const related = getAllPosts()
    .filter((p) => p.slug !== file.slug && p.category === file.category)
    .slice(0, 2)

  const jsonLd = articleJsonLd(file)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(jsonLd) }}
      />
      <BlogArticle post={file} body={file.body} relatedPosts={related} />
    </>
  )
}
