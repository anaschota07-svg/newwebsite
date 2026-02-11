'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react'
import { BlogPost } from '@/data/blog/blogData'
import AdSense from '@/components/AdSense'
import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
import { GetLinkButton } from '@/components/GetLinkButton'
import { AdComponent } from '@/components/AdComponent'
import { StepTimer } from '@/components/StepTimer'

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
  const { currentStep, setCurrentStep, sessionToken, shortCode } = useMiddlewareFlow()

  // Debug + auto-fix step when coming from blog page
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📖 Blog detail page loaded:', {
        title: post.title,
        step: currentStep,
        sessionToken: sessionToken ? `${sessionToken.substring(0, 10)}...` : 'null',
        shortCode: shortCode || 'null',
      })
    }

    if (sessionToken && shortCode) {
      // If user just came from blog listing step, move into blog-detail-timer
      if (currentStep === 'blog-next') {
        setCurrentStep('blog-detail-timer')
      }
      // If context was reset, still ensure we move into blog-detail-timer
      else if (
        currentStep === 'popup' ||
        currentStep === 'captcha' ||
        currentStep === 'home-timer' ||
        currentStep === 'home-next' ||
        currentStep === 'blog-timer'
      ) {
        setCurrentStep('blog-detail-timer')
      }
    }
  }, [post.title, currentStep, sessionToken, shortCode, setCurrentStep])

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [post.slug])

  // Scroll to top when timer starts
  useEffect(() => {
    if (currentStep === 'blog-detail-timer') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  // Scroll to Get Link button when step changes to get-link
  useEffect(() => {
    if (currentStep === 'get-link') {
      setTimeout(() => {
        const getLinkSection = document.getElementById('get-link-section')
        if (getLinkSection) {
          getLinkSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 500)
    }
  }, [currentStep])

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-grid opacity-20" />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Middleware Flow Section - Blog Detail Timer with Ads */}
        {sessionToken && shortCode && (currentStep === 'blog-detail-timer' || currentStep === 'get-link') && (
          <div className="w-full mb-8">
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Ad 1 */}
              <div className="flex justify-center">
                <AdComponent
                  adSlotId="4686013446"
                  size="300x250"
                  style={{ display: 'inline-block', width: '300px', height: '250px' }}
                />
              </div>

              {/* Visible Timer */}
              {currentStep === 'blog-detail-timer' && (
                <div className="text-center py-2">
                  <StepTimer
                    duration={20}
                    onComplete={() => {
                      setCurrentStep('get-link')
                    }}
                    showContinueButton={false}
                  />
                </div>
              )}

              {/* Scroll instruction after timer */}
              {currentStep === 'get-link' && (
                <div className="w-full mb-2">
                  <div className="w-full mx-auto">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-lg shadow-lg text-center">
                      <p className="text-sm font-bold">
                        ↓ Scroll down to <span className="text-yellow-300">Get Link</span> button ↓
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Ad 2 */}
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
              <span className="font-semibold">{post.author}</span>
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

        <AdSense format="horizontal" />

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
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>
          </div>
        )}

        <AdSense format="horizontal" />

        {/* Conclusion */}
        <div className="relative rounded-3xl p-10 my-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 animate-gradient-shift" />
          <div className="absolute inset-0 pattern-dots opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4">Wrapping Up</h2>
            <p className="text-white/90 leading-relaxed text-lg">
              Hope this guide helped you! Explore more tutorials and try our free tools to level up your skills.
            </p>
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

        {/* Get Link Button Section - Bottom */}
        {sessionToken && shortCode && (
          <div id="get-link-section" className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
            {currentStep === 'get-link' && <GetLinkButton />}
          </div>
        )}
      </article>
    </div>
  )
}

