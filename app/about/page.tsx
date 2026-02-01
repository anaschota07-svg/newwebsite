import { Metadata } from 'next'
import { Users, Target, Heart, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about SimpleWebToolsBox and our mission to provide free, easy-to-use online tools for everyone.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            About SimpleWebToolsBox
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Making online tools accessible to everyone
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 mb-8 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Our Mission</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            At SimpleWebToolsBox, our mission is to provide free, fast, and easy-to-use online tools that help people 
            accomplish everyday tasks more efficiently. We believe that powerful tools shouldn't be complicated or 
            expensive, which is why all our tools are completely free and require no registration.
          </p>
        </section>

        {/* What We Do */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 mb-8 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">What We Do</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
            We create and maintain a growing collection of online tools that cover various categories including:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2 transition-colors duration-300">✓</span>
              <span><strong>Calculators:</strong> Age, BMI, and more specialized calculators</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2 transition-colors duration-300">✓</span>
              <span><strong>Text Tools:</strong> Case converters, word counters, and text analyzers</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2 transition-colors duration-300">✓</span>
              <span><strong>Generators:</strong> Password generators, QR codes, and more</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2 transition-colors duration-300">✓</span>
              <span><strong>Developer Tools:</strong> JSON formatters, color pickers, and coding utilities</span>
            </li>
          </ul>
        </section>

        {/* Our Values */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 mb-8 transition-colors duration-300">
          <div className="flex items-center mb-6">
            <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">🆓 Always Free</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                All our tools are completely free to use with no hidden costs or premium tiers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">🔒 Privacy First</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                Your data never leaves your browser. We don't store or track your information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">⚡ Lightning Fast</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                All tools work instantly in your browser without any uploads or processing delays.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">📱 Mobile Friendly</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                All our tools are fully responsive and work perfectly on any device.
              </p>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Join Our Community</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
            SimpleWebToolsBox serves thousands of users every month who trust our tools for their daily tasks. 
            Whether you're a student, professional, developer, or just someone who needs a quick tool, we're here to help.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Have suggestions for new tools or features? We'd love to hear from you! Feel free to reach out through 
            our contact page.
          </p>
        </section>
      </div>
    </div>
  )
}
