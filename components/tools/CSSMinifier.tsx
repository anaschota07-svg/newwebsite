'use client'

import { useState } from 'react'
import { Copy, Minimize2 } from 'lucide-react'

export default function CSSMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const minifyCSS = () => {
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
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
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          📝 Input CSS
        </h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white font-mono resize-none"
          placeholder="Paste your CSS here..."
        />
        <button
          onClick={minifyCSS}
          className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Minimize2 className="h-5 w-5" />
          Minify CSS
        </button>
      </div>

      {output && (
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              ✨ Minified CSS
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
            className="w-full h-64 px-4 py-3 glass border border-white/10 rounded-xl text-slate-900 dark:text-white font-mono resize-none"
          />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass rounded-xl p-3 border border-white/10">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Original</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{stats.original}b</p>
            </div>
            <div className="glass rounded-xl p-3 border border-white/10">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Minified</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{stats.minified}b</p>
            </div>
            <div className="glass rounded-xl p-3 border border-white/10">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Saved</p>
              <p className="text-lg font-black text-emerald-600">{stats.saved}b</p>
            </div>
            <div className="glass rounded-xl p-3 border border-white/10">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Reduction</p>
              <p className="text-lg font-black text-emerald-600">{stats.percentage}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
