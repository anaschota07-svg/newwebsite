'use client'

import { useState } from 'react'
import { RefreshCw, Copy } from 'lucide-react'

export default function RandomNumberGenerator() {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [count, setCount] = useState('1')
  const [results, setResults] = useState<number[]>([])
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const minNum = parseInt(min) || 1
    const maxNum = parseInt(max) || 100
    const countNum = Math.max(1, Math.min(100, parseInt(count) || 1))

    const nums: number[] = []
    for (let i = 0; i < countNum; i++) {
      nums.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum)
    }
    setResults(nums)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(results.join(', '))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setResults([])
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Min
              </label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Max
              </label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Count
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={generate}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Generate Random Numbers
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-gray-200 dark:bg-slate-900 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm animate-slide-up transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
              Generated Numbers ({results.length})
            </h3>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((num, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg font-mono font-semibold transition-colors duration-300"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
