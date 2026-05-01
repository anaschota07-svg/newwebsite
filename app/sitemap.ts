import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/posts'
import { toolsData } from '@/data/tools/toolsData'

// Keep a stable last-modified for static assets so the sitemap doesn't change on every build
const SITE_LAUNCH = new Date('2026-01-25')
const POLICY_UPDATED = new Date('2026-02-01')
const TOOLS_UPDATED = new Date('2026-04-01')
const CONTENT_UPDATED = new Date('2026-04-24')

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

  const blogPages = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const toolPages = toolsData.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: TOOLS_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.82,
  }))

  return [...staticPages, ...toolPages, ...blogPages]
}
