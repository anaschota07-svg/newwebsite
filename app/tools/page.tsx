import { Metadata } from 'next'
import Link from 'next/link'
import { Wrench, ArrowRight, Sparkles, Shield } from 'lucide-react'
import { categories, toolsData } from '@/data/tools/toolsData'

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
    <div className="min-h-screen py-12 relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-20" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-white/80 dark:bg-slate-900/80 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">No install · Runs in your browser</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Free online tools, explained
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Each tool has its own page with original guidance: what it is for, how to get reliable results, and what it
            does <em>not</em> try to do. The interactive piece runs in your browser so you can try ideas quickly, while
            the long-form <Link href="/blog" className="text-cyan-600 dark:text-cyan-400 font-semibold underline-offset-2 hover:underline">articles</Link>{' '}
            cover related topics in more depth.
          </p>
        </header>

        <div className="mb-12 rounded-3xl border border-slate-200 bg-white/90 dark:border-slate-700 dark:bg-slate-900/80 p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-cyan-500/15 p-2">
              <Shield className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-2">How we publish tools</h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                We avoid empty “app-only” pages. You get written context on every tool route, a consistent privacy stance
                (data stays in your session for most utilities), and visible ownership through our{' '}
                <Link href="/about" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">
                  About
                </Link>
                ,{' '}
                <Link href="/editorial-policy" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">
                  Editorial policy
                </Link>
                , and policy pages in the footer. If a tool is not listed here, it is not part of the public library.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
          <Wrench className="h-4 w-4" />
          <span>{toolsData.length} tools in {categories.length} categories</span>
        </div>

        <div className="space-y-12">
          {byCategory.map((group) => (
            <section key={group.name} aria-labelledby={`cat-${group.name}`}>
              <h2
                id={`cat-${group.name}`}
                className="text-2xl font-black text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2"
              >
                {group.name}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {group.tools.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/70 shadow-sm transition-colors hover:border-cyan-500/50"
                    >
                      <div>
                        <span className="text-xl mr-2" aria-hidden>
                          {t.icon}
                        </span>
                        <span className="font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                          {t.name}
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{t.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-cyan-500 flex-shrink-0 transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
