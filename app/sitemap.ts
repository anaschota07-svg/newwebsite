import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog/blogData'
import { toolsData } from '@/data/tools/toolsData'

// Keep a stable last-modified for static assets so the sitemap doesn't change on every build
const SITE_LAUNCH = new Date('2026-01-25')
const POLICY_UPDATED = new Date('2026-02-01')
const TOOLS_UPDATED = new Date('2026-04-01')
const CONTENT_UPDATED = new Date('2026-04-24')

// Keep sitemap intentionally small for quality-first indexing.
const FEATURED_TOOL_SLUGS = [
  'age-calculator',
  'password-generator',
  'json-formatter',
  'css-minifier',
  'loan-calculator',
  'email-validator',
] as const

const FEATURED_BLOG_SLUGS = [
  'cybersecurity-best-practices-2026',
  'password-managers-and-2fa-guide',
  'emergency-fund-basics-2026',
  'web-frameworks-comparison-2026',
  'how-to-convert-image-to-webp-for-free',
  'why-is-my-website-slow-2025',
  'how-to-check-website-security',
  'how-hackers-crack-weak-passwords-and-how-to-prevent-it',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://simplewebtoolsbox.com'

  const staticPages = [
    {
      url: baseUrl,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: TOOLS_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_LAUNCH,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: SITE_LAUNCH,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: POLICY_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: POLICY_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: POLICY_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: POLICY_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: POLICY_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  const blogPages = blogPosts
    .filter((post) => FEATURED_BLOG_SLUGS.includes(post.slug as (typeof FEATURED_BLOG_SLUGS)[number]))
    .map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const toolPages = toolsData
    .filter((tool) => FEATURED_TOOL_SLUGS.includes(tool.slug as (typeof FEATURED_TOOL_SLUGS)[number]))
    .map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: TOOLS_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Most important pages only.
  return [...staticPages, ...toolPages, ...blogPages]
}
