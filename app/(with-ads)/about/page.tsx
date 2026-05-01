import Link from 'next/link'
import { ArrowRight, BookOpen, Mail, Shield, Info, Target, Wrench } from 'lucide-react'
import { PageKicker } from '@/components/PageKicker'

const offerings = [
  { title: 'Calculators', desc: 'Age, BMI, loan, date, and unit tools with how-to text on each page.' },
  { title: 'Text & data', desc: 'Case conversion, word count, JSON, Base64, CSV, and similar utilities.' },
  { title: 'Security & dev', desc: 'Password and hash helpers, encoders, minifiers, and small dev aids.' },
  { title: 'Design & productivity', desc: 'Color, shadows, timers, QR codes, and other quick tasks in the browser.' },
]

const values = [
  { title: 'Free to use', desc: 'No paywall for the public tool library; policies explain scope and limits.' },
  { title: 'Privacy-minded', desc: 'Most tools run locally in your session; see each page for specifics.' },
  { title: 'Readable pages', desc: 'Tool routes include context, not only a blank widget.' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="border-b border-slate-200 pb-10 dark:border-slate-800">
        <PageKicker icon={Info} label="About" />
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          SimpleWebToolsBox
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          A small publisher site: free browser tools plus long-form guides. Clear ownership, contact, and policy pages
          are always linked in the header and footer.
        </p>
      </header>

      <section className="mt-10 space-y-4 text-slate-700 dark:text-slate-300" aria-labelledby="mission-heading">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <Target className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
          <h2 id="mission-heading" className="text-lg font-semibold">
            Mission
          </h2>
        </div>
        <p className="leading-relaxed">
          We publish practical articles and tools that help people complete everyday tasks without installing heavy
          software. Each tool page explains what the output means and when to seek professional advice.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="offer-heading">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <Wrench className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
          <h2 id="offer-heading" className="text-lg font-semibold">
            What we offer
          </h2>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {offerings.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-lg font-semibold text-slate-900 dark:text-white">
          Values
        </h2>
        <ul className="mt-4 space-y-3">
          {values.map((v) => (
            <li
              key={v.title}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <p className="font-medium text-slate-900 dark:text-white">{v.title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{v.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mt-12 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        aria-labelledby="editorial-heading"
      >
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
          <h2 id="editorial-heading" className="text-lg font-semibold">
            Editorial standards
          </h2>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Content is written for real tasks, reviewed before publication, and updated when guidance goes stale. We avoid
          scraped filler and unclear authorship. See the{' '}
          <Link href="/editorial-policy" className="font-medium text-sky-600 hover:underline dark:text-sky-400">
            editorial policy
          </Link>{' '}
          for detail.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Publisher</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-white">SimpleWebToolsBox Team</strong> — builds and maintains the
          site. For suggestions, corrections, or partnerships, use{' '}
          <Link href="/contact" className="font-medium text-sky-600 hover:underline dark:text-sky-400">
            contact
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            Blog
            <ArrowRight className="h-4 w-4 opacity-70" aria-hidden />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email us
          </Link>
        </div>
      </section>
    </div>
  )
}
