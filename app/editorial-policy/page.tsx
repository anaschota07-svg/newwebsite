import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'SimpleWebToolsBox editorial policy — how we research, write, and maintain our how-to guides and tutorials.',
  alternates: {
    canonical: 'https://simplewebtoolsbox.com/editorial-policy',
  },
}

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Editorial Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: February 2026</p>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Commitment to Quality</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At SimpleWebToolsBox, every guide and how-to article is created with the goal of being genuinely useful, 
              accurate, and actionable. We follow a strict editorial process to ensure that all published content 
              meets a high standard of quality, accuracy, and usefulness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Who Creates Our Content</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Our content is created and reviewed by <strong>Mohd Washid</strong>, a Flutter developer and web tools 
              creator with expertise in software development, productivity tools, and digital technology. All articles 
              are written based on hands-on experience, technical knowledge, and thorough research.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We do not publish AI-generated content without human review, editing, and factual verification. 
              Every article reflects real expertise and practical experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Research Standards</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Before publishing any guide or article, we:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Verify all technical information from authoritative, primary sources</li>
              <li>Test every tool, formula, and method described in our guides</li>
              <li>Cross-reference facts with official documentation where applicable</li>
              <li>Avoid publishing speculation or unverified claims as fact</li>
              <li>Review content for accuracy before publication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Content Guidelines</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              All content published on SimpleWebToolsBox must meet the following criteria:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Accurate:</strong> All information must be factually correct and technically verified</li>
              <li><strong>Original:</strong> Content must be written originally — we do not copy or scrape content from other sources</li>
              <li><strong>Helpful:</strong> Every article must solve a real problem or answer a genuine question</li>
              <li><strong>Clear:</strong> Content must be written in plain, easy-to-understand language</li>
              <li><strong>Complete:</strong> Articles must fully cover the topic with enough detail to be actionable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Corrections and Updates</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We are committed to keeping our content accurate and up to date. If we discover an error or if 
              technology changes, we update the article promptly. Articles display a "Last updated" date so 
              readers know when the content was last reviewed. If you spot an inaccuracy, please contact us 
              at <a href="mailto:contact@simplewebtoolsbox.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">contact@simplewebtoolsbox.com</a> — 
              we appreciate corrections from our readers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Independence and Objectivity</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              SimpleWebToolsBox is an independent website. Our editorial opinions are not influenced by advertisers 
              or third parties. We do not accept payment for positive reviews or editorial coverage. All 
              tool recommendations and guides reflect our genuine assessment and experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Advertising Disclosure</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              SimpleWebToolsBox is supported by advertising revenue through Google AdSense. Advertisements 
              are clearly labeled and separated from editorial content. Advertising relationships do not 
              influence our editorial decisions or content quality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Contact Our Editorial Team</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For editorial inquiries, corrections, or content feedback, contact us at{' '}
              <a href="mailto:contact@simplewebtoolsbox.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                contact@simplewebtoolsbox.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
