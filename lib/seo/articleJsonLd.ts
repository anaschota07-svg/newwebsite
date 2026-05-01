import type { BlogPost } from '@/lib/blog/posts'
import { normalizeBlogAuthor } from '@/lib/blog/posts'

const SITE = 'https://simplewebtoolsbox.com'

function absoluteImageUrl(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  const path = src.startsWith('/') ? src : `/${src}`
  return `${SITE}${path}`
}

/** JSON-LD for blog posts (Article). */
export function articleJsonLd(post: BlogPost) {
  const url = `${SITE}/blog/${post.slug}`
  const imageUrl = absoluteImageUrl(post.image)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: normalizeBlogAuthor(post.author),
    },
    publisher: {
      '@type': 'Organization',
      name: 'SimpleWebToolsBox',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}
