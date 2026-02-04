'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Sparkles, Calculator, FileText, Rocket, Star, Code2, Layers } from 'lucide-react'
import { toolsData } from '@/data/tools/toolsData'
import { blogPosts } from '@/data/blog/blogData'
import AdSense from '@/components/AdSense'
import BlogImage from '@/components/BlogImage'
import { motion } from 'framer-motion'
import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
import { MiddlewareWrapper } from '@/components/MiddlewareWrapper'
import ReCaptchaBox from '@/components/CaptchaVerification'
import { StepTimer } from '@/components/StepTimer'
import { incrementStep } from '@/app/services/api'
import { useRouter } from 'next/navigation'
import { AdComponent } from '@/components/AdComponent'

// Home Middleware Ads
const HomeMiddlewareAd1 = () => {
    return (
        <div className="w-full mb-4">
            <div className="w-full max-w-4xl mx-auto">
                <AdComponent
                    adSlotId="4686013446"
                    size="300x250"
                    className="w-full"
                />
            </div>
        </div>
    )
}

const HomeMiddlewareAd2 = () => {
    return (
        <div className="w-full mt-4">
            <div className="w-full max-w-4xl mx-auto">
                <AdComponent
                    adSlotId="4686013446"
                    size="300x250"
                    className="w-full"
                />
            </div>
        </div>
    )
}

// Home Ad 3 & 4 for Next Button Section
const HomeAd3 = () => {
    return (
        <div className="w-full mb-6">
            <div className="w-full max-w-6xl mx-auto" style={{ minHeight: '90px' }}>
                <AdComponent
                    adSlotId="4686013446"
                    size="300x250"
                    className="w-full"
                />
            </div>
        </div>
    )
}

const HomeAd4 = () => {
    return (
        <div className="w-full mt-6">
            <div className="w-full max-w-6xl mx-auto" style={{ minHeight: '90px' }}>
                <AdComponent
                    adSlotId="4686013446"
                    size="300x250"
                    className="w-full"
                />
            </div>
        </div>
    )
}

// Ads Section with Next Button
const AdsSectionWithNext = ({ onNext, isLoading = false }: { onNext: () => void, isLoading?: boolean }) => {
    return (
        <section className="w-full px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Home Ad 3 */}
                <HomeAd3 />

                {/* Next Button */}
                <div className="flex justify-center">
                    <motion.button
                        onClick={onNext}
                        disabled={isLoading}
                        whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-shift" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        <Sparkles className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">{isLoading ? 'Loading...' : 'Next'}</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        {/* Shimmer on Hover */}
                        <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.button>
                </div>

                {/* Home Ad 4 */}
                <HomeAd4 />
            </div>
        </section>
    )
}

export function HomePageContent() {
    const featuredTools = toolsData.slice(0, 6)
    const featuredPosts = blogPosts.slice(0, 3)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { currentStep, setCurrentStep, sessionToken, shortCode } = useMiddlewareFlow()

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
        <MiddlewareWrapper>
            <div className="min-h-screen">
                {/* Skip Link */}
                <a href="#main-content" className="sr-only focus:not-sr-only">
                    Skip to main content
                </a>

                {/* Middleware Flow Section - Above Hero (WITH session only) */}
                {sessionToken && shortCode && (currentStep === 'popup' || currentStep === 'captcha' || currentStep === 'home-timer' || currentStep === 'home-next') && (
                    <section className="w-full px-4 py-6">
                        <div className="max-w-4xl mx-auto">
                            {/* Ad 1 */}
                            <HomeMiddlewareAd1 />

                            {/* Middleware Flow Content */}
                            <div className="text-center py-4">
                                {/* Step 2: Captcha - Show during popup or captcha step */}
                                {(currentStep === 'popup' || currentStep === 'captcha') && (
                                    <ReCaptchaBox
                                        onVerify={async () => {
                                            // Move to next step immediately (don't wait for backend)
                                            setCurrentStep('home-timer')

                                            // Update backend in background
                                            if (sessionToken && shortCode) {
                                                try {
                                                    const result = await incrementStep(sessionToken, shortCode)
                                                    if (process.env.NODE_ENV === 'development') {
                                                        if (result.success) {
                                                            console.log('✅ Step 2 completed - Captcha verified')
                                                        } else {
                                                            console.warn('⚠️ Backend increment failed (non-blocking):', result.error)
                                                        }
                                                    }
                                                } catch (error) {
                                                    if (process.env.NODE_ENV === 'development') {
                                                        console.warn('⚠️ Backend error (non-blocking):', error)
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                )}

                                {/* Step 3: Timer (20s) */}
                                {currentStep === 'home-timer' && (
                                    <StepTimer
                                        duration={20}
                                        onComplete={async () => {
                                            // Move to next step immediately (don't wait for backend)
                                            setCurrentStep('home-next')
                                            if (process.env.NODE_ENV === 'development') {
                                                console.log('✅ Home page timer completed')
                                            }

                                            // Update backend in background
                                            if (sessionToken && shortCode) {
                                                try {
                                                    const result = await incrementStep(sessionToken, shortCode)
                                                    if (process.env.NODE_ENV === 'development') {
                                                        if (result.success) {
                                                            console.log('✅ Backend step incremented')
                                                        } else {
                                                            console.warn('⚠️ Backend increment failed (non-blocking):', result.error)
                                                        }
                                                    }
                                                } catch (error) {
                                                    if (process.env.NODE_ENV === 'development') {
                                                        console.warn('⚠️ Backend error (non-blocking):', error)
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                )}

                                {/* Step 4: Instruction to scroll */}
                                {currentStep === 'home-next' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                                    >
                                        ↓ Scroll down to Next button to continue ↓
                                    </motion.p>
                                )}
                            </div>

                            {/* Ad 2 */}
                            <HomeMiddlewareAd2 />
                        </div>
                    </section>
                )}

                {/* Hero Section - Futuristic - Always Visible */}
                <section
                    id="main-content"
                    className="relative overflow-hidden py-20 sm:py-32"
                    aria-label="Hero section"
                >
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 pattern-grid opacity-20" />

                    {/* Gradient Orbs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-30"
                            style={{
                                background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute top-1/4 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30"
                            style={{
                                background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
                            }}
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.5, 0.3, 0.5],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-30"
                            style={{
                                background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.4, 0.3],
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-8"
                            >
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse-gentle" />
                                <span className="text-sm font-bold gradient-text">Next-Gen Web Tools</span>
                                <Sparkles className="w-4 h-4 text-purple-500" />
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1]"
                            >
                                <span className="text-slate-900 dark:text-white">Tools Built for</span>
                                <br />
                                <span className="gradient-text">Tomorrow</span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg sm:text-xl text-slate-900 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
                            >
                                Experience {realStats.tools} lightning-fast tools with zero setup.
                                Beautiful, private, and powerful.
                            </motion.p>

                            {/* CTA Buttons - Hide with session */}
                            {!sessionToken && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                                    >
                                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                href="/tools"
                                                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-shift" />
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                                <span className="relative z-10 flex items-center gap-2">
                                                    <Rocket className="w-5 h-5" />
                                                    Launch Tools
                                                </span>
                                                <motion.div
                                                    className="absolute inset-0 bg-white/20"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '100%' }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            </Link>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                href="/blog"
                                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 dark:text-white glass border border-slate-300 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-purple-500 rounded-2xl transition-all gap-2"
                                            >
                                                <FileText className="w-5 h-5" />
                                                Read Guides
                                            </Link>
                                        </motion.div>
                                    </motion.div>

                                    {/* Stats - Futuristic Cards */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className="grid grid-cols-3 gap-4 max-w-3xl mx-auto"
                                    >
                                        {[
                                            {
                                                icon: Calculator,
                                                value: realStats.tools,
                                                label: 'Tools',
                                                gradient: 'from-cyan-500 to-blue-500',
                                            },
                                            {
                                                icon: FileText,
                                                value: realStats.guides,
                                                label: 'Guides',
                                                gradient: 'from-blue-500 to-purple-500',
                                            },
                                            {
                                                icon: Layers,
                                                value: realStats.categories,
                                                label: 'Categories',
                                                gradient: 'from-purple-500 to-pink-500',
                                            },
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                className="relative group"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                                                whileHover={{ y: -4, scale: 1.05 }}
                                            >
                                                <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all">
                                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 mx-auto`}>
                                                        <stat.icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                                                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                                </div>
                                                {/* Glow on Hover */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity -z-10`} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 3) * 20}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </section>

                {/* Features Section - Hide with session */}
                {!sessionToken && (
                    <section
                        className="py-20 relative"
                        aria-labelledby="features-heading"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-center mb-16"
                            >
                                <h2 id="features-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                    Why <span className="gradient-text">We're Different</span>
                                </h2>
                                <p className="text-lg text-slate-900 dark:text-slate-400 max-w-2xl mx-auto">
                                    Built with cutting-edge technology for maximum performance
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    {
                                        icon: Zap,
                                        title: 'Instant Results',
                                        description: `${realStats.tools} tools running at light speed. Zero latency, pure performance.`,
                                        gradient: 'from-cyan-500 to-blue-500',
                                    },
                                    {
                                        icon: Shield,
                                        title: 'Privacy First',
                                        description: 'Everything runs locally. Your data never touches our servers.',
                                        gradient: 'from-blue-500 to-purple-500',
                                    },
                                    {
                                        icon: Star,
                                        title: 'Always Free',
                                        description: `All ${realStats.tools} tools, ${realStats.guides} guides. Forever. No catches.`,
                                        gradient: 'from-purple-500 to-pink-500',
                                    },
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -6 }}
                                        className="relative group"
                                    >
                                        <div className="glass rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                <feature.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-slate-900 dark:text-slate-400 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                        {/* Glow Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-2xl rounded-3xl transition-opacity -z-10`} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Ad Placeholder - Hide with session */}
                {!sessionToken && (
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <AdSense format="horizontal" />
                    </div>
                )}

                {/* Featured Tools Section - Hide with session */}
                {!sessionToken && (
                    <section
                        className="py-20 relative"
                        aria-labelledby="tools-heading"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-center mb-16"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-4">
                                    <Code2 className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm font-bold gradient-text">Featured Collection</span>
                                </div>
                                <h2 id="tools-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                    Popular <span className="gradient-text">Tools</span>
                                </h2>
                                <p className="text-lg text-slate-900 dark:text-slate-400">
                                    {featuredTools.length} of {realStats.tools} powerful tools
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredTools.map((tool, index) => (
                                    <motion.div
                                        key={tool.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                        whileHover={{ y: -6 }}
                                    >
                                        <Link
                                            href={`/tools/${tool.slug}`}
                                            className="group block relative"
                                            aria-label={`Use ${tool.name} tool`}
                                        >
                                            <div className="glass rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all h-full">
                                                {/* Icon with Gradient Background */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    <motion.div
                                                        className="text-5xl p-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                    >
                                                        {tool.icon}
                                                    </motion.div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 transition-all truncate">
                                                            {tool.name}
                                                        </h3>
                                                        <p className="text-sm text-slate-900 dark:text-slate-400 leading-relaxed line-clamp-2">
                                                            {tool.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Category Badge */}
                                                <div className="flex items-center justify-between mt-4">
                                                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full glass border border-cyan-500/30">
                                                        {tool.category}
                                                    </span>
                                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </div>
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 rounded-3xl blur-xl transition-all -z-10" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-center mt-12"
                            >
                                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/tools"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-blue-500/30 hover:border-blue-500 text-base font-bold gradient-text group transition-all"
                                    >
                                        View All {realStats.tools} Tools
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Blog Section - Hide with session */}

                <section
                    className="py-20 relative overflow-hidden"
                    aria-labelledby="blog-heading"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-950/50 dark:to-transparent" />

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-4">
                                <FileText className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-bold gradient-text">Knowledge Base</span>
                            </div>
                            <h2 id="blog-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
                                Latest <span className="gradient-text">Guides</span>
                            </h2>
                            <p className="text-lg text-slate-900 dark:text-slate-400">
                                {featuredPosts.length} of {realStats.guides} expert tutorials
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -6 }}
                                >
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="group block relative h-full"
                                        aria-label={`Read: ${post.title}`}
                                    >
                                        <div className="glass rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all h-full flex flex-col">
                                            <div className="relative h-48 overflow-hidden">
                                                <BlogImage
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                    <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                                                        {post.category}
                                                    </span>
                                                    <span className="text-xs font-semibold text-white/90">
                                                        {post.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 transition-all line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-slate-900 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1">
                                                    {post.description}
                                                </p>
                                                <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-3xl blur-xl transition-all -z-10" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-center mt-12"
                        >
                            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-purple-500/30 hover:border-purple-500 text-base font-bold gradient-text group transition-all"
                                >
                                    Explore {realStats.guides} Guides
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>


                {/* CTA Section - Hide with session */}
                {!sessionToken && (
                    <section className="py-24 relative overflow-hidden">
                        {/* Animated Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 animate-gradient-shift" />
                        <div className="absolute inset-0 pattern-dots opacity-10" />

                        {/* Floating Orbs */}
                        <motion.div
                            className="absolute top-20 left-20 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, 50, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl"
                            animate={{
                                scale: [1.3, 1, 1.3],
                                x: [0, -50, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <motion.div
                            className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
                            >
                                <Sparkles className="w-4 h-4 text-white" />
                                <span className="text-sm font-bold text-white">Start Building Today</span>
                            </motion.div>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                                Ready to Experience
                                <br />
                                <span className="text-cyan-300">The Future?</span>
                            </h2>
                            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Join developers using {realStats.tools} cutting-edge tools. No signup, no hassle.
                            </p>

                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/tools"
                                    className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-2xl transition-all shadow-2xl hover:shadow-white/30 gap-3"
                                >
                                    <Rocket className="w-6 h-6" />
                                    Launch Tools Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </section>
                )}

                {/* Ads Section with Next Button - Step 5 - At Bottom */}
                {sessionToken && shortCode && currentStep === 'home-next' && (
                    <div id="home-ads-section" className="scroll-mt-20">
                        <AdsSectionWithNext
                            onNext={async () => {
                                setIsLoading(true)
                                try {
                                    // Small delay to show loading animation
                                    await new Promise(resolve => setTimeout(resolve, 500))
                                    setCurrentStep('tools-timer')
                                    router.push('/tools')
                                } catch (error) {
                                    setIsLoading(false)
                                }
                            }}
                            isLoading={isLoading}
                        />
                    </div>
                )}
            </div>
        </MiddlewareWrapper>
    )
}
