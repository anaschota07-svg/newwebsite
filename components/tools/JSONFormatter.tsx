'use client'

import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'

export default function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
      setIsValid(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
      setIsValid(false)
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
      setIsValid(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
      setIsValid(false)
    }
  }

  const validateJSON = () => {
    try {
      JSON.parse(input)
      setError('')
      setIsValid(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setIsValid(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setIsValid(null)
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              📋 Input JSON
            </label>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setIsValid(null)
                setError('')
              }}
              placeholder='{"name": "John", "age": 30}'
              rows={10}
              className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono text-sm resize-none transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={formatJSON}
              disabled={!input}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all disabled:cursor-not-allowed disabled:shadow-none"
            >
              ✨ Format
            </button>
            <button
              onClick={minifyJSON}
              disabled={!input}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all disabled:cursor-not-allowed disabled:shadow-none"
            >
              📦 Minify
            </button>
            <button
              onClick={validateJSON}
              disabled={!input}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all disabled:cursor-not-allowed disabled:shadow-none"
            >
              ✓ Validate
            </button>
            <button
              onClick={clearAll}
              disabled={!input && !output}
              className="px-6 py-3 glass border border-slate-200 dark:border-slate-700 hover:border-red-500/50 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all disabled:cursor-not-allowed"
            >
              🗑️ Clear
            </button>
          </div>

          {isValid !== null && (
            <div className={`flex items-center gap-3 p-4 rounded-xl glass border ${isValid ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-red-500/50 bg-red-500/10'} transition-all`}>
              {isValid ? <Check className="h-6 w-6 text-emerald-500" /> : <X className="h-6 w-6 text-red-500" />}
              <span className={`font-semibold text-lg ${isValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}
              </span>
            </div>
          )}

          {error && (
            <div className="glass border border-red-500/50 bg-red-500/10 rounded-xl p-4">
              <p className="text-sm text-red-600 dark:text-red-400 font-mono font-bold">{error}</p>
            </div>
          )}
        </div>
      </div>

      {output && (
        <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
              ✨ Output
            </label>
            <button
              onClick={copyToClipboard}
              className="p-3 glass border border-slate-200 dark:border-slate-700 hover:border-cyan-500 rounded-xl transition-all"
              title="Copy to clipboard"
            >
              <Copy className="h-5 w-5 text-cyan-500" />
            </button>
          </div>
          <pre className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono text-sm overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}
