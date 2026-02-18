import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DMCA Policy',
  description: 'DMCA copyright policy for SimpleWebToolsBox — how to report copyright infringement.',
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/dmca',
  },
}

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">DMCA Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: February 2026</p>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Copyright Notice</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              SimpleWebToolsBox respects the intellectual property rights of others and expects our users 
              to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), 
              we will respond promptly to claims of copyright infringement that are reported to our 
              designated copyright agent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Original Content</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All articles, guides, tool descriptions, and written content on SimpleWebToolsBox are original 
              works created by our editorial team. All tools on this website are built and maintained by 
              SimpleWebToolsBox. Unauthorized reproduction or distribution of our content without written 
              permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How to File a DMCA Takedown Notice</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you believe that content on SimpleWebToolsBox infringes upon your copyrighted work, 
              please send a written notice to our designated agent containing the following information:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Identification of the copyrighted work</strong> — Describe the copyrighted work 
                you claim has been infringed, or if multiple works are covered by a single notification, 
                a representative list of such works.
              </li>
              <li>
                <strong>Identification of the infringing material</strong> — Identify the material that 
                you claim is infringing and provide its URL or location on our website so we can find it.
              </li>
              <li>
                <strong>Your contact information</strong> — Provide your name, address, telephone number, 
                and email address.
              </li>
              <li>
                <strong>Good faith statement</strong> — Include a statement that you have a good faith 
                belief that the use of the material is not authorized by the copyright owner, its agent, 
                or the law.
              </li>
              <li>
                <strong>Accuracy statement</strong> — Include a statement, made under penalty of perjury, 
                that the information in your notice is accurate and that you are the copyright owner or 
                authorized to act on the copyright owner's behalf.
              </li>
              <li>
                <strong>Your signature</strong> — Include your physical or electronic signature.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How to Submit Your Notice</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Send your DMCA notice by email to:{' '}
              <a href="mailto:contact@simplewebtoolsbox.com" className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                contact@simplewebtoolsbox.com
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              Please use "DMCA Takedown Request" as the subject line. We will review and respond to 
              legitimate DMCA notices within 5 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Counter Notification</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you believe that material you posted was removed or disabled by mistake or misidentification, 
              you may file a counter notification with us. A counter notification must include your name, 
              address, phone number, identification of the removed material and its original location, 
              a statement under penalty of perjury that the material was removed by mistake or 
              misidentification, and your physical or electronic signature.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Repeat Infringers</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In accordance with the DMCA and other applicable law, SimpleWebToolsBox has adopted a 
              policy of terminating, in appropriate circumstances and at our sole discretion, users 
              who are deemed to be repeat infringers.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
