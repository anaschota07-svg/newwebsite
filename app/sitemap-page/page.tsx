import { Metadata } from 'next'
import Link from 'next/link'
import { toolsData } from '@/data/tools/toolsData'
import { blogPosts } from '@/data/blog/blogData'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Complete sitemap of SimpleWebToolsBox — all tools, guides, and pages in one place.',
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/sitemap-page',
  },
}

export default function SitemapPage() {
  // Group tools by category
  const toolsByCategory = toolsData.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = []
    acc[tool.category].push(tool)
    return acc
  }, {} as Record<string, typeof toolsData>)

  // Group blog posts by category
  const postsByCategory = blogPosts.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = []
    acc[post.category].push(post)
    return acc
  }, {} as Record<string, typeof blogPosts>)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Sitemap</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          All pages on SimpleWebToolsBox — {toolsData.length} tools, {blogPosts.length} guides, and more.
        </p>

        <div className="space-y-10">

          {/* Main Pages */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-slate-700">
              📄 Main Pages
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'All Tools', href: '/tools' },
                { name: 'How-To Guides', href: '/blog' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms-conditions' },
                { name: 'Disclaimer', href: '/disclaimer' },
                { name: 'Editorial Policy', href: '/editorial-policy' },
                { name: 'DMCA Policy', href: '/dmca' },
              ].map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline font-medium"
                  >
                    <span className="text-gray-400">→</span>
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Tools by Category */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-slate-700">
              🛠 Tools ({toolsData.length} total)
            </h2>
            <div className="space-y-8">
              {Object.entries(toolsByCategory).map(([category, tools]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <span className="w-2 h-5 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full inline-block" />
                    {category} ({tools.length})
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ml-4">
                    {tools.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline text-sm"
                        >
                          <span className="text-gray-400 text-xs">→</span>
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Blog Posts by Category */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-slate-700">
              📚 How-To Guides ({blogPosts.length} total)
            </h2>
            <div className="space-y-8">
              {Object.entries(postsByCategory).map(([category, posts]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <span className="w-2 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full inline-block" />
                    {category} ({posts.length})
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                    {posts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-start gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:underline text-sm"
                        >
                          <span className="text-gray-400 text-xs mt-0.5">→</span>
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
