'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'

export default function CSVToJSON() {
  const [csv, setCSV] = useState('')
  const [json, setJSON] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      const lines = csv.trim().split('\n')
      const headers = lines[0].split(',').map(h => h.trim())
      const result = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim())
        return headers.reduce((obj: any, header, index) => {
          obj[header] = values[index]
          return obj
        }, {})
      })
      setJSON(JSON.stringify(result, null, 2))
    } catch (error) {
      setJSON('Error converting CSV to JSON')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          📝 CSV Input
        </h3>
        <textarea value={csv} onChange={(e) => setCSV(e.target.value)} placeholder="name,age,city\nJohn,30,NYC\nJane,25,LA" className="w-full h-64 px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white font-mono resize-none" />
        <button onClick={convert} className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all">
          🔄 Convert to JSON
        </button>
      </div>

      {json && (
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              ✨ JSON Output
            </h3>
            <button onClick={handleCopy} className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl flex items-center gap-2">
              <Copy className="h-4 w-4" />
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="w-full h-64 px-4 py-3 glass border border-white/10 rounded-xl text-slate-900 dark:text-white text-sm overflow-auto">
            {json}
          </pre>
        </div>
      )}
    </div>
  )
}
