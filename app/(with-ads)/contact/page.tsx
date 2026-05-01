'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MessageSquare, Clock, HelpCircle, Send } from 'lucide-react'
import { PageKicker } from '@/components/PageKicker'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '')

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
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      })

      if (response.data.success) {
        toast.success(response.data.message || "Thanks — we'll reply within 24–48 hours when possible.")
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error('Could not send. Please try again.')
      }
    } catch (error: unknown) {
      console.error('Contact form error:', error)
      let errorMessage = 'Could not send. Please try again later.'

      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
          errorMessage =
            process.env.NODE_ENV === 'development'
              ? 'Backend not reachable. Use the same origin in production or set NEXT_PUBLIC_API_BASE_URL.'
              : 'Connection issue. Email contact@simplewebtoolsbox.com directly.'
        } else if (error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
          errorMessage = String((error.response.data as { error?: string }).error || errorMessage)
        } else if (error.message) {
          errorMessage = error.message
        }
      }

      toast.error(errorMessage, { duration: 5000 })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const faqs = [
    { q: 'Are the tools free?', a: 'Yes. The public tool library has no login or paywall for standard use.' },
    { q: 'Do I need an account?', a: 'No. Tools and articles work without signing up.' },
    { q: 'Where does my data go?', a: 'Most utilities run in your browser; check each tool page for its privacy note.' },
    { q: 'Can I suggest a tool?', a: 'Use this form—we read serious suggestions and corrections.' },
  ]

  const fieldClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500'

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="max-w-2xl border-b border-slate-200 pb-8 dark:border-slate-800">
        <PageKicker icon={Mail} label="Contact" />
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Questions, corrections, tool ideas, or publishing inquiries. We aim to respond within a few business days.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-10">
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <Mail className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
            <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Email</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">contact@simplewebtoolsbox.com</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <MessageSquare className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
            <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Form</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Fastest for structured requests</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <Clock className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
            <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Timing</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Typically 24–48h on business days</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Send className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
              <h2 className="text-lg font-semibold">Message</h2>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${fieldClass} mt-1.5`}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${fieldClass} mt-1.5`}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${fieldClass} mt-1.5`}
                  required
                >
                  <option value="">Choose…</option>
                  <option value="general">General</option>
                  <option value="tool-suggestion">Tool suggestion</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="bug-report">Bug report</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`${fieldClass} mt-1.5 resize-y`}
                  required
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-slate-900 dark:border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Send
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <HelpCircle className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
              <h2 className="text-lg font-semibold">FAQ</h2>
            </div>
            <ul className="mt-4 space-y-4">
              {faqs.map((item) => (
                <li key={item.q} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.q}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.a}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Publisher</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>SimpleWebToolsBox Team</li>
              <li>
                <a href="mailto:contact@simplewebtoolsbox.com" className="text-sky-600 hover:underline dark:text-sky-400">
                  contact@simplewebtoolsbox.com
                </a>
              </li>
              <li>
                Policies:{' '}
                <Link href="/privacy-policy" className="text-sky-600 hover:underline dark:text-sky-400">
                  Privacy
                </Link>
                ,{' '}
                <Link href="/editorial-policy" className="text-sky-600 hover:underline dark:text-sky-400">
                  Editorial
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
