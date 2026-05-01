import { Metadata } from 'next'
import { Shield } from 'lucide-react'
import { PageKicker } from '@/components/PageKicker'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for SimpleWebToolsBox - Learn how we protect your data and privacy.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageKicker icon={Shield} label="Privacy" className="mb-2" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">Last updated: May 1, 2026</p>

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
              <li>
                <strong>Cookies:</strong> We use cookies and similar technologies to remember your preferences (for example,
                theme settings). Third-party advertisers (such as Google) may also set cookies or use identifiers to measure
                ad performance or to show more relevant ads, as explained below.
              </li>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Third-Party Services &amp; Advertising</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We rely on reputable partners for hosting, security, analytics, and (where enabled) monetization through display
              ads. These vendors may collect or process limited technical information when you browse our sites, including
              device or browser identifiers, coarse location derived from IP, and interaction data tied to ads and pages.
              We do not sell your personal contact information submitted through forms to advertisers.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li>
                <strong>Google AdSense:</strong> Used to serve ads you see on SimpleWebToolsBox. Google may use cookies,
                advertising identifiers, and similar signals to personalize or measure ads, consistent with{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google&apos;s Advertising Policies &amp; Technologies
                </a>
                . You can learn how Google uses data when you use our partners&apos; sites at{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google&apos;s partner sites policy page
                </a>
                .
              </li>
              <li>
                <strong>Opting out of personalized ads:</strong> Visit{' '}
                <a
                  href="https://adssettings.google.com/"
                  className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>{' '}
                or industry resources such as{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Ads Choices
                </a>{' '}
                for additional controls, depending on your region and browser.
              </li>
              <li>
                <strong>Google Analytics:</strong> We may enable Google Analytics or similar analytics products to measure
                traffic and site performance in aggregate.
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Each provider processes data according to its own privacy policy—for Google, see{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                google.com/privacy
              </a>
              .
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
