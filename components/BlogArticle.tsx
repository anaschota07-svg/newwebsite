import Link from 'next/link'
import Image from 'next/image'
import { FileText, List } from 'lucide-react'
import type { BlogPost } from '@/lib/blog/posts'
import { normalizeBlogAuthor } from '@/lib/blog/posts'
import { BlogProse } from '@/components/BlogProse'
import { PageKicker } from '@/components/PageKicker'
import { slugify } from '@/lib/utils/slugify'

function extractHeadings(content: string) {
  const lines = content.split('\n')
  const headings: { text: string; level: number; id: string }[] = []
  
  for (const line of lines) {
    const match = line.match(/^(##|###)\s+(.*)/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      headings.push({
        text,
        level,
        id: slugify(text)
      })
    }
  }
  return headings
}

export function BlogArticle({
  post,
  body,
  relatedPosts,
}: {
  post: BlogPost
  body: string
  relatedPosts: BlogPost[]
}) {
  const author = normalizeBlogAuthor(post.author)
  const headings = extractHeadings(body)
  const continueReading = relatedPosts.slice(0, 2)
  const relatedCards = relatedPosts.slice(0, 3)

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="text-sm font-medium text-sky-700 underline decoration-sky-700/35 underline-offset-2 hover:text-sky-900 hover:decoration-sky-700 dark:text-sky-300 dark:hover:text-sky-200 dark:hover:decoration-sky-300"
      >
        ← Back to blog
      </Link>

      <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-8">
        {headings.length > 0 ? (
          <aside className="hidden lg:order-2 lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <List className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <h2 className="text-sm font-semibold">On this page</h2>
              </div>
              <nav className="mt-3 max-h-64 overflow-auto pr-1">
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      style={{ marginLeft: `${(heading.level - 2) * 0.75}rem` }}
                      className="flex items-start"
                    >
                      <a
                        href={`#${heading.id}`}
                        className="line-clamp-2 text-xs leading-relaxed text-slate-600 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        ) : null}

        <div className="min-w-0 lg:order-1">
          <header className="mx-auto max-w-3xl">
            <PageKicker icon={FileText} label="Article" className="mb-4" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span>{post.category}</span>
              <span className="mx-2">·</span>
              <span>{post.readTime}</span>
              <span className="mx-2">·</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</time>
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{post.description}</p>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{author}</p>
          </header>

          <div className="relative mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            {post.image.startsWith('http') ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42rem"
                priority
              />
            ) : (
              <div className="h-full w-full bg-slate-200 dark:bg-slate-800" aria-hidden />
            )}
          </div>

          {headings.length > 0 && (
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 lg:hidden">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <List className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                <h2 className="text-lg font-semibold">Table of Contents</h2>
              </div>
              <nav className="mt-4">
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      style={{ marginLeft: `${(heading.level - 2) * 1.5}rem` }}
                      className="flex items-start"
                    >
                      <a
                        href={`#${heading.id}`}
                        className="text-sm text-slate-600 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          <div className="mx-auto mt-12 max-w-3xl border-t border-slate-200 pt-10 dark:border-slate-800">
            <BlogProse>{body}</BlogProse>
          </div>

          {continueReading.length > 0 ? (
            <section className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Continue reading</h2>
              <ul className="mt-4 space-y-3">
                {continueReading.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-sm font-medium text-sky-700 underline decoration-sky-700/30 underline-offset-2 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200"
                    >
                      {p.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {relatedCards.length > 0 ? (
            <section className="mx-auto mt-12 max-w-6xl border-t border-slate-200 pt-10 dark:border-slate-800">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Related Posts</h2>
              <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {relatedCards.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        {p.image.startsWith('http') ? (
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="h-full w-full bg-slate-200 dark:bg-slate-800" aria-hidden />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="inline-flex w-fit rounded-full border border-slate-300 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
                          {p.category}
                        </p>
                        <h3 className="mt-3 line-clamp-3 text-xl font-semibold leading-snug text-slate-900 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
                          {p.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {p.description}
                        </p>
                        <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                          {normalizeBlogAuthor(p.author)} · {new Date(p.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  )
}
