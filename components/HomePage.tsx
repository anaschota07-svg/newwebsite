'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Sparkles, Calculator, FileText, Rocket, Star, Code2, Layers, TrendingUp, Users, Award, Github, Linkedin, Globe, BookOpen, Lock, Smartphone } from 'lucide-react'
import { toolsData } from '@/data/tools/toolsData'
import { blogPosts } from '@/data/blog/blogData'
import AdSense from '@/components/AdSense'
import BlogImage from '@/components/BlogImage'
// ============================================================
// MIDDLEWARE SYSTEM — COMMENTED OUT FOR ADSENSE REVIEW
// Uncomment all sections marked [MIDDLEWARE] to restore
// ============================================================
// import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'  // [MIDDLEWARE]
// import { MiddlewareWrapper } from '@/components/MiddlewareWrapper'         // [MIDDLEWARE]
// import ReCaptchaBox from '@/components/CaptchaVerification'               // [MIDDLEWARE]
// import { StepTimer } from '@/components/StepTimer'                        // [MIDDLEWARE]
// import { incrementStep } from '@/app/services/api'                        // [MIDDLEWARE]
// import { useRouter } from 'next/navigation'                               // [MIDDLEWARE]
// import { AdComponent } from '@/components/AdComponent'                    // [MIDDLEWARE]
import LazyLoad from '@/components/LazyLoad'

// [MIDDLEWARE] — Ad components commented out for AdSense review
// Uncomment below to restore the middleware ad-gate system
/*
const HomeMiddlewareAd1 = () => {
    return (
        <div className="w-full mb-4 flex justify-center">
            <div>
                <AdComponent adSlotId="4686013446" size="300x250" className="" />
            </div>
        </div>
    )
}
const HomeMiddlewareAd2 = () => {
    return (
        <div className="w-full mt-4 flex justify-center">
            <div>
                <AdComponent adSlotId="4686013446" size="300x250" className="" />
            </div>
        </div>
    )
}
const HomeAd3 = () => {
    return (
        <div className="w-full mb-6 flex justify-center">
            <div style={{ minHeight: '90px' }}>
                <AdComponent adSlotId="4686013446" size="300x250" className="" />
            </div>
        </div>
    )
}
const HomeAd4 = () => {
    return (
        <div className="w-full mt-6 flex justify-center">
            <div style={{ minHeight: '90px' }}>
                <AdComponent adSlotId="4686013446" size="300x250" className="" />
            </div>
        </div>
    )
}
const AdsSectionWithNext = ({ onNext, isLoading = false }: { onNext: () => void, isLoading?: boolean }) => {
    const { currentStep } = useMiddlewareFlow();
    return (
        <section className="w-full px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-center"><HomeAd3 /></div>
                {currentStep === 'home-next' && (
                    <div className="flex justify-center">
                        <button onClick={onNext} disabled={isLoading}
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                            <Sparkles className="w-5 h-5 relative z-10" />
                            <span className="relative z-10 text-lg">{isLoading ? 'Loading...' : 'Continue'}</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}
                <div className="flex justify-center"><HomeAd4 /></div>
            </div>
        </section>
    )
}
*/

export function HomePageContent() {
    const featuredTools = toolsData.slice(0, 6)
    const featuredPosts = blogPosts.slice(0, 3)

    // [MIDDLEWARE] — Commented out for AdSense review. Uncomment to restore:
    // const [isLoading, setIsLoading] = useState(false)
    // const router = useRouter()
    // const { currentStep, setCurrentStep, sessionToken, shortCode } = useMiddlewareFlow()
    // Placeholder values so JSX conditions ({!sessionToken && ...}) keep working:
    const sessionToken = null
    const shortCode = null

    const realStats = {
        tools: toolsData.length,
        guides: blogPosts.length,
        categories: new Set(toolsData.map(t => t.category)).size,
    }

    const toolImages: { [key: string]: string } = {
        'age-calculator': 'https://images.pexels.com/photos/590570/pexels-photo-590570.jpeg',
        'bmi-calculator': 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
        'text-case-converter': 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
        'word-counter': 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
        'password-generator': 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
        'qr-code-generator': 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    }

    return (
        <>
            {/* [MIDDLEWARE] <MiddlewareWrapper> was here — uncomment import + replace <> with <MiddlewareWrapper> to restore */}
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
                {/* Skip Link */}
                <a href="#main-content" className="sr-only focus:not-sr-only">
                    Skip to main content
                </a>

                {/* [MIDDLEWARE] Middleware Flow Section — commented out for AdSense review
                {sessionToken && shortCode && (currentStep === 'popup' || currentStep === 'captcha' || currentStep === 'home-timer' || currentStep === 'home-next') && (
                    <section className="w-full px-0 py-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        ... captcha / timer / ad steps ...
                    </section>
                )}
                [MIDDLEWARE END] */}

                {/* Hero Section - Futuristic - Always Visible */}
                <section
                    id="main-content"
                    className="relative overflow-hidden py-20 sm:py-32"
                    aria-label="Hero section"
                >
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-lg mb-8 hover:scale-105 transition-transform">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
                                <span className="text-sm font-black bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Next-Gen Web Tools</span>
                                <Sparkles className="w-4 h-4 text-purple-500" />
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1]">
                                <span className="text-slate-900 dark:text-white drop-shadow-sm">Tools Built for</span>
                                <br />
                                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                                    Tomorrow
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                                Experience <span className="font-black text-cyan-600 dark:text-cyan-400">{realStats.tools}</span> lightning-fast tools with zero setup.
                                Beautiful, private, and powerful.
                            </p>

                            {/* CTA Buttons - Hide with session */}
                            {!sessionToken && (
                                <>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                                        <Link
                                            href="/tools"
                                            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                <Rocket className="w-5 h-5" />
                                                Launch Tools
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </Link>

                                        <Link
                                            href="/blog"
                                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 dark:text-white bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-purple-500 rounded-2xl transition-all gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            <FileText className="w-5 h-5" />
                                            Read Guides
                                        </Link>
                                    </div>

                                    {/* Stats - Futuristic Cards */}
                                    <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                                        {[
                                            {
                                                icon: Calculator,
                                                value: realStats.tools,
                                                label: 'Tools',
                                                gradient: 'from-cyan-500 to-blue-500',
                                                bg: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20'
                                            },
                                            {
                                                icon: FileText,
                                                value: realStats.guides,
                                                label: 'Guides',
                                                gradient: 'from-blue-500 to-purple-500',
                                                bg: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
                                            },
                                            {
                                                icon: Layers,
                                                value: realStats.categories,
                                                label: 'Categories',
                                                gradient: 'from-purple-500 to-pink-500',
                                                bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                                            },
                                        ].map((stat, index) => (
                                            <div
                                                key={index}
                                                className="group relative hover:scale-105 transition-transform"
                                            >
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
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Section - Hide with session */}
                {!sessionToken && (
                    <LazyLoad>
                        <section
                            className="py-20 relative"
                            aria-labelledby="features-heading"
                        >
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 shadow-lg mb-6">
                                        <Award className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                            What Makes Us Special
                                        </span>
                                    </div>
                                    <h2 id="features-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                        Why <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">We're Different</span>
                                    </h2>
                                    <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                                        Built with cutting-edge technology for maximum performance
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        {
                                            icon: Zap,
                                            title: 'Instant Results',
                                            description: `${realStats.tools} tools running at light speed. Zero latency, pure performance.`,
                                            gradient: 'from-cyan-500 to-blue-500',
                                            bg: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20'
                                        },
                                        {
                                            icon: Shield,
                                            title: 'Privacy First',
                                            description: 'Everything runs locally. Your data never touches our servers.',
                                            gradient: 'from-blue-500 to-purple-500',
                                            bg: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
                                        },
                                        {
                                            icon: Star,
                                            title: 'Always Free',
                                            description: `All ${realStats.tools} tools, ${realStats.guides} guides. Forever. No catches.`,
                                            gradient: 'from-purple-500 to-pink-500',
                                            bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                                        },
                                    ].map((feature, index) => (
                                        <div
                                            key={index}
                                            className="group relative hover:scale-105 transition-transform"
                                        >
                                            <div className={`bg-gradient-to-br ${feature.bg} backdrop-blur-xl rounded-3xl p-8 border-2 border-white/50 dark:border-slate-700/50 hover:border-white/80 dark:hover:border-slate-600 shadow-xl`}>
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                                    <feature.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </LazyLoad>
                )}

                {/* Featured Tools Section - Hide with session */}
                {!sessionToken && (
                    <LazyLoad>
                        <section
                            className="py-20 relative"
                            aria-labelledby="tools-heading"
                        >
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 shadow-lg mb-6">
                                        <Code2 className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Featured Collection</span>
                                    </div>
                                    <h2 id="tools-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                        Popular <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">Tools</span>
                                    </h2>
                                    <p className="text-lg text-slate-700 dark:text-slate-400 font-medium">
                                        <span className="font-black text-blue-600 dark:text-blue-400">{featuredTools.length}</span> of <span className="font-black text-purple-600 dark:text-purple-400">{realStats.tools}</span> powerful tools
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featuredTools.map((tool, index) => (
                                        <Link
                                            key={tool.id}
                                            href={`/tools/${tool.slug}`}
                                            className="group block relative hover:scale-105 transition-transform"
                                            aria-label={`Use ${tool.name} tool`}
                                        >
                                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-purple-500 transition-all h-full shadow-xl hover:shadow-2xl">
                                                {/* Icon with Gradient Background */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="text-5xl p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all shadow-lg group-hover:scale-110 transform">
                                                        {tool.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 transition-all">
                                                            {tool.name}
                                                        </h3>
                                                        <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
                                                            {tool.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Category Badge */}
                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
                                                        {tool.category}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-500 transition-all">
                                                        <span className="text-xs font-semibold">Try now</span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <div className="text-center mt-12">
                                    <Link
                                        href="/tools"
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-blue-500/30 hover:border-blue-500 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                    >
                                        View All {realStats.tools} Tools
                                        <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </LazyLoad>
                )}

                {/* Blog Section - Hide with session */}
                <LazyLoad>
                    <section
                        className="py-20 relative overflow-hidden"
                        aria-labelledby="blog-heading"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 shadow-lg mb-6">
                                    <FileText className="w-4 h-4 text-purple-500" />
                                    <span className="text-sm font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Knowledge Base</span>
                                </div>
                                <h2 id="blog-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                    Latest <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Guides</span>
                                </h2>
                                <p className="text-lg text-slate-700 dark:text-slate-400 font-medium">
                                    <span className="font-black text-purple-600 dark:text-purple-400">{featuredPosts.length}</span> of <span className="font-black text-pink-600 dark:text-pink-400">{realStats.guides}</span> expert tutorials
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {featuredPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group block relative h-full hover:scale-105 transition-transform"
                                        aria-label={`Read: ${post.title}`}
                                    >
                                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-pink-500 transition-all h-full flex flex-col shadow-xl hover:shadow-2xl">
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
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1 font-medium">
                                                    {post.description}
                                                </p>
                                                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                                                    <div className="text-xs text-slate-600 dark:text-slate-500 font-bold">
                                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-500 text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    Explore {realStats.guides} Guides
                                    <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </LazyLoad>

                {/* FAQ Section - Hide with session */}
                {!sessionToken && (
                    <LazyLoad>
                        <section className="py-20 relative" aria-labelledby="faq-heading">
                            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 shadow-lg mb-6">
                                        <Sparkles className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                            Frequently Asked Questions
                                        </span>
                                    </div>
                                    <h2 id="faq-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                        Got <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Questions?</span>
                                    </h2>
                                    <p className="text-lg text-slate-700 dark:text-slate-400 font-medium">
                                        Find answers to common questions about our tools
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        {
                                            question: 'Are these tools really free?',
                                            answer: 'Yes! All {realStats.tools} tools are 100% free forever. No registration, no hidden costs, no premium tiers. We believe powerful tools should be accessible to everyone.',
                                        },
                                        {
                                            question: 'Is my data safe and private?',
                                            answer: 'Absolutely. All tools run entirely in your browser. Your data never leaves your device and is never sent to our servers. Complete privacy guaranteed.',
                                        },
                                        {
                                            question: 'Do I need to create an account?',
                                            answer: 'No account required! Just visit the tool you need and start using it immediately. No signup, no email, no hassle.',
                                        },
                                        {
                                            question: 'Can I use these tools on mobile?',
                                            answer: 'Yes! All tools are fully responsive and work perfectly on mobile phones, tablets, and desktops. Use them anywhere, anytime.',
                                        },
                                        {
                                            question: 'How many tools do you have?',
                                            answer: 'We currently offer {realStats.tools} free online tools across {realStats.categories} categories including calculators, text tools, generators, developer tools, and more.',
                                        },
                                        {
                                            question: 'Do you add new tools regularly?',
                                            answer: 'Yes! We continuously add new tools based on user feedback and needs. Check back regularly for new additions.',
                                        },
                                    ].map((faq, index) => (
                                        <div
                                            key={index}
                                            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all shadow-lg"
                                        >
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
                                                {faq.question}
                                            </h3>
                                            <p className="text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
                                                {faq.answer.replace('{realStats.tools}', String(realStats.tools)).replace('{realStats.categories}', String(realStats.categories))}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </LazyLoad>
                )}

                {/* Tools Categories Section - Hide with session */}
                {!sessionToken && (
                    <LazyLoad>
                        <section className="py-20 relative" aria-labelledby="categories-heading">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 shadow-lg mb-6">
                                        <Layers className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                            Complete Tool Library
                                        </span>
                                    </div>
                                    <h2 id="categories-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                        Everything You Need,{' '}
                                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                            Organized
                                        </span>
                                    </h2>
                                    <p className="text-lg text-slate-700 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                                        {realStats.tools} free tools across {realStats.categories} categories — calculators, converters, generators, developer utilities, and more. No signup, no cost, forever free.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                    {[
                                        { icon: Calculator, title: 'Calculators', desc: 'Age, BMI, loan, percentage, date difference, unit conversion and more — instant, precise calculations for everyday needs.', gradient: 'from-cyan-500 to-blue-500', count: '8+', link: '/tools' },
                                        { icon: Code2, title: 'Developer Tools', desc: 'JSON formatter, Base64 encoder/decoder, URL encoder, HTML encoder, regex tester, code minifiers, timestamp converter.', gradient: 'from-blue-500 to-indigo-500', count: '10+', link: '/tools' },
                                        { icon: Lock, title: 'Security Tools', desc: 'Strong password generator, MD5/SHA hash generator, UUID generator — keep your data and accounts secure.', gradient: 'from-indigo-500 to-purple-500', count: '5+', link: '/tools' },
                                        { icon: BookOpen, title: 'Text Tools', desc: 'Text case converter, word counter, Lorem Ipsum generator, text diff checker — essential for writers and content creators.', gradient: 'from-purple-500 to-pink-500', count: '6+', link: '/tools' },
                                        { icon: Globe, title: 'Generators', desc: 'QR code generator, barcode generator, random number generator, invoice generator — create what you need instantly.', gradient: 'from-pink-500 to-rose-500', count: '6+', link: '/tools' },
                                        { icon: Smartphone, title: 'Design Tools', desc: 'Color picker, gradient generator, CSS box shadow generator, font preview — design utilities for every project.', gradient: 'from-rose-500 to-orange-500', count: '5+', link: '/tools' },
                                        { icon: TrendingUp, title: 'Productivity', desc: 'Pomodoro timer, stopwatch, time zone converter — tools that help you stay focused and manage your time better.', gradient: 'from-orange-500 to-amber-500', count: '4+', link: '/tools' },
                                        { icon: FileText, title: 'How-To Guides', desc: '{count} comprehensive tutorials on passwords, health, finance, and more — step-by-step guides written by experts.', gradient: 'from-amber-500 to-yellow-500', count: `${realStats.guides}`, link: '/blog' },
                                    ].map((cat, i) => (
                                        <Link key={i} href={cat.link} className="group block hover:scale-105 transition-transform">
                                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all h-full shadow-lg hover:shadow-xl">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                                                    <cat.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{cat.title}</h3>
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${cat.gradient} text-white`}>{cat.count}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {cat.desc.replace('{count}', cat.count)}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <div className="text-center">
                                    <Link href="/tools" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-base hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 group">
                                        Browse All {realStats.tools} Tools
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </LazyLoad>
                )}


                {/* CTA Section - Hide with session */}
                {!sessionToken && (
                    <LazyLoad>
                        <section className="py-24 relative overflow-hidden">
                            {/* Animated Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

                            {/* Decorative elements */}
                            <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />

                            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 mb-8 shadow-lg">
                                    <Sparkles className="w-5 h-5 text-white" />
                                    <span className="text-sm font-black text-white">Start Building Today</span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                                    Ready to Experience
                                    <br />
                                    <span className="text-cyan-300">The Future?</span>
                                </h2>
                                <p className="text-xl text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
                                    Join developers using <span className="font-black">{realStats.tools}</span> cutting-edge tools. No signup, no hassle.
                                </p>

                                <Link
                                    href="/tools"
                                    className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-2xl transition-all shadow-2xl hover:shadow-white/40 gap-3 hover:scale-105"
                                >
                                    <Rocket className="w-6 h-6" />
                                    Launch Tools Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </section>
                    </LazyLoad>
                )}

                {/* [MIDDLEWARE] Ads Section with Next Button — commented out for AdSense review
                {sessionToken && shortCode && (
                    <div id="home-ads-section" className="scroll-mt-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <AdsSectionWithNext
                            onNext={async () => {
                                setIsLoading(true)
                                try {
                                    await new Promise(resolve => setTimeout(resolve, 500))
                                    setCurrentStep('blog-timer')
                                    router.push('/blog')
                                } catch (error) {
                                    setIsLoading(false)
                                }
                            }}
                            isLoading={isLoading}
                        />
                    </div>
                )}
                [MIDDLEWARE END] */}
            </div>
            {/* [MIDDLEWARE] </MiddlewareWrapper> was here — replace </> with </MiddlewareWrapper> to restore */}
        </>
    )
}