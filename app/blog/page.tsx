'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/blog/blogData'
import AdSense from '@/components/AdSense'
import BlogImage from '@/components/BlogImage'
import { BookOpen, Clock, Calendar, User, Sparkles, ArrowRight } from 'lucide-react'

export default function BlogPage() {
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
              <Link
                href={`/blog/${post.slug}`}
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
            </motion.article>
          ))}
        </motion.div>

        <AdSense format="horizontal" />
      </div>
    </div>
  )
}
