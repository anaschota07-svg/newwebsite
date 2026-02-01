import { Metadata } from 'next'
import { Mail, MessageSquare, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SimpleWebToolsBox team. We\'d love to hear from you!',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Have questions or suggestions? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center transition-colors duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 transition-colors duration-300">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Email Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              contact@simplewebtoolsbox.com
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center transition-colors duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 transition-colors duration-300">
              <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400 transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              support@simplewebtoolsbox.com
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center transition-colors duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4 transition-colors duration-300">
              <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400 transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Location</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Online Worldwide
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help you?"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Message
              </label>
              <textarea
                rows={6}
                placeholder="Tell us more about your inquiry..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none transition-colors duration-300"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Are all tools really free?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                Yes! All our tools are completely free to use with no hidden costs, subscriptions, or premium tiers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Do I need to create an account?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                No registration required. All tools work instantly without any sign-up process.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Is my data safe?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                Absolutely! All our tools work entirely in your browser. Your data never leaves your device.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Can I suggest new tools?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                We'd love to hear your suggestions! Please send us an email with your ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
