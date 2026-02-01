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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('toDate')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'toDate'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
            }`}
          >
            Timestamp → Date
          </button>
          <button
            onClick={() => setMode('toTimestamp')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'toTimestamp'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
            }`}
          >
            Date → Timestamp
          </button>
        </div>

        <div className="space-y-4">
          {mode === 'toDate' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Unix Timestamp (seconds)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="Enter Unix timestamp..."
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300 font-mono"
                />
                <button
                  onClick={handleCurrentTimestamp}
                  className="px-4 py-3 bg-gray-200 dark:bg-slate-900 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors text-sm"
                >
                  Now
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              />
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-slate-900 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
            >
              <RefreshCw className="h-5 w-5 inline mr-2" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm animate-slide-up transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
              {mode === 'toDate' ? 'Converted Date' : 'Unix Timestamp'}
            </label>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white transition-colors duration-300 font-mono text-lg">
            {result}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">About Unix Timestamps</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
          Unix timestamps represent the number of seconds that have elapsed since January 1, 1970 (Unix epoch). They're commonly used in programming and databases for storing dates and times.
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Standard format for date/time in many systems</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Easy to compare and calculate differences</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Timezone-independent representation</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
