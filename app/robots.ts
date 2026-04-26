import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Block internal API routes from crawl budget
      disallow: ['/api/'],
    },
    sitemap: 'https://simplewebtoolsbox.com/sitemap.xml',
  }
}
