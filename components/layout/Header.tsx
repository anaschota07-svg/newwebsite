'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Tools', href: '/tools' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="SimpleWebToolsBox Home">
            <div className="relative h-8 w-8 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
              <Image src="/logo.png" alt="" fill className="object-contain p-0.5" priority sizes="32px" />
            </div>
            <span className="hidden text-sm font-semibold text-slate-900 sm:inline dark:text-white">
              SimpleWebToolsBox
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex md:items-center md:gap-1">
              {navigation.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href === '/blog' && pathname.startsWith('/blog')) ||
                  (item.href === '/tools' && pathname.startsWith('/tools'))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      active
                        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            <ThemeToggle className="shrink-0" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-slate-600 md:hidden dark:text-slate-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-slate-200 py-3 md:hidden dark:border-slate-800">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href === '/blog' && pathname.startsWith('/blog')) ||
                  (item.href === '/tools' && pathname.startsWith('/tools'))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      active ? 'bg-slate-100 dark:bg-slate-800' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
