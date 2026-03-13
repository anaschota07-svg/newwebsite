'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Shield, Sparkles, Calculator, FileText, Rocket, Star, Code2, Layers, TrendingUp, Award, Globe, BookOpen, Lock, Smartphone } from 'lucide-react'
import { toolsData } from '@/data/tools/toolsData'
import { blogPosts } from '@/data/blog/blogData'
import BlogImage from '@/components/BlogImage'
import LazyLoad from '@/components/LazyLoad'

export function HomePageContent() {
    const featuredTools = toolsData.slice(0, 6)
    const allBlogs = blogPosts
    const techBlogs = allBlogs.filter(b => b.category === 'Technology').slice(0, 3)
    const financeBlogs = allBlogs.filter(b => b.category === 'Finance').slice(0, 3)
    const studyBlogs = allBlogs.filter(b => b.category === 'Study').slice(0, 3)
    const hindiBlogs = allBlogs.filter(b => b.readTime.includes('मिनट')).slice(0, 3)

    const realStats = {
        tools: toolsData.length,
        guides: blogPosts.length,
        categories: new Set(toolsData.map(t => t.category)).size,
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
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-lg mb-8 hover:scale-105 transition-transform">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
                            <span className="text-sm font-black bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Professional Tools & Resources</span>
                            <Sparkles className="w-4 h-4 text-purple-500" />
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1]">
                            <span className="text-slate-900 dark:text-white drop-shadow-sm">Free Tools &</span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                                Expert Guides
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                            Access <span className="font-black text-cyan-600 dark:text-cyan-400">{realStats.tools}</span> powerful tools and <span className="font-black text-purple-600 dark:text-purple-400">{realStats.guides}</span> comprehensive guides on technology, finance, education, and more.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link
                                href="/tools"
                                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <Rocket className="w-5 h-5" />
                                    Explore Tools
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 dark:text-white bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-purple-500 rounded-2xl transition-all gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <FileText className="w-5 h-5" />
                                Read Articles
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                            {[
                                { icon: Calculator, value: realStats.tools, label: 'Tools', gradient: 'from-cyan-500 to-blue-500', bg: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20' },
                                { icon: FileText, value: realStats.guides, label: 'Articles', gradient: 'from-blue-500 to-purple-500', bg: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' },
                                { icon: Layers, value: realStats.categories, label: 'Categories', gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
                            ].map((stat, index) => (
                                <div key={index} className="group relative hover:scale-105 transition-transform">
                                    <div className={`bg-gradient-to-br ${stat.bg} backdrop-blur-xl rounded-2xl p-6 border-2 border-white/50 dark:border-slate-700/50 hover:border-white shadow-lg`}>
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

            {/* Featured Blog Section - Hindi First */}
            <LazyLoad>
                <section className="py-20 relative" aria-labelledby="hindi-blogs-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-orange-500/30 shadow-lg mb-6">
                                <span className="text-sm font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">हिंदी लेख</span>
                            </div>
                            <h2 id="hindi-blogs-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                हिंदी में <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">विशेषज्ञ लेख</span>
                            </h2>
                            <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                                भारतीय पाठकों के लिए तकनीक, वित्त, और शिक्षा पर विस्तृत हिंदी लेख
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {hindiBlogs.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block relative h-full hover:scale-105 transition-transform"
                                    aria-label={`Read: ${post.title}`}
                                >
                                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all h-full flex flex-col shadow-xl hover:shadow-2xl">
                                        <div className="relative h-48 overflow-hidden">
                                            <BlogImage
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 transition-all line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1 font-medium">
                                                {post.description}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                                                <div className="text-xs text-slate-600 dark:text-slate-500 font-bold">
                                                    {new Date(post.date).toLocaleDateString('hi-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </LazyLoad>

            {/* Tech Articles Section */}
            <LazyLoad>
                <section className="py-20 relative" aria-labelledby="tech-blogs-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 shadow-lg mb-6">
                                <Code2 className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Technology</span>
                            </div>
                            <h2 id="tech-blogs-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                Latest <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Tech Articles</span>
                            </h2>
                            <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                                AI, Cloud Computing, Cybersecurity, and Web Development
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {techBlogs.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block relative h-full hover:scale-105 transition-transform"
                                >
                                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all h-full flex flex-col shadow-xl hover:shadow-2xl">
                                        <div className="relative h-48 overflow-hidden">
                                            <BlogImage
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 transition-all line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1 font-medium">
                                                {post.description}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                                                <div className="text-xs text-slate-600 dark:text-slate-500 font-bold">
                                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </LazyLoad>

            {/* Finance Articles Section */}
            <LazyLoad>
                <section className="py-20 relative" aria-labelledby="finance-blogs-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-green-500/30 shadow-lg mb-6">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Finance</span>
                            </div>
                            <h2 id="finance-blogs-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                Financial <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Guides</span>
                            </h2>
                            <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                                Credit Score, Loans, Investments, and Wealth Building
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {financeBlogs.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block relative h-full hover:scale-105 transition-transform"
                                >
                                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 transition-all h-full flex flex-col shadow-xl hover:shadow-2xl">
                                        <div className="relative h-48 overflow-hidden">
                                            <BlogImage
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-500 transition-all line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1 font-medium">
                                                {post.description}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                                                <div className="text-xs text-slate-600 dark:text-slate-500 font-bold">
                                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </LazyLoad>

            {/* Study Articles Section */}
            <LazyLoad>
                <section className="py-20 relative" aria-labelledby="study-blogs-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 shadow-lg mb-6">
                                <BookOpen className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Education</span>
                            </div>
                            <h2 id="study-blogs-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                Study <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Resources</span>
                            </h2>
                            <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                                Learning Techniques, Career Guides, and Skill Development
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {studyBlogs.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block relative h-full hover:scale-105 transition-transform"
                                >
                                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 transition-all h-full flex flex-col shadow-xl hover:shadow-2xl">
                                        <div className="relative h-48 overflow-hidden">
                                            <BlogImage
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1 font-medium">
                                                {post.description}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                                                <div className="text-xs text-slate-600 dark:text-slate-500 font-bold">
                                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </LazyLoad>

            {/* CTA Section */}
            <LazyLoad>
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />

                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 mb-8 shadow-lg">
                            <Sparkles className="w-5 h-5 text-white" />
                            <span className="text-sm font-black text-white">Explore More</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                            Ready to Learn?
                            <br />
                            <span className="text-cyan-300">Start Today</span>
                        </h2>
                        <p className="text-xl text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
                            Explore our comprehensive collection of tools and articles covering technology, finance, education, and more.
                        </p>

                        <Link
                            href="/blog"
                            className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-2xl transition-all shadow-2xl hover:shadow-white/40 gap-3 hover:scale-105"
                        >
                            <FileText className="w-6 h-6" />
                            Read All Articles
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            </LazyLoad>
        </div>
    )
}
