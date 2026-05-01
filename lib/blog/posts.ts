import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export const BLOG_AUTHOR = 'SimpleWebToolsBox Team'

export interface BlogPost {
  id: string
  title: string
  description: string
  slug: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

export interface BlogPostFile extends BlogPost {
  body: string
}

export const BLOG_POSTS_PER_PAGE = 10

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export function paginatePosts(
  posts: BlogPost[],
  page: number,
  pageSize: number = BLOG_POSTS_PER_PAGE
): { items: BlogPost[]; totalPages: number; page: number; total: number } {
  const total = posts.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * pageSize
  return {
    items: posts.slice(start, start + pageSize),
    totalPages,
    page: safePage,
    total,
  }
}

/** Page numbers plus gaps for ellipsis-style pagination controls. */
export function getPaginationModel(
  current: number,
  totalPages: number
): ({ type: 'page'; page: number } | { type: 'gap' })[] {
  if (totalPages <= 1) return [{ type: 'page', page: 1 }]
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, i) => ({ type: 'page' as const, page: i + 1 }))
  }

  const want = new Set<number>([1, totalPages, current - 1, current, current + 1])
  for (const p of [...want]) {
    if (p < 1 || p > totalPages) want.delete(p)
  }

  const sorted = [...want].sort((a, b) => a - b)
  const model: ({ type: 'page'; page: number } | { type: 'gap' })[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) model.push({ type: 'gap' })
    model.push({ type: 'page', page: sorted[i] })
  }
  return model
}

export type PaginationModel = ReturnType<typeof getPaginationModel>

export function normalizeBlogAuthor(author: string): string {
  return author === 'SimpleWebToolsBox Team' ? BLOG_AUTHOR : author
}

function requireMeta(data: Record<string, unknown>, slugFromFile: string): BlogPost {
  const slug = typeof data.slug === 'string' ? data.slug : slugFromFile
  const title = data.title
  const description = data.description
  const category = data.category
  const date = data.date
  const readTime = data.readTime
  const image = data.image

  const missing = [title, description, category, date, readTime, image].some((v) => typeof v !== 'string' || !v)
  if (missing) {
    throw new Error(`Invalid frontmatter for blog post "${slug}". Required: title, description, slug, category, date, readTime, image`)
  }

  const authorRaw = typeof data.author === 'string' && data.author ? data.author : BLOG_AUTHOR

  return {
    id: slug,
    slug,
    title: title as string,
    description: description as string,
    category: category as string,
    author: normalizeBlogAuthor(authorRaw),
    date: date as string,
    readTime: readTime as string,
    image: image as string,
  }
}

function listMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .sort()
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = []
  for (const file of listMarkdownFiles()) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
    const { data } = matter(raw)
    const slug = file.replace(/\.mdx?$/, '')
    posts.push(requireMeta(data as Record<string, unknown>, slug))
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPostFile | null {
  for (const ext of ['.md', '.mdx'] as const) {
    const filePath = path.join(CONTENT_DIR, `${slug}${ext}`)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const meta = requireMeta(data as Record<string, unknown>, slug)
    return { ...meta, body: content.trim() }
  }
  return null
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}
