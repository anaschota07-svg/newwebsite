'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function HTMLEncoderDecoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const htmlEncode = (text: string) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  const htmlDecode = (text: string) => {
    const div = document.createElement('div')
    div.innerHTML = text
    return div.textContent || div.innerText || ''
  }

  const handleConvert = () => {
    if (mode === 'encode') {
      setOutput(htmlEncode(input))
    } else {
      setOutput(htmlDecode(input))
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              {mode === 'encode' ? 'HTML to Encode' : 'HTML Entities to Decode'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter HTML to encode...' : 'Enter HTML entities to decode...'}
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none transition-colors duration-300 font-mono text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleConvert}
              disabled={!input}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {mode === 'encode' ? 'Encode HTML' : 'Decode HTML'}
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

      {output && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm animate-slide-up transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
              {mode === 'encode' ? 'Encoded HTML' : 'Decoded HTML'}
            </label>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={6}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white resize-none transition-colors duration-300 font-mono text-sm"
          />
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">About HTML Encoding</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
          HTML encoding converts special characters into HTML entities, making them safe to display in HTML documents. This prevents XSS attacks and ensures proper rendering.
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>&lt; becomes &amp;lt;</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>&gt; becomes &amp;gt;</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>&amp; becomes &amp;amp;</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
