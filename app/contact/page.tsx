'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, MapPin, Send, Sparkles, CheckCircle, AlertCircle, Clock, HelpCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

// Use production URL as default, fallback to localhost only in development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : undefined)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Check if external API URL is configured, otherwise use Next.js API route
      const apiUrl = API_BASE_URL && API_BASE_URL !== 'http://localhost:3001' 
        ? `${API_BASE_URL}/api/contact`
        : '/api/contact'

      // If external API is not configured in production, show helpful message
      if (process.env.NODE_ENV === 'production' && (!API_BASE_URL || API_BASE_URL === 'http://localhost:3001')) {
        toast.error('Backend API is not configured. Please contact us directly at contact@simplewebtoolsbox.com')
        setIsSubmitting(false)
        return
      }

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      })

      if (response.data.success) {
        setSubmitStatus('success')
        toast.success(response.data.message || 'Thank you for your message! We\'ll get back to you within 24-48 hours.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
        toast.error(response.data.error || 'Failed to send message. Please try again.')
      }
    } catch (error: any) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      
      // Better error handling
      let errorMessage = 'Failed to send message. Please try again later.'
      
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        // Backend server not running or not accessible
        if (process.env.NODE_ENV === 'development') {
          errorMessage = 'Backend server is not running. Please start the server on port 3001 or configure NEXT_PUBLIC_API_BASE_URL in .env file. Using Next.js API route as fallback.'
        } else {
          errorMessage = 'Unable to connect to server. Please email us directly at contact@simplewebtoolsbox.com or try again later.'
        }
      } else if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage, { duration: 5000 })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            { icon: Mail, title: 'Email Us', value: 'contact@simplewebtoolsbox.com', gradient: 'from-cyan-500 to-blue-500', description: 'Send us an email and we\'ll respond within 24-48 hours' },
            { icon: MessageSquare, title: 'Contact Form', value: 'Use form below', gradient: 'from-blue-500 to-purple-500', description: 'Fill out the form below for the fastest response' },
            { icon: Clock, title: 'Response Time', value: 'Monday - Friday', gradient: 'from-purple-500 to-pink-500', description: 'We typically respond within 24-48 hours' },
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
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{item.description}</p>
                <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{item.value}</p>
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="tool-suggestion">Tool Suggestion</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="bug-report">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more..."
                className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white resize-none transition-all"
              ></textarea>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">Failed to send message. Please try again.</span>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className="group relative w-full px-8 py-4 rounded-2xl font-bold text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-shift" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            </div>
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
                  a: "We love feedback! Use the contact form above to suggest tools you'd like us to add."
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 border-b last:border-b"
                >
                  <h3 className="font-black text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-700/50"
          >
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">We're Here to Help</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Whether you have questions about our tools, suggestions for new features, or just want to share your feedback, 
              we're here to listen and help. Your input is invaluable in helping us create better resources for everyone.
            </p>
            <div className="space-y-3 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-500" />
                <span className="font-semibold">contact@simplewebtoolsbox.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-500" />
                <span>We typically respond within 24-48 hours during business days.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
