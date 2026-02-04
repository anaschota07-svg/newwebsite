'use client'

import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { Users, Target, Heart, Zap, Shield, Rocket, Sparkles, Lock, Smartphone, Link } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pattern-grid opacity-20" />
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-bold gradient-text">About Us</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Building the <span className="gradient-text">Future</span>
          </h1>
          <p className="text-xl text-slate-900 dark:text-slate-400 leading-relaxed">
            Empowering developers with next-generation tools
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 border border-white/10 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
            We're on a mission to democratize powerful development tools. Every feature is designed with simplicity, 
            speed, and privacy in mind. No complexity, no compromises.
          </p>
        </motion.section>

        {/* What We Do */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 border border-white/10 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">What We Build</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              { icon: '🧮', title: 'Calculators', desc: 'Powerful calculation tools for every need' },
              { icon: '✍️', title: 'Text Tools', desc: 'Transform and analyze text effortlessly' },
              { icon: '🔐', title: 'Generators', desc: 'Create secure passwords, UUIDs, and more' },
              { icon: '💻', title: 'Dev Tools', desc: 'Essential utilities for developers' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-black text-slate-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 border border-white/10 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Heart, title: 'Always Free', desc: 'No hidden costs, subscriptions, or premium tiers. Forever.' },
              { icon: Lock, title: 'Privacy First', desc: 'Your data never leaves your browser. Complete privacy guaranteed.' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Instant results with zero uploads or processing delays.' },
              { icon: Smartphone, title: 'Mobile Ready', desc: 'Fully responsive design that works perfectly on any device.' },
            ].map((value, i) => (
              <motion.div
                key={i}
                className="flex gap-4"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-1">{value.title}</h3>
                  <p className="text-sm text-slate-900 dark:text-slate-400 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative rounded-3xl p-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 animate-gradient-shift" />
          <div className="absolute inset-0 pattern-dots opacity-10" />
          
          <div className="relative z-10 text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Users className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-black text-white mb-4">Join Thousands of Users</h2>
            <p className="text-white/90 leading-relaxed mb-6 max-w-2xl mx-auto">
              Developers, creators, and professionals worldwide trust our tools daily. 
              Got ideas? We'd love to hear from you!
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-xl"
              onClick={() => window.location.href = "/contact"}
            >
              <Rocket className="w-5 h-5" />
              Get in Touch
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
