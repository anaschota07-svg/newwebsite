import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy-policy' },
    { name: 'Terms', href: '/terms-conditions' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Editorial policy', href: '/editorial-policy' },
    { name: 'DMCA', href: '/dmca' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <span className="relative h-8 w-8 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
                <Image src="/logo.png" alt="" fill className="object-contain p-0.5" sizes="32px" />
              </span>
              SimpleWebToolsBox
            </Link>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Guides and small browser tools, with straightforward policies.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Site</p>
              <ul className="mt-3 space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-slate-700 underline decoration-slate-400/60 underline-offset-2 hover:text-sky-700 hover:decoration-sky-600 dark:text-slate-200 dark:decoration-slate-500/70 dark:hover:text-sky-300 dark:hover:decoration-sky-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Legal</p>
              <ul className="mt-3 space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-slate-700 underline decoration-slate-400/60 underline-offset-2 hover:text-sky-700 hover:decoration-sky-600 dark:text-slate-200 dark:decoration-slate-500/70 dark:hover:text-sky-300 dark:hover:decoration-sky-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-500">
          © {new Date().getFullYear()} SimpleWebToolsBox
        </p>
      </div>
    </footer>
  )
}
