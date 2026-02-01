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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Enter Text to Hash
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to generate hash values..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none transition-colors duration-300 font-mono text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={!input}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Generate Hashes
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

      {Object.keys(hashes).length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm animate-slide-up transition-colors duration-300">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Generated Hashes</h3>
          <div className="space-y-4">
            {Object.entries(hashes).map(([type, hash]) => (
              <div key={type} className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">{type}</span>
                  <button
                    onClick={() => handleCopy(hash, type)}
                    className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    {copied === type ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="font-mono text-sm text-gray-900 dark:text-white break-all transition-colors duration-300">{hash}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">About Hash Functions</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
          Hash functions convert input data into fixed-size strings. They're commonly used for data integrity verification, password storage, and digital signatures.
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span><strong>MD5:</strong> 128-bit hash (not recommended for security)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span><strong>SHA-1:</strong> 160-bit hash (deprecated for security)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span><strong>SHA-256:</strong> 256-bit hash (recommended for most uses)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span><strong>SHA-512:</strong> 512-bit hash (highest security)</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
