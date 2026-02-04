'use client'

import { useState, useEffect } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [date, setDate] = useState('')
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toTimestamp')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (mode === 'toTimestamp' && date) {
      const dateObj = new Date(date)
      if (!isNaN(dateObj.getTime())) {
        setResult(Math.floor(dateObj.getTime() / 1000).toString())
      }
    } else if (mode === 'toDate' && timestamp) {
      const ts = parseInt(timestamp)
      if (!isNaN(ts)) {
        const dateObj = new Date(ts * 1000)
        setResult(dateObj.toLocaleString())
      }
    }
  }, [date, timestamp, mode])

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString())
    setMode('toDate')
  }

  const handleClear = () => {
    setTimestamp('')
    setDate('')
    setResult('')
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode('toDate')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'toDate'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            ⏰ Timestamp → Date
          </button>
          <button
            onClick={() => setMode('toTimestamp')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'toTimestamp'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-purple-500/50'
            }`}
          >
            📅 Date → Timestamp
          </button>
        </div>

        <div className="space-y-5">
          {mode === 'toDate' ? (
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                ⏱️ Unix Timestamp (seconds)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="Enter Unix timestamp..."
                  className="flex-1 px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all font-mono font-semibold text-lg"
                />
                <button
                  onClick={handleCurrentTimestamp}
                  className="px-6 py-4 glass border border-white/10 hover:border-cyan-500 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
                >
                  🕐 Now
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                📆 Date & Time
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white transition-all font-semibold"
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="flex-1 px-6 py-4 glass border border-white/10 hover:border-red-500/50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
            >
              <RefreshCw className="h-5 w-5 inline mr-2" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg animate-slide-up bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
              {mode === 'toDate' ? '✨ Converted Date' : '⏱️ Unix Timestamp'}
            </label>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <div className="px-6 py-5 glass border border-white/10 rounded-xl text-slate-900 dark:text-white font-mono text-xl font-bold text-center">
            {result}
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-cyan-500/20 shadow-lg bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
          💡 About Unix Timestamps
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 leading-relaxed font-semibold">
          Unix timestamps represent the number of seconds that have elapsed since January 1, 1970 (Unix epoch). They're commonly used in programming and databases for storing dates and times.
        </p>
        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-cyan-500 font-bold">✦</span>
            <span>Standard format for date/time in many systems</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Easy to compare and calculate differences</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-pink-500 font-bold">✦</span>
            <span>Timezone-independent representation</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
