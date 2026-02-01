import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog/blogData'
import AdPlaceholder from '@/components/AdPlaceholder'
import BlogImage from '@/components/BlogImage'
import { BookOpen, TrendingUp, Clock, Calendar, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How-To Guides & Tutorials',
  description: 'Learn from our expert how-to guides and tutorials covering various topics including technology, health, productivity, and more.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6 transition-colors duration-300">
            <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            How-To Guides & Tutorials
          </h3>
        
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>{blogPosts.length} Tutorials</span>
            </div>
            
          </div>
        </div>

        {/* <AdPlaceholder format="horizontal" /> */}

        {/* All Articles Grid */}
        <section className="mb-12" aria-labelledby="all-tutorials-heading">
          <h2 id="all-tutorials-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">
            All Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {blogPosts.map((post) => (
              <article key={post.id} role="listitem">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 block"
                  aria-label={`Read article: ${post.title}`}
                >
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                  <BlogImage
                    src={post.image}
                    alt={`${post.title} - ${post.description}`}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium transition-colors duration-300">
                      {post.category}
                    </span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 transition-colors duration-300">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <AdPlaceholder format="horizontal" />
      </div>
    </div>
  )
}
