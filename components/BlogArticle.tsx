import Link from 'next/link'
import Image from 'next/image'
import { FileText } from 'lucide-react'
import type { BlogPost } from '@/lib/blog/posts'
import { normalizeBlogAuthor } from '@/lib/blog/posts'
import { BlogProse } from '@/components/BlogProse'
import { PageKicker } from '@/components/PageKicker'

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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="text-sm font-medium text-sky-700 underline decoration-sky-700/35 underline-offset-2 hover:text-sky-900 hover:decoration-sky-700 dark:text-sky-300 dark:hover:text-sky-200 dark:hover:decoration-sky-300"
      >
        ← Back to blog
      </Link>

      <header className="mt-8">
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

      <div className="relative mt-10 aspect-video overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
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

      <div className="mt-12 border-t border-slate-200 pt-10 dark:border-slate-800">
        <BlogProse>{body}</BlogProse>
      </div>

      {relatedPosts.length > 0 ? (
        <aside className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Related posts</h2>
          <ul className="mt-4 space-y-3">
            {relatedPosts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="text-sky-600 hover:underline dark:text-sky-400">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  )
}
