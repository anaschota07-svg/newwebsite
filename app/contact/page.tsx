'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Clock, HelpCircle, Send, Sparkles } from 'lucide-react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

// Use external API if configured, otherwise fall back to Next.js internal route
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '')

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      })

      if (response.data.success) {
        toast.success(response.data.message || "Thank you for your message! We'll get back to you within 24-48 hours.")
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error: any) {
      console.error('Contact form error:', error)

      let errorMessage = 'Failed to send message. Please try again later.'

      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        if (process.env.NODE_ENV === 'development') {
          errorMessage = 'Backend server is not running. Please start the server on port 3001 or configure NEXT_PUBLIC_API_BASE_URL in .env file.'
        } else {
          errorMessage = 'Unable to connect to server. Please email us directly at contact@simplewebtoolsbox.com or try again later.'
        }
      } else if (error.response) {
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage
      } else if (error.message) {
        errorMessage = error.message
      }

      toast.error(errorMessage, { duration: 5000 })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const faqs = [
    {
      question: 'Are all tools really free?',
      answer: 'Yes! Every single tool is 100% free. No hidden costs, no subscriptions, no premium tiers.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'Nope! All tools work instantly. No sign-up, no login, no hassle.',
    },
    {
      question: 'Is my data safe?',
      answer: 'Absolutely! Everything processes locally in your browser. Your data never leaves your device.',
    },
    {
      question: 'Can I suggest new tools?',
      answer: "We love feedback! Use the contact form to suggest tools you'd like us to add.",
    },
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: "Send us an email and we'll respond within 24-48 hours",
      contact: 'contact@simplewebtoolsbox.com',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: MessageSquare,
      title: 'Contact Form',
      description: 'Fill out the form below for the fastest response',
      contact: 'Use form below',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      icon: Clock,
      title: 'Response Time',
      description: 'We typically respond within 24-48 hours',
      contact: 'Monday - Friday',
      gradient: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-dots opacity-20" />
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-bold gradient-text">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Have questions, suggestions, or feedback? We'd love to hear from you.
            Your input helps us build better tools for everyone.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div className="glass rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{method.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">{method.description}</p>
                <p className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm">{method.contact}</p>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 blur-xl rounded-3xl transition-opacity -z-10`} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Send Us a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
                  required
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all"
                  required
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
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white resize-none transition-all"
                  required
                  placeholder="Tell us how we can help..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="group relative w-full px-8 py-4 rounded-2xl font-bold text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
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

          {/* FAQ + Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* FAQ */}
            <div className="glass rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="glass rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-700/50">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">We're Here to Help</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Whether you have questions about our tools, suggestions for new features, or just want to share
                your feedback — we're here to listen. Your input is invaluable in helping us build better
                resources for everyone.
              </p>
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <span className="font-semibold">contact@simplewebtoolsbox.com</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-4">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
