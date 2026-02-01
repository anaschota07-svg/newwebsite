import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for SimpleWebToolsBox - Important information about using our tools and services.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Disclaimer</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">Last updated: February 1, 2026</p>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 space-y-6 transition-colors duration-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">General Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              The information and tools provided by SimpleWebToolsBox ("we," "us," or "our") on simplewebtoolsbox.com 
              (the "Site") are for general informational and educational purposes only. All information on the Site 
              is provided in good faith, however we make no representation or warranty of any kind, express or implied, 
              regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information 
              or tools on the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">No Professional Advice</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              The tools and information provided on our website are not intended as professional advice. Specifically:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-3">
              <li><strong>Health Tools (BMI Calculator):</strong> Results are not medical advice. Consult healthcare professionals for health-related concerns.</li>
              <li><strong>Financial Tools:</strong> Results should not be used as the sole basis for financial decisions.</li>
              <li><strong>Legal Information:</strong> Nothing on this site constitutes legal advice.</li>
              <li><strong>Technical Tools:</strong> Always verify critical code or technical implementations independently.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Accuracy of Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              While we strive to ensure that all tools provide accurate results, we cannot guarantee 100% accuracy. 
              Calculation methods, algorithms, and formulas may have limitations. Users should:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-3">
              <li>Verify important results using multiple sources</li>
              <li>Not rely solely on our tools for critical decisions</li>
              <li>Understand the limitations of automated calculations</li>
              <li>Seek professional advice when needed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">External Links Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              The Site may contain links to external websites that are not provided or maintained by us. We do not 
              guarantee the accuracy, relevance, timeliness, or completeness of any information on these external 
              websites. We have no control over the nature, content, and availability of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Use at Your Own Risk</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred 
              as a result of the use of the Site or reliance on any information provided on the Site. Your use of 
              the Site and your reliance on any information on the Site is solely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Errors and Omissions</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              While we make every effort to ensure that the information on this Site is accurate and up-to-date, 
              we make no representations or warranties of any kind about the completeness, accuracy, reliability, 
              suitability, or availability of the information, tools, or related graphics contained on the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Changes and Updates</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              We reserve the right to modify, add, or remove any content or tools from the Site at any time without 
              prior notice. We are not obligated to update information on the Site, and you should not assume that 
              information is current or that it will be updated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Some of our tools may use third-party APIs or services (such as Google Charts API for QR codes). 
              We are not responsible for the availability, accuracy, or functionality of these third-party services. 
              Service interruptions or changes to third-party APIs may affect tool functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Advertisements</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              We display advertisements through Google AdSense. We are not responsible for the content of 
              advertisements displayed on our Site. The appearance of advertisements does not constitute an 
              endorsement by us of the advertised products or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              If you have any questions about this Disclaimer, please contact us at:
            </p>
            <p className="text-blue-600 dark:text-blue-400 mt-2">
              Email: legal@simplewebtoolsbox.com
            </p>
          </section>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> By using SimpleWebToolsBox, you acknowledge that you have read, 
              understood, and agree to this Disclaimer. If you do not agree with any part of this Disclaimer, 
              you should not use our Site or services.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
