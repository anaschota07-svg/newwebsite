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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('toBinary')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'toBinary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
            }`}
          >
            Text → Binary
          </button>
          <button
            onClick={() => setMode('fromBinary')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'fromBinary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
            }`}
          >
            Binary → Text
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              {mode === 'toBinary' ? 'Text Input' : 'Binary Input (space-separated bytes)'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'toBinary' ? 'Enter text to convert...' : 'Enter binary (e.g., 01001000 01100101 01101100 01101100 01101111)...'}
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
              Convert
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
              {mode === 'toBinary' ? 'Binary Output' : 'Text Output'}
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
    </div>
  )
}
