'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/tools' },
  { name: 'How-To', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/10"
    >
      
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Futuristic */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="SimpleWebToolsBox Home">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden border border-white/20">
                <Image
                  src="/logo.png"
                  alt="SimpleWebToolsBox"
                  fill
                  className="object-contain"
                  priority
                  sizes="44px"
                />
              </div>
            </div>

            <div className="hidden sm:block">
              <span className="text-xl font-black gradient-text tracking-tight">
                SimpleWebToolsBox
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Minimalistic Pills */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              
              return (
                <Link key={item.name} href={item.href}>
                  <div className="relative px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all">
                    {isActive ? (
                      <>
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
                          }}
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                        <span className="relative z-10 text-white flex items-center gap-1.5">
                          {item.name}
                          <Sparkles className="w-3 h-3" />
                        </span>
                      </>
                    ) : (
                      <span className="relative z-10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                        {item.name}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full glass border border-transparent hover:border-cyan-400 transition-all"
              aria-label="Toggle menu"
            >
              <div className="transition-transform duration-200">
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Glass Effect */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2 pt-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <div key={item.name}>
                    <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <div className="relative rounded-2xl px-4 py-3 text-base font-semibold overflow-hidden transition-all">
                        {isActive && (
                          <>
                            <div
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                          </>
                        )}
                        
                        <span className={`relative z-10 flex items-center justify-between ${
                          isActive ? 'text-white' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {item.name}
                          {isActive && <Sparkles className="w-4 h-4" />}
                        </span>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}