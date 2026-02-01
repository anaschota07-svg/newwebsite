import { Metadata } from 'next'
import Link from 'next/link'
import { toolsData, categories } from '@/data/tools/toolsData'
import AdPlaceholder from '@/components/AdPlaceholder'

export const metadata: Metadata = {
  title: 'Free Online Tools',
  description: 'Browse our collection of free online tools including calculators, converters, generators, and more.',
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            All Online Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
            Explore our complete collection of free, fast, and easy-to-use online tools.
          </p>
        </div>

        <AdPlaceholder format="horizontal" />

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
              All Tools
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium border border-gray-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {toolsData.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl flex-shrink-0">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 transition-colors duration-300">
                    {tool.description}
                  </p>
                  <span className="inline-block text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full transition-colors duration-300">
                    {tool.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <AdPlaceholder format="horizontal" />
      </div>
    </div>
  )
}
