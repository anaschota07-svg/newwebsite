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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setType('words')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  type === 'words'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                Words
              </button>
              <button
                onClick={() => setType('sentences')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  type === 'sentences'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                Sentences
              </button>
              <button
                onClick={() => setType('paragraphs')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  type === 'paragraphs'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                Paragraphs
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Count
            </label>
            <input
              type="number"
              min="1"
              max={type === 'paragraphs' ? 20 : 100}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleGenerate}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Generate Lorem Ipsum
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
              Generated Text
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
            rows={10}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white resize-none transition-colors duration-300"
          />
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">About Lorem Ipsum</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
          Lorem Ipsum is placeholder text commonly used in the design and publishing industries. It's used to demonstrate the visual form of a document without relying on meaningful content.
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Perfect for design mockups and prototypes</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Helps focus on layout and typography</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Standard placeholder text in the industry</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
