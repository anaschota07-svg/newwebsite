import Link from 'next/link'
import { ArrowRight, BookOpen, Home, PenLine, Shapes } from 'lucide-react'
import { getAllPosts } from '@/lib/blog/posts'
import { toolsData } from '@/data/tools/toolsData'
import BlogImage from '@/components/BlogImage'
import { PageKicker } from '@/components/PageKicker'

const featuredToolSlugs = ['password-generator', 'json-formatter', 'qr-code-generator', 'word-counter', 'loan-calculator', 'csv-to-json'] as const

/** Reserved region for responsive display ads once AdSense delivers an approved snippet. */
function AdPlaceholderSidebar() {
  return (
    <aside
      className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-6 text-center dark:border-slate-700 dark:bg-slate-900/40"
      aria-label="Advertising"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">Ad unit</p>
      <p className="mx-auto mt-2 max-w-[14rem] text-sm leading-snug text-slate-600 dark:text-slate-400">
        After Google approves AdSense, place your slot here (sticky on large screens stays below the fold on mobile naturally).
      </p>
      <div className="mx-auto mt-4 min-h-[100px] max-w-[300px] rounded-lg bg-slate-100/90 dark:bg-slate-800/80" aria-hidden />
    </aside>
  )
}

export function HomePageContent() {
  const guides = getAllPosts()
  const featured = guides.slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">
        <div className="lg:col-span-8">
          <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-slate-50 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 sm:p-10">
            <div className="relative">
              <PageKicker icon={Home} label="Home" />
              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[2.375rem] lg:leading-tight">
                Clear guides &amp; free tools you can trust
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                Independent tutorials and utilities with named ownership, readable policies, and easy contact—friendly to readers and reviewers.
              </p>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
                Publisher · Transparent policies · {guides.length} articles · {toolsData.length} tools
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
                  Read guides
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                >
                  <Shapes className="h-4 w-4 shrink-0" aria-hidden />
                  Browse tools
                </Link>
                <Link
                  href="/about"
                  className="inline-flex min-h-11 items-center rounded-xl px-2 py-2.5 text-sm font-medium text-slate-600 underline-offset-4 hover:underline dark:text-slate-400"
                >
                  About the publisher
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-12 sm:mt-14" aria-labelledby="latest-heading">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <PenLine className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
                  <h2 id="latest-heading" className="text-xl font-semibold">
                    Latest from the blog
                  </h2>
                </div>
                <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                  Practical write-ups spanning security, the web stack, speed, and money topics.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400"
              >
                View all articles
              </Link>
            </div>

            <ul className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2">
              {featured.map((post, idx) => (
                <li key={post.slug} className="flex min-h-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex w-full min-h-[17rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <BlogImage
                        src={post.image}
                        alt={post.title}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 25vw"
                        priority={idx === 0}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                          {post.category}
                        </p>
                        <span className="text-[11px] tabular-nums text-slate-500 dark:text-slate-500">
                          {new Date(post.date).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                        {post.title}
                      </h3>
                      <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{post.description}</p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                        Read
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14 border-t border-slate-200 pt-12 dark:border-slate-800 lg:hidden" aria-label="Advertising">
            <AdPlaceholderSidebar />
          </section>
        </div>

        <div className="mt-14 space-y-8 lg:col-span-4 lg:mt-0 lg:space-y-6">
          <div className="hidden lg:block lg:sticky lg:top-20">
            <AdPlaceholderSidebar />
          </div>

          <nav
            aria-labelledby="popular-tools-heading"
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 id="popular-tools-heading" className="text-sm font-semibold text-slate-900 dark:text-white">
              Popular tools
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Runs in your browser • see each tool page for privacy notes</p>
            <ul className="mt-4 space-y-2">
              {featuredToolSlugs.map((slug) => {
                const t = toolsData.find((x) => x.slug === slug)
                if (!t) return null
                return (
                  <li key={t.id}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="flex min-h-11 items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2.5 text-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                    >
                      <span className="min-w-0 font-medium text-slate-900 dark:text-white">
                        <span aria-hidden>{t.icon}</span> <span>{t.name}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Link
              href="/tools"
              className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400"
            >
              Full tools directory ({toolsData.length})
            </Link>
          </nav>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm dark:border-slate-800 dark:bg-slate-900/60">
            <p className="font-semibold text-slate-900 dark:text-white">Navigation & policies</p>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/contact" className="text-sky-600 hover:underline dark:text-sky-400">
                  Contact
                </Link>{' '}
                — corrections, partnerships, abuse
              </li>
              <li>
                <Link href="/editorial-policy" className="text-sky-600 hover:underline dark:text-sky-400">
                  Editorial policy
                </Link>{' '}
                &amp;{' '}
                <Link href="/privacy-policy" className="text-sky-600 hover:underline dark:text-sky-400">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/blog?page=1" className="text-sky-600 hover:underline dark:text-sky-400">
                  Blog index &amp; pagination
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
