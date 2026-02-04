'use client'

import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, MapPin, Send, Sparkles } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-dots opacity-20" />
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-bold gradient-text">Get in Touch</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Questions? Ideas? We're here to help
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, title: 'Email', value: 'contact@simplewebtoolsbox.com', gradient: 'from-cyan-500 to-blue-500' },
            { icon: MessageSquare, title: 'Support', value: 'support@simplewebtoolsbox.com', gradient: 'from-blue-500 to-purple-500' },
            { icon: MapPin, title: 'Location', value: 'Online Worldwide', gradient: 'from-purple-500 to-pink-500' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div className="glass rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all text-center">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.value}</p>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 blur-xl rounded-3xl transition-opacity -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8 border border-white/10 mb-12"
        >
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Message
              </label>
              <textarea
                rows={6}
                placeholder="Tell us more..."
                className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white resize-none transition-all"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full px-8 py-4 rounded-2xl font-bold text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-shift" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </span>
            </motion.button>
          </form>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8 border border-white/10"
        >
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Quick Answers</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Are all tools really free?',
                a: 'Yes! Every single tool is 100% free. No hidden costs, no subscriptions, no premium tiers.'
              },
              {
                q: 'Do I need to create an account?',
                a: 'Nope! All tools work instantly. No sign-up, no login, no hassle.'
              },
              {
                q: 'Is my data safe?',
                a: 'Absolutely! Everything processes locally in your browser. Your data never leaves your device.'
              },
              {
                q: 'Can I suggest new tools?',
                a: "We love feedback! Send us an email with your ideas and we'll consider them."
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                whileHover={{ x: 4 }}
              >
                <h3 className="font-black text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
