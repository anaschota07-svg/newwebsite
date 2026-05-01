'use client'

import { useState } from 'react'
import { Copy, Minimize2 } from 'lucide-react'

export default function JavaScriptMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const minifyJS = () => {
    const minified = input
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,()[\]])\s*/g, '$1')
      .trim()
    setOutput(minified)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = {
    original: input.length,
    minified: output.length,
    saved: input.length - output.length,
    percentage: input.length > 0 ? Math.round(((input.length - output.length) / input.length) * 100) : 0
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          📝 Input JavaScript
        </h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono resize-none"
          placeholder="Paste your JavaScript here..."
        />
        <button
          onClick={minifyJS}
          className="mt-4 w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Minimize2 className="h-5 w-5" />
          Minify JavaScript
        </button>
      </div>

      {output && (
        <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              ✨ Minified JavaScript
            </h3>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono resize-none"
          />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass rounded-xl p-3 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Original</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{stats.original}b</p>
            </div>
            <div className="glass rounded-xl p-3 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Minified</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{stats.minified}b</p>
            </div>
            <div className="glass rounded-xl p-3 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Saved</p>
              <p className="text-lg font-semibold text-emerald-600">{stats.saved}b</p>
            </div>
            <div className="glass rounded-xl p-3 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Reduction</p>
              <p className="text-lg font-semibold text-emerald-600">{stats.percentage}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
