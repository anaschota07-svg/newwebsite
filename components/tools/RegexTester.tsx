'use client'

import { useState } from 'react'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [testString, setTestString] = useState('')
  const [flags, setFlags] = useState('g')
  const [matches, setMatches] = useState<string[]>([])

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags)
      const found = testString.match(regex)
      setMatches(found || [])
    } catch (error) {
      setMatches([])
    }
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🔍 Regex Pattern
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Pattern</label>
            <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="\d+" className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Flags</label>
            <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g, i, m" className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Test String</label>
            <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test..." className="w-full h-32 px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono resize-none" />
          </div>

          <button onClick={test} className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all">
            Test Regex
          </button>
        </div>
      </div>

      {matches.length > 0 && (
        <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            ✨ Matches ({matches.length})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {matches.map((match, i) => (
              <div key={i} className="glass rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <code className="text-sm font-mono text-slate-900 dark:text-white">{match}</code>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
