'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Heart } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Editorial Policy', href: '/editorial-policy' },
    { name: 'DMCA Policy', href: '/dmca' },
  ],
  resources: [
    { name: 'All Tools', href: '/tools' },
    { name: 'How-To Guides', href: '/blog' },
    { name: 'Sitemap', href: '/sitemap-page' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div 
            className="col-span-1 md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group" aria-label="SimpleWebToolsBox Home">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-white/20">
                  <Image
                    src="/logo.png"
                    alt="SimpleWebToolsBox"
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
              </div>
              <span className="text-lg font-black gradient-text">
                SimpleWebToolsBox
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Futuristic tools for modern developers. Fast, private, and always free.
            </p>
            
            {/* Stats Badge */}
            <motion.div 
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-bold gradient-text">Powered by Innovation</span>
            </motion.div>
          </motion.div>

          {/* Links Sections */}
          {[
            { title: 'Company', links: footerLinks.company, delay: 0.1 },
            { title: 'Legal', links: footerLinks.legal, delay: 0.2 },
            { title: 'Resources', links: footerLinks.resources, delay: 0.3 },
          ].map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: section.delay }}
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-cyan-500" />
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all inline-flex items-center gap-1 group"
                    >
                      <span className="h-px w-0 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-slate-200/50 dark:border-slate-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
              © {new Date().getFullYear()} 
              <span className="font-semibold gradient-text">SimpleWebToolsBox</span>
              • Built with 
              <Heart className="w-4 h-4 text-pink-500 animate-pulse-gentle inline" /> 
              for developers
            </p>
            
            <motion.div 
              className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse-gentle" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                All systems operational
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
