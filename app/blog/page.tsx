'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/blog/blogData'
import AdSense from '@/components/AdSense'
import BlogImage from '@/components/BlogImage'
import { BookOpen, Clock, Calendar, User, Sparkles, ArrowRight } from 'lucide-react'
// [MIDDLEWARE] import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
// [MIDDLEWARE] import { incrementStep } from '@/app/services/api'
// [MIDDLEWARE] import { AdComponent } from '@/components/AdComponent'
import LazyLoad from '@/components/LazyLoad'

export default function BlogPage() {
  const [isNavigating, setIsNavigating] = useState(false)
  // [MIDDLEWARE] const { currentStep, setCurrentStep, sessionToken, shortCode } = useMiddlewareFlow()
  // Placeholders while middleware is commented out — remove these 4 lines to restore:
  const sessionToken = null
  const shortCode = null
  const currentStep = ''
  const setCurrentStep = (_step: string) => {}
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // Shuffle blog posts so order is random each time
  const shuffledPosts = useMemo(() => {
    const arr = [...blogPosts]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])

  // [MIDDLEWARE] Debug effect — commented out for AdSense review
  // useEffect(() => {
  //   if (sessionToken && shortCode) { console.log('📚 Blog page loaded with session') }
  // }, [])

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // [MIDDLEWARE] Scroll-on-timer + hidden 20s timer effects — commented out for AdSense review
  // Uncomment both useEffect blocks below to restore:
  // useEffect(() => {
  //   if (currentStep === 'blog-timer') window.scrollTo({ top: 0, behavior: 'smooth' })
  // }, [currentStep])
  // useEffect(() => {
  //   if (!sessionToken || !shortCode || currentStep !== 'blog-timer') return
  //   timerRef.current = setTimeout(async () => {
  //     setCurrentStep('blog-next')
  //     try { await incrementStep(sessionToken, shortCode) } catch {}
  //   }, 20000)
  //   return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  // }, [sessionToken, shortCode, currentStep])
  // [MIDDLEWARE END]

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
        {/* [MIDDLEWARE] Blog Timer + Ads section — commented out for AdSense review
        {sessionToken && shortCode && (currentStep === 'blog-timer' || currentStep === 'blog-next') && (
          <div className="w-full mb-8"> ... AdComponent + timer message ... </div>
        )}
        [MIDDLEWARE END] */}

        {/* Header */}
        {!sessionToken && (
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
        )}

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
          {shuffledPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -6 }}
            >
              <div>
                {/* [MIDDLEWARE] className ring/pulse removed — restore by adding:
                  className={`${sessionToken && shortCode && currentStep === 'blog-next' ? 'ring-4 ring-green-500 ...' : ''}`}
                */}
                <Link
                  href={`/blog/${post.slug}`}
                  // [MIDDLEWARE] onClick middleware handler removed — restore onClick with incrementStep + router.push
                  className="group block relative h-full"
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
