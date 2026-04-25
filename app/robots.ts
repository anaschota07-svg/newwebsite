import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Block the HTML sitemap page (noindex utility page, not for search bots)
      // and internal API routes from crawl budget
      disallow: ['/sitemap-page', '/api/'],
    },
    sitemap: 'https://simplewebtoolsbox.com/sitemap.xml',
  }
}
