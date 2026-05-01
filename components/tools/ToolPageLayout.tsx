import Link from 'next/link'
import { ArrowLeft, BookOpen, Wrench } from 'lucide-react'
import type { Tool } from '@/data/tools/toolsData'
import type { ToolNarrative } from '@/data/tools/toolNarratives'
import { ToolRunner } from '@/components/tools/ToolRunner'
import { PageKicker } from '@/components/PageKicker'

type Props = {
  tool: Tool
  narrative: ToolNarrative
}

export function ToolPageLayout({ tool, narrative }: Props) {
  const [first, ...rest] = narrative.sections
  if (!first) {
    return null
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        All tools
      </Link>

      <header className="mt-8 border-b border-slate-200 pb-8 dark:border-slate-800">
        <PageKicker icon={Wrench} label={tool.category} />
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {tool.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">{tool.description}</p>
      </header>

      <section
        className="mt-10 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
        aria-labelledby="tool-intro-heading"
      >
        <h2 id="tool-intro-heading" className="text-lg font-semibold text-slate-900 dark:text-white">
          {first.heading}
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-[15px]">
          {first.body.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-label={`Use ${tool.name}`}>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Use the tool</h2>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <ToolRunner slug={tool.slug} />
        </div>
      </section>

      {rest.length > 0 ? (
        <div className="mt-10 space-y-8">
          {rest.map((section) => (
            <section
              key={section.heading}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-[15px]">
                {section.body.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}

      <aside
        className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/80"
        aria-labelledby="related-reading-heading"
      >
        <div className="flex gap-4">
          <BookOpen className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
          <div>
            <h2 id="related-reading-heading" className="font-semibold text-slate-900 dark:text-white">
              Related reading
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Guides on security, productivity, finance, and the web—written to complement the tools library.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
            >
              Browse articles
            </Link>
          </div>
        </div>
      </aside>
    </article>
  )
}
