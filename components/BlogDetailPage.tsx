'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, User, Code2 } from 'lucide-react'
import { BlogPost, normalizeBlogAuthor } from '@/data/blog/blogData'
import { MarkdownContent } from './MarkdownContent'

interface BlogSection {
  heading: string
  content: string
  image?: string
}

interface BlogDetailPageProps {
  post: BlogPost
  content?: { sections: BlogSection[] }
  relatedPosts: BlogPost[]
}

export function BlogDetailPage({ post, content, relatedPosts }: BlogDetailPageProps) {
  const displayAuthor = normalizeBlogAuthor(post.author)

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [post.slug])

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-grid opacity-20" />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <div className="mb-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 font-semibold group transition-all"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-3xl mb-8 overflow-hidden">
          {post.image.startsWith('http') ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 animate-gradient-shift" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-sm font-bold gradient-text">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-semibold">{displayAuthor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Post Content */}
        {content && (
          <div className="my-12">
            <div className="glass rounded-3xl p-8 sm:p-12 border border-white/10 space-y-12">
              {content.sections.map((section, index) => (
                <section key={index} className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
                    {section.heading}
                  </h2>
                  {section.image && (
                    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={section.image}
                        alt={section.heading}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  )}
                  <MarkdownContent content={section.content} />
                </section>
              ))}
            </div>
          </div>
        )}

        {/* Conclusion */}
        <div className="relative rounded-3xl p-10 my-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 animate-gradient-shift" />
          <div className="absolute inset-0 pattern-dots opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4">Wrapping Up</h2>
            <p className="text-white/90 leading-relaxed text-lg">
              Hope this guide helped you! Explore the other published articles for more practical, clearly explained resources.
            </p>
          </div>
        </div>

        {/* Author Bio Card */}
        <div className="my-12 glass rounded-3xl p-8 border border-white/10">
          <h2 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">About the Author</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black text-white">ST</span>
              </div>
            </div>
            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Mohd Washid</h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                  Founder & Editor
                </span>
              </div>
              <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Flutter Developer & Web Publisher
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Mohd Washid writes and reviews the guides published on SimpleWebToolsBox, focusing on practical explanations, digital literacy, and straightforward articles that help readers solve real problems quickly.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-600 transition-all"
                  aria-label="Learn more about Mohd Washid"
                >
                  <span className="text-lg">🔗</span>
                  About
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all"
                  aria-label="Contact SimpleWebToolsBox"
                >
                  <span className="text-lg">💼</span>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">More to Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="hover:-translate-y-1 transition-transform duration-200">
                  <Link href={`/blog/${relatedPost.slug}`} className="group block relative h-full">
                    <div className="glass rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all h-full">
                      <div className="relative h-48 overflow-hidden">
                        {relatedPost.image.startsWith('http') ? (
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="50vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-3 inline-block">
                          {relatedPost.category}
                        </span>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 transition-all line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{relatedPost.readTime}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 rounded-3xl blur-xl transition-all -z-10" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </article>
    </div>
  )
}
