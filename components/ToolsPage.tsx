'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toolsData, categories } from '@/data/tools/toolsData'
import AdSense from '@/components/AdSense'
import SearchBar from '@/components/SearchBar'
import { ArrowRight, Sparkles, Filter } from 'lucide-react'
import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
import { incrementStep } from '@/app/services/api'
import { AdComponent } from '@/components/AdComponent'

export function ToolsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tools')
  const [isNavigating, setIsNavigating] = useState(false)
  const { currentStep, setCurrentStep, sessionToken, shortCode } = useMiddlewareFlow()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const filteredTools = selectedCategory === 'All Tools'
    ? toolsData
    : toolsData.filter(tool => tool.category === selectedCategory)

  // Debug: Log when tools page loads with session
  useEffect(() => {
    if (sessionToken && shortCode) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Tools page loaded with session:', {
          step: currentStep,
          hasSession: !!sessionToken,
          hasShortCode: !!shortCode
        })
      }
    }
  }, [])

  // If user comes back from tool detail page and we have session, restore tools-next step
  useEffect(() => {
    if (sessionToken && shortCode && currentStep === 'tool-detail-timer') {
      // User came back, restore highlighting
      setCurrentStep('tools-next')
    }
  }, [sessionToken, shortCode, currentStep, setCurrentStep])

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // If user comes back from tool detail page, restore tools-next step for highlighting
  useEffect(() => {
    if (sessionToken && shortCode) {
      // If step is tool-detail-timer or tool-detail-continue or get-link, restore to tools-next
      if (currentStep === 'tool-detail-timer' || currentStep === 'tool-detail-continue' || currentStep === 'get-link') {
        setCurrentStep('tools-next')
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Restored tools-next step for highlighting')
        }
      }
    }
  }, [sessionToken, shortCode, currentStep, setCurrentStep])

  // Scroll to top when step changes to tools-timer
  useEffect(() => {
    if (currentStep === 'tools-timer') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  // Hidden timer that runs in background for tools-timer step
  useEffect(() => {
    if (!sessionToken || !shortCode || currentStep !== 'tools-timer') {
      if (process.env.NODE_ENV === 'development' && timerRef.current) {
        console.log('⚠️ Tools timer cleared - conditions not met')
      }
      return
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current)
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Clearing previous tools timer')
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('⏰ Starting tools timer - 20 seconds countdown...')
    }

    timerRef.current = setTimeout(async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('⏱️ Tools timer FINISHED (20s) - Moving to tools-next...')
      }
      
      // IMPORTANT: Change step FIRST (don't wait for backend)
      setCurrentStep('tools-next')
      if (process.env.NODE_ENV === 'development') {
        console.log('💾 Step changed to: tools-next')
      }
      
      // Then try to update backend (non-blocking)
      try {
        const result = await incrementStep(sessionToken, shortCode)
        if (process.env.NODE_ENV === 'development') {
          if (result.success) {
            console.log('✅ Backend step incremented successfully')
          } else {
            console.warn('⚠️ Backend increment failed (non-blocking):', result.error)
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Backend increment error (non-blocking):', error)
        }
      }
    }, 20000) // 20 seconds

    return () => {
      if (timerRef.current) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🧹 Cleaning up tools timer')
        }
        clearTimeout(timerRef.current)
      }
    }
  }, [sessionToken, shortCode, currentStep])

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Loading Overlay when navigating to tool */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-white font-bold text-lg">Loading Tool...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-20" />
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Middleware Flow Section - Tools Timer with Ads */}
        {sessionToken && shortCode && (currentStep === 'tools-timer' || currentStep === 'tools-next') && (
          <div className="w-full mb-8">
            <div className="max-w-4xl mx-auto">
              {/* Ad 1 */}
              <div className="w-full mb-4">
                <AdComponent
                  adSlotId="4590814170"
                  size="responsive"
                  className="w-full"
                />
              </div>

              {/* Rainbow Message - Shows during timer, hides after 20 seconds */}
              {currentStep === 'tools-timer' && (
                <div className="text-center py-2 mb-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex flex-col items-center gap-1"
                  >
                    {/* Main Content Box */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(239, 68, 68, 0.6)',
                          '0 0 25px rgba(234, 179, 8, 0.6)',
                          '0 0 25px rgba(34, 197, 94, 0.6)',
                          '0 0 25px rgba(59, 130, 246, 0.6)',
                          '0 0 25px rgba(168, 85, 247, 0.6)',
                          '0 0 20px rgba(239, 68, 68, 0.6)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="relative px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 overflow-visible"
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        animate={{
                          x: [-100, 200],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />

                      {/* Text with Inline Thumbs */}
                      <motion.div
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                        }}
                        className="relative z-10 flex items-center justify-center gap-2 text-sm font-bold text-white drop-shadow-lg"
                      >
                        {/* Top Thumb */}
                        <motion.span
                          animate={{
                            y: [-2, 2, -2],
                            rotate: [0, 10, 0],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2,
                          }}
                          className="text-lg"
                        >
                          👆
                        </motion.span>

                        <span>Click on Ads & Return to Continue!</span>

                        {/* Bottom Thumb */}
                        <motion.span
                          animate={{
                            y: [2, -2, 2],
                            rotate: [0, -10, 0],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.4,
                          }}
                          className="text-lg"
                        >
                          👇
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Instruction after timer completes */}
              {currentStep === 'tools-next' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-4"
                >
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                    ↓ Scroll down and click a tool to continue ↓
                  </p>
                </motion.div>
              )}

              {/* Ad 2 - Remains visible after timer */}
              <div className="w-full">
                <AdComponent
                  adSlotId="4590814170"
                  size="responsive"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-bold gradient-text">Tool Collection</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-black dark:text-white mb-4 ">
            All <span className="gradient-text text-black dark:gradient-text">Tools</span>
          </h1>
          <p className="text-lg text-slate-900 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            {toolsData.length} powerful tools, zero setup required
          </p>
          
          {/* Search Bar - Hide with session */}
          {!sessionToken && (
            <div className="flex justify-center">
              <SearchBar />
            </div>
          )}
        </motion.div>

        {!sessionToken && <AdSense format="horizontal" />}

        {/* Categories - Pill Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-slate-900 dark:text-slate-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-slate-300">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={() => setSelectedCategory('All Tools')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                selectedCategory === 'All Tools'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'glass border border-white/10 text-slate-900 dark:text-slate-300 hover:border-cyan-500/50'
              }`}
            >
              All Tools
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'glass border border-white/10 text-slate-900 dark:text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredTools.length > 0 ? (
              filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.2,
                    delay: index * 0.03,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -4 }}
                  className={`${sessionToken && shortCode && currentStep === 'tools-next'
                    ? 'ring-4 ring-green-500 dark:ring-green-400 shadow-xl animate-pulse'
                    : ''
                  }`}
                >
                  <Link
                    href={`/tools/${tool.slug}`}
                    onClick={async (e) => {
                      // If in middleware flow and on tools-next step, handle navigation
                      if (sessionToken && shortCode && currentStep === 'tools-next') {
                        e.preventDefault()
                        setIsNavigating(true)

                        if (process.env.NODE_ENV === 'development') {
                          console.log('✅ Tool clicked - Moving to tool-detail-timer')
                        }

                        // Set step FIRST (don't wait for backend)
                        setCurrentStep('tool-detail-timer')
                        
                        // Update backend in background (non-blocking)
                        incrementStep(sessionToken, shortCode).then(result => {
                          if (process.env.NODE_ENV === 'development') {
                            if (result.success) {
                              console.log('✅ Backend step incremented')
                            } else {
                              console.warn('⚠️ Backend increment failed (non-blocking):', result.error)
                            }
                          }
                        }).catch(error => {
                          if (process.env.NODE_ENV === 'development') {
                            console.warn('⚠️ Backend error (non-blocking):', error)
                          }
                        })
                        
                        // Small delay to ensure state is saved to localStorage
                        await new Promise(resolve => setTimeout(resolve, 100))
                        
                        // Navigate to tool page
                        router.push(`/tools/${tool.slug}`)
                      }
                    }}
                    className={`group block relative h-full ${sessionToken && shortCode && currentStep === 'tools-next'
                      ? 'hover:scale-105 transition-transform cursor-pointer'
                      : ''
                    }`}
                  >
                    <div className="glass rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all h-full">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="text-5xl p-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all"
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tool.icon}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-black  dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 transition-all">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-slate-900 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full glass border border-cyan-500/30">
                              {tool.category}
                            </span>
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 rounded-3xl blur-xl transition-all -z-10" />
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="glass rounded-3xl p-12 border border-white/10 max-w-md mx-auto">
                  <p className="text-slate-900 dark:text-slate-400 text-lg font-semibold">
                    No tools found in this category
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {!sessionToken && <AdSense format="horizontal" />}
      </div>
    </div>
  )
}
