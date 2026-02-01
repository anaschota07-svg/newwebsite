'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Shield, Sparkles, TrendingUp, Users, Clock, CheckCircle2, Calculator, FileText } from 'lucide-react'
import { toolsData } from '@/data/tools/toolsData'
import { blogPosts } from '@/data/blog/blogData'
import AdPlaceholder from '@/components/AdPlaceholder'
import BlogImage from '@/components/BlogImage'
import { motion } from 'framer-motion'

export default function Home() {
  const featuredTools = toolsData.slice(0, 6)
  const featuredPosts = blogPosts.slice(0, 3)
  
  // Real data - no fake numbers
  const realStats = {
    tools: toolsData.length,
    guides: blogPosts.length,
    categories: new Set(toolsData.map(t => t.category)).size,
  }

  // Tool images mapping
  const toolImages: { [key: string]: string } = {
    'age-calculator': 'https://images.pexels.com/photos/590570/pexels-photo-590570.jpeg',
    'bmi-calculator': 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
    'text-case-converter': 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
    'word-counter': 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
    'password-generator': 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
    'qr-code-generator': 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    'color-picker': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    'json-formatter': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    'base64-encoder-decoder': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    'url-encoder-decoder': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    'hash-generator': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    'uuid-generator': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    'lorem-ipsum-generator': 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
    'timestamp-converter': 'https://images.pexels.com/photos/163117/calender-date-time-month-163117.jpeg',
    'unit-converter': 'https://images.pexels.com/photos/163117/calender-date-time-month-163117.jpeg',
    'percentage-calculator': 'https://images.pexels.com/photos/590570/pexels-photo-590570.jpeg',
    'random-number-generator': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    'text-to-binary': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    'html-encoder-decoder': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <section 
        id="main-content"
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 sm:py-32 transition-colors duration-300"
        aria-label="Hero section"
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <BlogImage
            src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
            alt="Background"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
        </div>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-900/40 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-900/40 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40"
            animate={{
              x: [0, -100, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-900/40 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40"
            animate={{
              x: [0, 50, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              className="text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              

              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 text-balance leading-tight transition-colors duration-300"
              >
                Powerful Tools for
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                  Everyday Success
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto lg:mx-0 text-balance leading-relaxed font-medium transition-colors duration-300"
              >
                Discover <span className="font-bold text-blue-600 dark:text-blue-400">{realStats.tools} powerful tools</span> and <span className="font-bold text-purple-600 dark:text-purple-400">{realStats.guides} expert guides</span>. 
                Fast, free, and completely private. Start using them now!
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/tools"
                    className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all shadow-2xl hover:shadow-blue-500/50"
                  >
                    Explore All {realStats.tools} Tools
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-gray-900 dark:text-white bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Read {realStats.guides} Guides
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Real Stats Section */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto lg:mx-0"
              >
                {[
                  { 
                    icon: Calculator, 
                    value: realStats.tools, 
                    label: 'Free Tools',
                    color: 'text-blue-600 dark:text-blue-400',
                    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
                  },
                  { 
                    icon: FileText, 
                    value: realStats.guides, 
                    label: 'How-To Guides',
                    color: 'text-purple-600 dark:text-purple-400',
                    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
                  },
                  { 
                    icon: TrendingUp, 
                    value: realStats.categories, 
                    label: 'Categories',
                    color: 'text-pink-600 dark:text-pink-400',
                    bgColor: 'bg-pink-100 dark:bg-pink-900/30'
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className={`${stat.bgColor} rounded-2xl p-4 mb-3 inline-block transition-colors duration-300`}>
                      <stat.icon className={`h-8 w-8 ${stat.color} transition-colors duration-300`} />
                    </div>
                    <div className={`text-4xl font-extrabold ${stat.color} mb-2 transition-colors duration-300`}>{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold transition-colors duration-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <BlogImage
                  src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
                  alt="Powerful Web Tools - SimpleWebToolsBox"
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 id="features-heading" className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Why Choose SimpleWebToolsBox?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Everything you need, all in one place. Fast, secure, and completely free forever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: `All ${realStats.tools} tools work instantly in your browser. No uploads, no waiting, no delays. Get results in milliseconds.`,
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                iconColor: 'text-white',
                image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
              },
              {
                icon: Shield,
                title: '100% Private & Secure',
                description: 'Your data never leaves your device. All processing happens locally. Complete privacy guaranteed, always.',
                color: 'from-green-500 to-green-600',
                bgColor: 'bg-green-50 dark:bg-green-900/20',
                iconColor: 'text-white',
                image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
              },
              {
                icon: CheckCircle2,
                title: 'Always Free Forever',
                description: `No hidden fees, no premium tiers, no credit cards required. All ${realStats.tools} tools are free forever.`,
                color: 'from-purple-500 to-purple-600',
                bgColor: 'bg-purple-50 dark:bg-purple-900/20',
                iconColor: 'text-white',
                image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className={`${feature.bgColor} rounded-2xl p-8 border-2 border-transparent group-hover:border-gray-300 dark:group-hover:border-slate-700 transition-all duration-300 shadow-lg group-hover:shadow-2xl overflow-hidden`}>
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <BlogImage
                      src={feature.image}
                      alt={`${feature.title} - ${feature.description}`}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className={`h-10 w-10 ${feature.iconColor}`} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder format="horizontal" />
      </div>

      {/* Featured Tools Section */}
      <section 
        className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 transition-colors duration-300"
        aria-labelledby="tools-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 id="tools-heading" className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Popular Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Most loved tools by our community - {featuredTools.length} of {realStats.tools} total tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  aria-label={`Use ${tool.name} tool: ${tool.description}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <BlogImage
                      src={toolImages[tool.slug] || 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'}
                      alt={`${tool.name} - ${tool.description}`}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="text-5xl"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {tool.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed transition-colors duration-300">
                          {tool.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full transition-colors duration-300">
                            {tool.category}
                          </span>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/tools"
                className="inline-flex items-center text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
              >
                View All {realStats.tools} Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section 
        className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
        aria-labelledby="blog-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 id="blog-heading" className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Latest How-To Guides
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Expert tutorials to help you master our tools - {featuredPosts.length} of {realStats.guides} guides
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  aria-label={`Read article: ${post.title}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <BlogImage
                      src={post.image}
                      alt={`${post.title} - ${post.description}`}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed transition-colors duration-300">
                      {post.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="inline-flex items-center text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
              >
                View All {realStats.guides} Guides
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Access all {realStats.tools} free tools and {realStats.guides} expert guides. No sign-up required!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 bg-white hover:bg-gray-100 rounded-xl transition-all shadow-2xl hover:shadow-white/50"
            >
              Explore All {realStats.tools} Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
