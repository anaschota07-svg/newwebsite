import Link from 'next/link'
import { ArrowRight, Shield, Sparkles, FileText, Layers, Award, Globe } from 'lucide-react'
import { blogPosts } from '@/data/blog/blogData'
import BlogImage from '@/components/BlogImage'

export function HomePageContent() {
    const publishedBlogs = [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const featuredGuides = publishedBlogs.slice(0, 4)

    const realStats = {
        guides: publishedBlogs.length,
        categories: new Set(publishedBlogs.map(t => t.category)).size,
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
            <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to main content
            </a>

            {/* Hero Section */}
            <section
                id="main-content"
                className="relative overflow-hidden py-20 sm:py-32"
                aria-label="Hero section"
            >
                <div className="absolute inset-0">
                    <div className="absolute top-12 left-6 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />
                    <div className="absolute bottom-12 right-6 h-48 w-48 rounded-full bg-purple-500/10 blur-2xl" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-white px-5 py-2.5 shadow-sm dark:bg-slate-900 mb-8">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                            <span className="text-sm font-black bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Practical Guides & Resources</span>
                            <Sparkles className="w-4 h-4 text-purple-500" />
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1]">
                            <span className="text-slate-900 dark:text-white drop-shadow-sm">Focused Guides</span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                Real Resources
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                            Explore <span className="font-black text-purple-600 dark:text-purple-400">{realStats.guides}</span> practical guides across finance, study, and technology, written to be useful, readable, and easy to trust.
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                            The site focuses on original guides, clear ownership, and practical explanations instead of cluttered directory-style content.
                        </p>

                        <div className="flex justify-center mb-16">
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-sm transition-colors hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-purple-500"
                            >
                                <FileText className="w-5 h-5" />
                                Read Guides
                                <ArrowRight className="w-4 h-4 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {[
                                { icon: FileText, value: realStats.guides, label: 'Articles', gradient: 'from-blue-500 to-purple-500', bg: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' },
                                { icon: Layers, value: realStats.categories, label: 'Categories', gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
                            ].map((stat, index) => (
                                <div key={index} className="relative">
                                    <div className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 border-2 border-white/60 dark:border-slate-700/60 shadow-lg`}>
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 mx-auto shadow-lg`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 relative" aria-labelledby="reviewed-guides-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white px-5 py-2.5 shadow-sm dark:bg-slate-900 mb-6">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Reviewed Guides</span>
                        </div>
                        <h2 id="reviewed-guides-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            Focused <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Core Content</span>
                        </h2>
                        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                            Start with the latest published guides across the main topics covered on the site.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {featuredGuides.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group block relative h-full"
                                aria-label={`Read: ${post.title}`}
                            >
                                <div className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-lg transition-colors group-hover:border-blue-500 dark:border-slate-700 dark:bg-slate-900">
                                    <div className="relative h-48 overflow-hidden">
                                        <BlogImage
                                            src={post.image}
                                            alt={post.title}
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                            <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                                                {post.category}
                                            </span>
                                            <span className="rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white">
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="mb-3 line-clamp-2 text-lg font-black text-slate-900 dark:text-white">
                                            {post.title}
                                        </h3>
                                        <p className="mb-4 flex-1 line-clamp-3 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-400">
                                            {post.description}
                                        </p>
                                        <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
                                            <div className="text-xs font-bold text-slate-600 dark:text-slate-500">
                                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative" aria-labelledby="trust-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-white px-5 py-2.5 shadow-sm dark:bg-slate-900 mb-6">
                            <Shield className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Trust & Quality</span>
                        </div>
                        <h2 id="trust-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            Built Like a <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Real Resource</span>
                        </h2>
                        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-3xl mx-auto font-medium">
                            SimpleWebToolsBox is being positioned as a smaller publisher resource with clearly written guides, named ownership, and transparent support pages.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {[
                            {
                                icon: Shield,
                                title: 'Named ownership',
                                body: 'The site is published and maintained by Mohd Washid. About, contact, editorial, privacy, disclaimer, and DMCA pages are all available to help users understand who runs the site.',
                            },
                            {
                                icon: Award,
                                title: 'Original guidance',
                                body: 'The public site is centered on practical guides that explain a topic clearly instead of acting like a generic content directory.',
                            },
                            {
                                icon: Globe,
                                title: 'Clear user intent',
                                body: 'Visitors can discover curated guides, understand who runs the site, and contact the publisher without needing an account or navigating misleading flows.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-black text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-400">{item.body}</p>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">How We Maintain Quality</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
                            <p>
                                The site is centered on practical articles that answer real user questions clearly instead of padding out pages with generic summaries.
                            </p>
                            <p>
                                Content is reviewed, tied to real user questions, and updated when guidance becomes stale so the public library stays useful over time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700" />
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-6 py-3 mb-8 shadow-sm">
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="text-sm font-black text-white">Explore More</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Ready to Learn?
                        <br />
                        <span className="text-cyan-200">Start Today</span>
                    </h2>
                    <p className="text-xl text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Explore our current set of publisher-quality guides covering technology, finance, education, and more.
                    </p>

                    <Link
                        href="/blog"
                        className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 text-lg font-bold text-blue-600 shadow-xl transition-colors"
                    >
                        <FileText className="w-6 h-6" />
                        Read All Articles
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
