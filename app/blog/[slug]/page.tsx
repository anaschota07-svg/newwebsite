import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { getBlogPostBySlug, blogPosts, normalizeBlogAuthor } from '@/data/blog/blogData'
import { BlogDetailPage } from '@/components/BlogDetailPage'

// Import content from separate files
import { blogContent as aiContent } from '@/data/blog/blogContent'
import { loanCalculatorContent, creditScoreContent } from '@/data/blog/remainingContent'
import { studyTechniquesContent } from '@/data/blog/studyContent'
import {
  cloudComputingContent,
  cybersecurityContent,
  webFrameworksContent,
  webpContent,
  websiteSpeedContent,
  websiteSecurityContent,
} from '@/data/blog/englishTechContent'
import { digitalMarketingContent, onlineEarningContent } from '@/data/blog/englishFinanceStudyContent'
import { newGuides2026Content } from '@/data/blog/newGuides2026Content'

const markdownArticleBySlug: Record<string, { sections: { heading: string; content: string }[] }> = {}

try {
  const passwordArticleMarkdown = readFileSync(
    path.join(process.cwd(), 'password-article.md'),
    'utf8'
  )

  markdownArticleBySlug['how-hackers-crack-weak-passwords-and-how-to-prevent-it'] = {
    sections: [
      {
        heading: 'How Hackers Crack Weak Passwords And How to Prevent It',
        content: passwordArticleMarkdown,
      },
    ],
  }
} catch {
  // Keep blog rendering resilient when markdown file is missing.
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: `${post.description} Read our comprehensive guide with step-by-step instructions. Expert tutorials and Blogs & guides.`,
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      post.title.toLowerCase(),
      post.category.toLowerCase(),
      'guide',
      'tutorial',
      'step-by-step',
      'practical resource',
      'simplewebtoolsbox',
    ],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://simplewebtoolsbox.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [normalizeBlogAuthor(post.author)],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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

// Merge all blog content from different sources
const blogContent = {
  ...aiContent,
  ...loanCalculatorContent,
  ...creditScoreContent,
  ...studyTechniquesContent,
  ...cloudComputingContent,
  ...cybersecurityContent,
  ...webFrameworksContent,
  ...webpContent,
  ...websiteSpeedContent,
  ...websiteSecurityContent,
  ...digitalMarketingContent,
  ...onlineEarningContent,
  ...newGuides2026Content,
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content =
    blogContent[slug as keyof typeof blogContent] ??
    markdownArticleBySlug[slug as keyof typeof markdownArticleBySlug]
  const related = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2)

  return <BlogDetailPage post={post} content={content} relatedPosts={related} />
}
