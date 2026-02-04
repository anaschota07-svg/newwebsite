'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Moon, Sun, Menu, X, Sparkles } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/tools' },
  { name: 'How-To', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 100], [0, -2])
  const headerBlur = useTransform(scrollY, [0, 50], [0, 16])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.header 
      style={{ 
        y: headerY,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
      className="sticky top-0 z-50 w-full glass border-b border-white/10"
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #06b6d4, #3b82f6, #a855f7, #ec4899, transparent)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Futuristic */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="SimpleWebToolsBox Home">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
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
            </motion.div>

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
                  <motion.div
                    className="relative px-4 py-2 rounded-full text-sm font-semibold cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive ? (
                      <>
                        <motion.div
                          layoutId="navPill"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"
                        />
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
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle - Futuristic */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2.5 rounded-full glass hover:border-cyan-400 dark:hover:border-purple-400 border border-transparent transition-all group"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 rounded-full transition-all" />
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </motion.div>
            </motion.button>

            {/* Mobile Menu */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2.5 rounded-full glass border border-transparent hover:border-cyan-400 transition-all"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Glass Effect */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2 pt-2">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <motion.div
                        className="relative rounded-2xl px-4 py-3 text-base font-semibold overflow-hidden"
                        whileTap={{ scale: 0.97 }}
                      >
                        {isActive && (
                          <>
                            <motion.div
                              layoutId="mobilePill"
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
                              }}
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}