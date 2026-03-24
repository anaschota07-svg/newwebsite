import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getBlogPostBySlug, blogPosts, normalizeBlogAuthor } from '@/data/blog/blogData'
import { BlogDetailPage } from '@/components/BlogDetailPage'

// Import content from separate files
import { blogContent as aiContent } from '@/data/blog/blogContent'
import { personalFinanceContent, stockMarketContent, loanCalculatorContent, cryptoContent } from '@/data/blog/remainingContent'
import { studyTechniquesContent, onlineLearningContent, timeManagementContent, programmingCareerContent } from '@/data/blog/studyContent'
import { digitalMarketingHindiContent, onlineEarningHindiContent, creditScoreHindiContent, careerGuideHindiContent, cybersecurityHindiContent } from '@/data/blog/hindiContent'
import { machineLearningContent, iotContent } from '@/data/blog/additionalContent'
import { stemEducationContent } from '@/data/blog/stemEducationContent'
import { cloudComputingHindiContent, webFrameworksHindiContent, blockchainHindiContent } from '@/data/blog/additionalContent'
import { cloudComputingContent, cybersecurityContent, webFrameworksContent, blockchainContent } from '@/data/blog/englishTechContent'
import { digitalMarketingContent, onlineEarningContent, realEstateContent as realEstateEnglishContent } from '@/data/blog/englishFinanceStudyContent'
import { retirementContent, digitalLiteracyContent } from '@/data/blog/retirementAndDigitalLiteracy'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
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
    title: `${post.title} | SimpleWebToolsBox`,
    description: `${post.description} Read our comprehensive guide with step-by-step instructions. Expert tutorials and Blogs & guides.`,
    keywords: [
      post.title.toLowerCase(),
      post.category.toLowerCase(),
      'Blogs & guide',
      'tutorial',
      'step-by-step',
      'online tools',
      'free tools',
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
  ...personalFinanceContent,
  ...stockMarketContent,
  ...loanCalculatorContent,
  ...cryptoContent,
  ...studyTechniquesContent,
  ...onlineLearningContent,
  ...timeManagementContent,
  ...programmingCareerContent,
  ...digitalMarketingHindiContent,
  ...onlineEarningHindiContent,
  ...creditScoreHindiContent,
  ...careerGuideHindiContent,
  ...cybersecurityHindiContent,
  ...machineLearningContent,
  ...iotContent,
  ...stemEducationContent,
  ...cloudComputingHindiContent,
  ...webFrameworksHindiContent,
  ...blockchainHindiContent,
  ...cloudComputingContent,
  ...cybersecurityContent,
  ...webFrameworksContent,
  ...blockchainContent,
  ...digitalMarketingContent,
  ...onlineEarningContent,
  ...realEstateEnglishContent,
  ...retirementContent,
  ...digitalLiteracyContent,
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = blogContent[slug as keyof typeof blogContent]
  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2)

  return <BlogDetailPage post={post} content={content} relatedPosts={related} />
}
