'use client'

import Link from 'next/link'
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1])
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20])

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-0 w-full h-32 pointer-events-none z-40 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: theme === 'dark' 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: -150,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.header 
        style={{ 
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 shadow-lg dark:shadow-blue-500/5"
      >
        {/* Gradient Border Animation */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" aria-label="Top">
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: '100%',
                  opacity: 0 
                }}
                animate={{
                  y: '-100%',
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="flex h-16 items-center justify-between">
            {/* Logo with 3D Effect */}
            <motion.div 
              className="flex items-center relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* 3D Shadow Layers */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-md" />
                  
                  <motion.div 
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white font-bold text-xl shadow-2xl overflow-hidden"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'perspective(1000px)',
                    }}
                    whileHover={{ 
                      rotateY: 360,
                      rotateX: 10,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-transparent" />
                    
                    <Sparkles className="w-5 h-5 relative z-10" />
                    
                    {/* Animated Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-white/50"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>

                <motion.span 
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
                  whileHover={{ scale: 1.02 }}
                >
                  SimpleWebToolsBox
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation with 3D Tabs */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className="relative block"
                    >
                      <motion.div
                        className={`
                          relative px-4 py-2 rounded-lg text-sm font-medium
                          transition-all duration-300
                          ${isActive 
                            ? 'text-white dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                          }
                        `}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {/* Active Background with 3D Effect */}
                        {isActive && (
                          <>
                            {/* Glow Effect */}
                            <motion.div
                              className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-70 blur-lg"
                              layoutId="activeGlow"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                            
                            {/* Main Background */}
                            <motion.div
                              className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                              layoutId="activeBackground"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            >
                              {/* Glossy Overlay */}
                              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
                            </motion.div>

                            {/* Animated Particles */}
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                initial={{ 
                                  x: Math.random() * 100 - 50,
                                  y: Math.random() * 20,
                                  opacity: 0 
                                }}
                                animate={{
                                  y: -30,
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                }}
                              />
                            ))}
                          </>
                        )}

                        {/* Hover Effect for Non-Active Items */}
                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-white/5"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        <span className="relative z-10">{item.name}</span>
                      </motion.div>

                      {/* Bottom Indicator Line */}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                          layoutId="activeIndicator"
                          initial={{ x: '-50%' }}
                          animate={{ x: '-50%' }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle with 3D Animation */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="relative rounded-xl p-2.5 hover:bg-gray-100/80 dark:hover:bg-white/10 transition-colors group overflow-hidden"
                aria-label="Toggle theme"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all rounded-xl" />
                
                <motion.div
                  key={theme}
                  initial={{ rotateY: -180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 180, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative z-10"
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                  )}
                </motion.div>

                {/* Orbiting Ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl border border-blue-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>

              {/* Mobile menu button with 3D effect */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden relative rounded-xl p-2.5 hover:bg-gray-100/80 dark:hover:bg-white/10 transition-colors overflow-hidden"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 hover:from-blue-500/10 hover:to-purple-500/10 transition-all rounded-xl" />
                
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile menu with Glass Morphism */}
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="space-y-2 pb-4 pt-2">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <motion.div
                          className={`
                            relative rounded-xl px-4 py-3 text-base font-medium
                            transition-all duration-300 overflow-hidden
                            ${isActive
                              ? 'text-white'
                              : 'text-gray-700 dark:text-gray-300'
                            }
                          `}
                          whileTap={{ scale: 0.97 }}
                        >
                          {isActive && (
                            <>
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
                                layoutId="activeMobile"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                            </>
                          )}
                          
                          {!isActive && (
                            <div className="absolute inset-0 bg-gray-100/50 dark:bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
                          )}
                          
                          <span className="relative z-10 flex items-center justify-between">
                            {item.name}
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-white"
                              />
                            )}
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

        {/* Bottom Shimmer Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.header>
    </>
  )
}