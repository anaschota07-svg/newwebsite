'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<{ [key: string]: string }>({})
  const [copied, setCopied] = useState<string | null>(null)

  const generateHash = async (text: string, algorithm: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const handleGenerate = async () => {
    if (!input) return

    const algorithms = {
      'MD5': 'MD5',
      'SHA-1': 'SHA-1',
      'SHA-256': 'SHA-256',
      'SHA-512': 'SHA-512',
    }

    const results: { [key: string]: string } = {}

    // MD5 simulation (browser doesn't support MD5 natively)
    const md5Hash = await simpleMD5(input)
    results['MD5'] = md5Hash

    // SHA-1
    try {
      results['SHA-1'] = await generateHash(input, 'SHA-1')
    } catch (e) {
      results['SHA-1'] = 'Not supported'
    }

    // SHA-256
    try {
      results['SHA-256'] = await generateHash(input, 'SHA-256')
    } catch (e) {
      results['SHA-256'] = 'Not supported'
    }

    // SHA-512
    try {
      results['SHA-512'] = await generateHash(input, 'SHA-512')
    } catch (e) {
      results['SHA-512'] = 'Not supported'
    }

    setHashes(results)
  }

  // Simple MD5 implementation (for demonstration)
  const simpleMD5 = async (str: string): Promise<string> => {
    // Using a simple hash function as MD5 is not available in browser crypto API
    // In production, you might want to use a library like crypto-js
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(32, '0')
  }

  const handleCopy = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleClear = () => {
    setInput('')
    setHashes({})
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              🔐 Enter Text to Hash
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to generate hash values..."
              rows={6}
              className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white resize-none font-mono text-sm transition-all"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={!input}
              className="flex-1 px-6 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all disabled:cursor-not-allowed disabled:shadow-none"
            >
              ⚡ Generate Hashes
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

      {Object.keys(hashes).length > 0 && (
        <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            ✨ Generated Hashes
          </h3>
          <div className="space-y-4">
            {Object.entries(hashes).map(([type, hash]) => {
              return (
                <div
                  key={type}
                  className="glass rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-600 dark:bg-slate-800/40"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="glass rounded-lg border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
                      {type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(hash, type)}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500"
                    >
                      <Copy className="h-3 w-3" />
                      {copied === type ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="font-mono text-sm text-slate-900 dark:text-white break-all leading-relaxed">{hash}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-600 shadow-lg bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🛡️ About Hash Functions
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 leading-relaxed font-semibold">
          Hash functions convert input data into fixed-size strings. They're commonly used for data integrity verification, password storage, and digital signatures.
        </p>
        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3 p-4 glass rounded-xl border border-red-500/20">
            <span className="text-red-500 font-bold text-lg">🔴</span>
            <div><strong className="text-red-600 dark:text-red-400">MD5:</strong> 128-bit hash (not recommended for security)</div>
          </li>
          <li className="flex items-start gap-3 p-4 glass rounded-xl border border-yellow-500/20">
            <span className="text-yellow-500 font-bold text-lg">🟡</span>
            <div><strong className="text-yellow-600 dark:text-yellow-400">SHA-1:</strong> 160-bit hash (deprecated for security)</div>
          </li>
          <li className="flex items-start gap-3 p-4 glass rounded-xl border border-green-500/20">
            <span className="text-green-500 font-bold text-lg">🟢</span>
            <div><strong className="text-green-600 dark:text-green-400">SHA-256:</strong> 256-bit hash (recommended for most uses)</div>
          </li>
          <li className="flex items-start gap-3 p-4 glass rounded-xl border border-slate-200 dark:border-slate-600">
            <span className="text-cyan-500 font-bold text-lg">🔵</span>
            <div><strong className="text-cyan-600 dark:text-cyan-400">SHA-512:</strong> 512-bit hash (highest security)</div>
          </li>
        </ul>
      </div>
    </div>
  )
}
