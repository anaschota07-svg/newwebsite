'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function TextToBinary() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'toBinary' | 'fromBinary'>('toBinary')
  const [copied, setCopied] = useState(false)

  const textToBinary = (text: string) => {
    return text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ')
  }

  const binaryToText = (binary: string) => {
    try {
      return binary
        .split(' ')
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join('')
    } catch (error) {
      return 'Error: Invalid binary string'
    }
  }

  const handleConvert = () => {
    if (mode === 'toBinary') {
      setOutput(textToBinary(input))
    } else {
      setOutput(binaryToText(input))
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
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode('toBinary')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'toBinary'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            📝 Text → Binary
          </button>
          <button
            onClick={() => setMode('fromBinary')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'fromBinary'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-purple-500/50'
            }`}
          >
            💾 Binary → Text
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {mode === 'toBinary' ? '📝 Text Input' : '💾 Binary Input (space-separated bytes)'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'toBinary' ? 'Enter text to convert...' : 'Enter binary (e.g., 01001000 01100101 01101100 01101100 01101111)...'}
              rows={6}
              className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white resize-none font-mono text-sm transition-all"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleConvert}
              disabled={!input}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all disabled:cursor-not-allowed disabled:shadow-none"
            >
              ⚡ Convert
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-4 glass border border-white/10 hover:border-red-500/50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
              {mode === 'toBinary' ? '✨ Binary Output' : '📄 Text Output'}
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
            className="w-full px-5 py-4 glass border border-white/10 rounded-xl text-slate-900 dark:text-white resize-none font-mono text-sm"
          />
        </div>
      )}
    </div>
  )
}
