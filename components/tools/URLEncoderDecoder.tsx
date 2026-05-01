'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function URLEncoderDecoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(input)
      setOutput(encoded)
    } catch (error) {
      setOutput('Error: Invalid input')
    }
  }

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(input)
      setOutput(decoded)
    } catch (error) {
      setOutput('Error: Invalid URL encoded string')
    }
  }

  const handleConvert = () => {
    if (mode === 'encode') {
      handleEncode()
    } else {
      handleDecode()
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
      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'encode'
                ? 'bg-slate-900 text-white shadow-sm dark:bg-sky-600'
                : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500/50'
            }`}
          >
            🔒 Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'decode'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-500/50'
            }`}
          >
            🔓 Decode
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {mode === 'encode' ? '🌐 URL to Encode' : '🔐 URL Encoded String'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter URL or text to encode...' : 'Enter URL encoded string to decode...'}
              rows={6}
              className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white resize-none font-mono text-sm transition-all"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleConvert}
              className="flex-1 px-6 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              {mode === 'encode' ? '⚡ Encode URL' : '🔓 Decode URL'}
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-4 glass border border-slate-200 dark:border-slate-700 hover:border-red-500/50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
              {mode === 'encode' ? '✨ Encoded URL' : '📄 Decoded URL'}
            </label>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={6}
            className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white resize-none font-mono text-sm"
          />
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-600 shadow-lg bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          💡 About URL Encoding
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 leading-relaxed font-semibold">
          URL encoding converts characters into a format that can be safely transmitted over the internet. Special characters, spaces, and non-ASCII characters are replaced with percent-encoded values.
        </p>
        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-cyan-500 font-bold">✦</span>
            <span className="font-mono">Spaces become %20</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Special characters are encoded for safe transmission</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-pink-500 font-bold">✦</span>
            <span>Essential for creating valid URLs with special characters</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
