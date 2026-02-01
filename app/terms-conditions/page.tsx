import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for using SimpleWebToolsBox services.',
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Terms & Conditions</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">Last updated: February 1, 2026</p>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 space-y-6 transition-colors duration-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              By accessing and using SimpleWebToolsBox ("the Website"), you accept and agree to be bound by the 
              terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">2. Use of Services</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Our services are provided free of charge. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li>Use our tools for lawful purposes only</li>
              <li>Not attempt to harm, disable, or overburden our website</li>
              <li>Not use automated systems to access our services without permission</li>
              <li>Not copy, modify, or distribute our content without authorization</li>
              <li>Not use our services for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">3. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              All content on SimpleWebToolsBox, including text, graphics, logos, icons, and software, is the 
              property of SimpleWebToolsBox or its content suppliers and is protected by international copyright 
              laws. You may not reproduce, distribute, or create derivative works without our explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">4. Disclaimer of Warranties</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Our tools and services are provided "as is" without any warranties of any kind, either express or 
              implied. We do not warrant that our services will be uninterrupted, error-free, or secure. You use 
              our services at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">5. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              SimpleWebToolsBox and its owners, employees, or affiliates shall not be liable for any direct, 
              indirect, incidental, special, or consequential damages resulting from the use or inability to use 
              our services, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">6. Accuracy of Tools</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              While we strive to provide accurate and reliable tools, we cannot guarantee that all calculations 
              and results are 100% accurate. Users should verify important results independently and not rely 
              solely on our tools for critical decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">7. Third-Party Links</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Our website may contain links to third-party websites. We are not responsible for the content, 
              privacy policies, or practices of these external sites. Accessing third-party links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">8. Advertising</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              We use Google AdSense to display advertisements on our website. These ads help us keep our services 
              free. Advertisers may use cookies to serve ads based on your visits to this and other websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">9. Modifications to Service</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              We reserve the right to modify, suspend, or discontinue any part of our services at any time without 
              notice. We will not be liable to you or any third party for any modification, suspension, or 
              discontinuance of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">10. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              We may revise these terms and conditions at any time. By continuing to use our website after changes 
              are posted, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">11. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              These terms shall be governed by and construed in accordance with applicable international laws, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">12. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <p className="text-blue-600 dark:text-blue-400 mt-2">
              Email: legal@simplewebtoolsbox.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
