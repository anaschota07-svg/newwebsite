import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for SimpleWebToolsBox - Learn how we protect your data and privacy.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">Last updated: February 1, 2026</p>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 space-y-6 transition-colors duration-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Welcome to SimpleWebToolsBox ("we," "our," or "us"). We are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our 
              website simplewebtoolsbox.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We want to be transparent about the data we collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li><strong>Tool Usage:</strong> Our tools work entirely in your browser. The data you enter into our tools never leaves your device.</li>
              <li><strong>Analytics:</strong> We use analytics services to understand how visitors use our website (page views, visit duration, etc.).</li>
              <li><strong>Cookies:</strong> We use cookies to remember your preferences (like dark mode settings).</li>
              <li><strong>Contact Information:</strong> If you contact us, we collect the information you provide (name, email, message).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li>Provide and maintain our tools and services</li>
              <li>Improve and optimize our website</li>
              <li>Respond to your inquiries and provide support</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All our tools process data entirely in your browser. We do not store, transmit, or have access to 
              the data you enter into our tools. Your theme preferences are stored locally in your browser using 
              localStorage and are not transmitted to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li><strong>Google AdSense:</strong> For displaying advertisements</li>
              <li><strong>Google Analytics:</strong> For website analytics (if implemented)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              These services may collect information as described in their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">6. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">7. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our website is not directed to children under 13. We do not knowingly collect personal information 
              from children under 13. If you are a parent or guardian and believe your child has provided us with 
              personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">9. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-blue-600 dark:text-blue-400 mt-2">
              Email: privacy@simplewebtoolsbox.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
