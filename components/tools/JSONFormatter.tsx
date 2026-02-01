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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Input JSON
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
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white font-mono text-sm resize-none transition-colors duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={formatJSON}
              disabled={!input}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Format
            </button>
            <button
              onClick={minifyJSON}
              disabled={!input}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Minify
            </button>
            <button
              onClick={validateJSON}
              disabled={!input}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Validate
            </button>
            <button
              onClick={clearAll}
              disabled={!input && !output}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>

          {isValid !== null && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${isValid ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
              {isValid ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
              <span className="font-medium">{isValid ? 'Valid JSON' : 'Invalid JSON'}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-700 dark:text-red-400 font-mono">{error}</p>
            </div>
          )}
        </div>
      </div>

      {output && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm animate-slide-up transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
              Output
            </label>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800-secondary rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <pre className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white font-mono text-sm overflow-x-auto transition-colors duration-300">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}
