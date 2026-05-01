import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, normalizeBlogAuthor, paginatePosts, getPaginationModel, BLOG_POSTS_PER_PAGE } from '@/lib/blog/posts'
import { BookMarked } from 'lucide-react'
import BlogImage from '@/components/BlogImage'
import { BlogPagination } from '@/components/BlogPagination'
import { PageKicker } from '@/components/PageKicker'

type Props = {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page: raw } = await searchParams
  const parsed = Number.parseInt(raw ?? '1', 10)
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1
  const posts = getAllPosts()
  const { page: current } = paginatePosts(posts, page)

  const title = current > 1 ? `Blog · Page ${current}` : 'Blog'
  const canonical =
    current <= 1 ? 'https://simplewebtoolsbox.com/blog' : `https://simplewebtoolsbox.com/blog?page=${current}`

  return {
    title,
    alternates: { canonical },
    description:
      'Guides on security, performance, frameworks, and money. Clear navigation and pagination for browsing all posts.',
    robots: { index: true, follow: true },
    openGraph: {
      url: canonical,
      type: 'website',
    },
  }
}

export default async function BlogPage({ searchParams }: Props) {
  const allPosts = getAllPosts()
  const { page: raw } = await searchParams
  const parsed = Number.parseInt(raw ?? '1', 10)
  const requested = Number.isFinite(parsed) && parsed > 0 ? parsed : 1
  const { items, totalPages, page } = paginatePosts(allPosts, requested)
  const model = getPaginationModel(page, totalPages)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="border-b border-slate-200 pb-8 dark:border-slate-800">
        <PageKicker icon={BookMarked} label="Guides" />
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Articles in Markdown under{' '}
          <code className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[0.85em] text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            content/blog
          </code>
          .
        </p>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
          {allPosts.length} post{allPosts.length === 1 ? '' : 's'} · {BLOG_POSTS_PER_PAGE} per page
        </p>
      </header>

      <ul className="mt-8 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
        {items.map((post, idx) => (
          <li key={post.slug} className="flex min-h-0">
            <article className="flex min-h-0 w-full flex-col">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="relative h-28 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 sm:h-32">
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    priority={page === 1 && idx < 2}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-[1.125rem]">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                    {post.category}
                    <span className="font-normal text-slate-400 dark:text-slate-500"> · {post.readTime}</span>
                  </p>
                  <h2 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 group-hover:text-sky-600 sm:text-[0.9375rem] dark:text-white dark:group-hover:text-sky-400">
                    {post.title}
                  </h2>
                  <p className="line-clamp-3 flex-1 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                    {post.description}
                  </p>
                  <p className="mt-1 line-clamp-1 text-[11px] text-slate-500 dark:text-slate-500">
                    {normalizeBlogAuthor(post.author)} · {new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </p>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>

      {items.length === 0 ? (
        <p className="mt-8 text-center text-slate-600 dark:text-slate-400">No posts on this page.</p>
      ) : null}

      <BlogPagination page={page} totalPages={totalPages} model={model} />

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Policies</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <Link href="/editorial-policy" className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400">
            Editorial
          </Link>
          ,{' '}
          <Link href="/privacy-policy" className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400">
            Privacy
          </Link>
          ,{' '}
          <Link href="/contact" className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400">
            Contact
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
