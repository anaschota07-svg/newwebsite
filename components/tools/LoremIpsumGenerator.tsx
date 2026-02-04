'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export default function LoremIpsumGenerator() {
  const [output, setOutput] = useState('')
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs')
  const [count, setCount] = useState(3)
  const [copied, setCopied] = useState(false)

  const generateWords = (num: number) => {
    const words = loremText.split(' ')
    const result: string[] = []
    for (let i = 0; i < num; i++) {
      result.push(words[i % words.length])
    }
    return result.join(' ')
  }

  const generateSentences = (num: number) => {
    const sentences = loremText.split('. ').filter(s => s.length > 0)
    const result: string[] = []
    for (let i = 0; i < num; i++) {
      result.push(sentences[i % sentences.length] + '.')
    }
    return result.join(' ')
  }

  const generateParagraphs = (num: number) => {
    const result: string[] = []
    for (let i = 0; i < num; i++) {
      result.push(loremText)
    }
    return result.join('\n\n')
  }

  const handleGenerate = () => {
    let generated = ''
    if (type === 'words') {
      generated = generateWords(count)
    } else if (type === 'sentences') {
      generated = generateSentences(count)
    } else {
      generated = generateParagraphs(count)
    }
    setOutput(generated)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setOutput('')
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              📝 Generate Type
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setType('words')}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                  type === 'words'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                Words
              </button>
              <button
                onClick={() => setType('sentences')}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                  type === 'sentences'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-purple-500/50'
                }`}
              >
                Sentences
              </button>
              <button
                onClick={() => setType('paragraphs')}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                  type === 'paragraphs'
                    ? 'bg-gradient-to-r from-pink-500 to-orange-600 text-white shadow-lg shadow-pink-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-pink-500/50'
                }`}
              >
                Paragraphs
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              🔢 Count
            </label>
            <input
              type="number"
              min="1"
              max={type === 'paragraphs' ? 20 : 100}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all font-semibold text-lg"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              ⚡ Generate Lorem Ipsum
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
              ✨ Generated Text
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
            rows={10}
            className="w-full px-5 py-4 glass border border-white/10 rounded-xl text-slate-900 dark:text-white resize-none leading-relaxed"
          />
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-cyan-500/20 shadow-lg bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
          💡 About Lorem Ipsum
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 leading-relaxed font-semibold">
          Lorem Ipsum is placeholder text commonly used in the design and publishing industries. It's used to demonstrate the visual form of a document without relying on meaningful content.
        </p>
        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-cyan-500 font-bold">✦</span>
            <span>Perfect for design mockups and prototypes</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Helps focus on layout and typography</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-pink-500 font-bold">✦</span>
            <span>Standard placeholder text in the industry</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
