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
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                📉 Min
              </label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full px-4 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all font-bold text-lg text-center"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                📈 Max
              </label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full px-4 py-4 glass border border-white/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white transition-all font-bold text-lg text-center"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                🔢 Count
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full px-4 py-4 glass border border-white/10 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-slate-900 dark:text-white transition-all font-bold text-lg text-center"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={generate}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              🎲 Generate Random Numbers
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-4 glass border border-white/10 hover:border-red-500/50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
              ✨ Generated Numbers ({results.length})
            </h3>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {results.map((num, index) => (
              <div
                key={index}
                className="px-5 py-3 glass border border-cyan-500/30 rounded-xl font-mono font-black text-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 text-slate-900 dark:text-white hover:scale-110 transition-all cursor-default"
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
