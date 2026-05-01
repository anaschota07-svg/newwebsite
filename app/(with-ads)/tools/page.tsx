import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Wrench, Shield } from 'lucide-react'
import { categories, toolsData } from '@/data/tools/toolsData'
import { PageKicker } from '@/components/PageKicker'

export const metadata: Metadata = {
  title: 'Free online tools for everyday work',
  description:
    'Browse SimpleWebToolsBox free browser-based calculators, text utilities, developer helpers, and design tools. Each page explains how to use the tool, privacy expectations, and common limits—plus links to in-depth articles.',
  openGraph: {
    title: 'Free online tools | SimpleWebToolsBox',
    description:
      'Free browser-based tools with clear how-to text on every page: calculators, text utilities, developer helpers, and more.',
    url: 'https://simplewebtoolsbox.com/tools',
  },
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/tools',
  },
}

export default function ToolsIndexPage() {
  const byCategory = categories
    .sort((a, b) => a.localeCompare(b))
    .map((cat) => ({
      name: cat,
      tools: toolsData.filter((t) => t.category === cat).sort((a, b) => a.name.localeCompare(b.name)),
    }))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="max-w-2xl border-b border-slate-200 pb-8 dark:border-slate-800">
        <PageKicker icon={Wrench} label="Tools" />
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Browser tools
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Every tool has its own page with guidance and limits. Prefer reading first? Start with our{' '}
          <Link href="/blog" className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400">
            blog
          </Link>
          .
        </p>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
          {toolsData.length} tools · {categories.length} categories
        </p>
      </header>

      <section
        className="mt-10 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
        aria-labelledby="publish-heading"
      >
        <div className="flex gap-4">
          <Shield className="h-6 w-6 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
          <div>
            <h2 id="publish-heading" className="font-semibold text-slate-900 dark:text-white">
              How we publish
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Owned descriptions, transparent{' '}
              <Link href="/about" className="font-medium text-sky-600 hover:underline dark:text-sky-400">
                about
              </Link>{' '}
              &amp;{' '}
              <Link href="/editorial-policy" className="font-medium text-sky-600 hover:underline dark:text-sky-400">
                editorial
              </Link>{' '}
              links, and footer policies. If it is not listed here, it is not part of the public library.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 space-y-10">
        {byCategory.map((group) => (
          <section key={group.name} aria-labelledby={`cat-${group.name}`}>
            <h2
              id={`cat-${group.name}`}
              className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900 dark:border-slate-800 dark:text-white"
            >
              {group.name}
            </h2>
            <ul className="mt-4 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.tools.map((t) => (
                <li key={t.id} className="flex min-h-0">
                  <Link
                    href={`/tools/${t.slug}`}
                    className="group flex h-full min-h-[7rem] w-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xl leading-none" aria-hidden>
                        {t.icon}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-sky-500 dark:text-slate-500"
                        aria-hidden
                      />
                    </div>
                    <span className="mt-3 font-medium text-slate-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                      {t.name}
                    </span>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-snug text-slate-600 dark:text-slate-400">
                      {t.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
