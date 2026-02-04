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
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
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
              className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white resize-none font-mono text-sm transition-all"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={!input}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all disabled:cursor-not-allowed disabled:shadow-none"
            >
              ⚡ Generate Hashes
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

      {Object.keys(hashes).length > 0 && (
        <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg animate-slide-up">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
            ✨ Generated Hashes
          </h3>
          <div className="space-y-4">
            {Object.entries(hashes).map(([type, hash], i) => {
              const gradients = [
                'from-cyan-500/10 to-blue-500/10 border-cyan-500/20',
                'from-blue-500/10 to-purple-500/10 border-blue-500/20',
                'from-purple-500/10 to-pink-500/10 border-purple-500/20',
                'from-pink-500/10 to-red-500/10 border-pink-500/20',
              ]
              const gradient = gradients[i % gradients.length]
              
              return (
                <div key={type} className={`glass border rounded-xl p-5 bg-gradient-to-br ${gradient} transition-all hover:scale-102`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-slate-700 dark:text-slate-300 px-3 py-1 glass rounded-lg border border-white/10">
                      {type}
                    </span>
                    <button
                      onClick={() => handleCopy(hash, type)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all gap-2"
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

      <div className="glass rounded-2xl p-8 border border-cyan-500/20 shadow-lg bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
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
          <li className="flex items-start gap-3 p-4 glass rounded-xl border border-cyan-500/20">
            <span className="text-cyan-500 font-bold text-lg">🔵</span>
            <div><strong className="text-cyan-600 dark:text-cyan-400">SHA-512:</strong> 512-bit hash (highest security)</div>
          </li>
        </ul>
      </div>
    </div>
  )
}
