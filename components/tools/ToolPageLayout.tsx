import Link from 'next/link'
import { ArrowLeft, Wrench, BookOpen } from 'lucide-react'
import type { Tool } from '@/data/tools/toolsData'
import type { ToolNarrative } from '@/data/tools/toolNarratives'
import { ToolRunner } from '@/components/tools/ToolRunner'

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
    <div className="min-h-screen py-12 relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-20" />
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 font-semibold group transition-all"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            All tools
          </Link>
        </div>

        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400">
            <Wrench className="h-4 w-4" />
            {tool.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
            {tool.name}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-2">{tool.description}</p>
        </header>

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 dark:border-slate-700 dark:bg-slate-900/80 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            {first.heading}
          </h2>
          {first.body.split('\n\n').map((p, i) => (
            <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </section>

        <section className="mb-12" aria-label={`${tool.name} app`}>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Use the tool</h2>
          <ToolRunner slug={tool.slug} />
        </section>

        <div className="space-y-8 mb-12">
          {rest.map((section) => (
            <section
              key={section.heading}
              className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 dark:border-slate-700 dark:bg-slate-900/80 shadow-sm"
            >
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                {section.heading}
              </h2>
              {section.body.split('\n\n').map((p, i) => (
                <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <section className="relative rounded-3xl p-8 overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700" />
          <div className="absolute inset-0 pattern-dots opacity-10" />
          <div className="relative z-10 text-center">
            <BookOpen className="h-10 w-10 text-white/90 mx-auto mb-3" />
            <h2 className="text-2xl font-black text-white mb-2">Related reading</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto text-sm sm:text-base">
              Explore long-form guides on this site for deeper context in technology, study habits, and finance—written
              to complement the free tools library.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-bold text-blue-600 shadow-lg hover:bg-slate-50 transition-colors"
            >
              Browse articles
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
