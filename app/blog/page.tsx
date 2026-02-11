'use client'

import { useState, useEffect, useRef } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/blog/blogData'
import AdSense from '@/components/AdSense'
import BlogImage from '@/components/BlogImage'
import { BookOpen, Clock, Calendar, User, Sparkles, ArrowRight } from 'lucide-react'
import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
import { incrementStep } from '@/app/services/api'
import { AdComponent } from '@/components/AdComponent'
import LazyLoad from '@/components/LazyLoad'

export default function BlogPage() {
  const [isNavigating, setIsNavigating] = useState(false)
  const { currentStep, setCurrentStep, sessionToken, shortCode } = useMiddlewareFlow()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // Debug: Log when blog page loads with session
  useEffect(() => {
    if (sessionToken && shortCode) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📚 Blog page loaded with session:', {
          step: currentStep,
          hasSession: !!sessionToken,
          hasShortCode: !!shortCode
        })
      }
    }
  }, [])

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Scroll to top when step changes to blog-timer
  useEffect(() => {
    if (currentStep === 'blog-timer') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  // Hidden timer that runs in background for blog-timer step
  useEffect(() => {
    if (!sessionToken || !shortCode || currentStep !== 'blog-timer') {
      if (process.env.NODE_ENV === 'development' && timerRef.current) {
        console.log('⚠️ Blog timer cleared - conditions not met')
      }
      return
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current)
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Clearing previous blog timer')
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('⏰ Starting blog timer - 20 seconds countdown...')
    }

    timerRef.current = setTimeout(async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('⏱️ Blog timer FINISHED (20s) - Moving to blog-next...')
      }
      
      // IMPORTANT: Change step FIRST (don't wait for backend)
      setCurrentStep('blog-next')
      if (process.env.NODE_ENV === 'development') {
        console.log('💾 Step changed to: blog-next')
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
          console.log('🧹 Cleaning up blog timer')
        }
        clearTimeout(timerRef.current)
      }
    }
  }, [sessionToken, shortCode, currentStep])

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pattern-grid opacity-20" />
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      {/* Loading Overlay when navigating to blog post */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-white font-bold text-lg">Loading Article...</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Middleware Flow Section - Blog Timer with Ads */}
        {sessionToken && shortCode && (currentStep === 'blog-timer' || currentStep === 'blog-next') && (
          <div className="w-full mb-8">
            <div className="max-w-4xl mx-auto">
              {/* Ad 1 */}
              <div className="flex justify-center">
                <AdComponent
                  adSlotId="4686013446"
                  size="300x250"
                  style={{ display: 'inline-block', width: '300px', height: '250px' }}
                />
              </div>

              {/* Rainbow Message - Shows during timer, hides after 20 seconds */}
              {currentStep === 'blog-timer' && (
                <div className="text-center py-2 mb-4">
                  <div className="inline-flex flex-col items-center gap-1">
                    {/* Main Content Box */}
                    <div className="relative px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 overflow-visible">
                      {/* Text with Inline Thumbs */}
                      <div className="relative z-10 flex items-center justify-center gap-2 text-sm font-bold text-white drop-shadow-lg">
                        <span className="text-lg">👆</span>
                        <span>Click on Ads & Return to Continue!</span>
                        <span className="text-lg">👇</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Instruction after timer completes */}
              {currentStep === 'blog-next' && (
                <div className="text-center mb-4">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                    ↓ Scroll down and click an article to continue ↓
                  </p>
                </div>
              )}

              {/* Ad 2 - Remains visible after timer */}
              <div className="flex justify-center">
                <AdComponent
                  adSlotId="4686013446"
                  size="300x250"
                  style={{ display: 'inline-block', width: '300px', height: '250px' }}
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
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <BookOpen className="h-8 w-8 text-white" />
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white mb-4">
            How-To <span className="gradient-text">Guides</span>
          </h1>
          <p className="text-lg text-slate-900 dark:text-slate-400 max-w-2xl mx-auto">
            {blogPosts.length} expert tutorials to level up your skills
          </p>
        </motion.div>

        {/* All Articles Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -6 }}
            >
              <div
                className={`${sessionToken && shortCode && currentStep === 'blog-next'
                  ? 'ring-4 ring-green-500 dark:ring-green-400 shadow-xl animate-pulse'
                  : ''
                }`}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={async (e) => {
                    // If in middleware flow and on blog-next step, handle navigation
                    if (sessionToken && shortCode && currentStep === 'blog-next') {
                      e.preventDefault()
                      setIsNavigating(true)

                      if (process.env.NODE_ENV === 'development') {
                        console.log('✅ Blog post clicked - Moving to blog-detail-timer')
                      }

                      // Set step FIRST (don't wait for backend)
                      setCurrentStep('blog-detail-timer')
                      
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
                      
                      // Navigate to blog post page
                      router.push(`/blog/${post.slug}`)
                    }
                  }}
                  className={`group block relative h-full ${sessionToken && shortCode && currentStep === 'blog-next'
                    ? 'hover:scale-105 transition-transform cursor-pointer'
                    : ''
                  }`}
                  aria-label={`Read: ${post.title}`}
                >
                <div className="glass rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <BlogImage
                      src={post.image}
                      alt={post.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-white/90 text-xs font-semibold">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-900 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1">
                      {post.description}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 font-medium pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-3xl blur-xl transition-all -z-10" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {!sessionToken && <AdSense format="horizontal" />}
      </div>
    </div>
  )
}
