'use client'

import { useState } from 'react'

export default function TextCaseConverter() {
  const [text, setText] = useState('')

  const convertCase = (type: string) => {
    if (!text) return

    let converted = ''
    switch (type) {
      case 'upper':
        converted = text.toUpperCase()
        break
      case 'lower':
        converted = text.toLowerCase()
        break
      case 'title':
        converted = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        break
      case 'sentence':
        converted = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        break
      case 'camel':
        converted = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '')
        break
      case 'snake':
        converted = text.toLowerCase().replace(/\s+/g, '_')
        break
      default:
        converted = text
    }
    setText(converted)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              rows={8}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => convertCase('upper')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => convertCase('lower')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              lowercase
            </button>
            <button
              onClick={() => convertCase('title')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Title Case
            </button>
            <button
              onClick={() => convertCase('sentence')}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
            >
              Sentence case
            </button>
            <button
              onClick={() => convertCase('camel')}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors"
            >
              camelCase
            </button>
            <button
              onClick={() => convertCase('snake')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              snake_case
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => setText('')}
              disabled={!text}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {text && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 animate-slide-up">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Text Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{text.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{text.trim().split(/\s+/).filter(Boolean).length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{text.split(/[.!?]+/).filter(Boolean).length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{text.split(/\n\n+/).filter(Boolean).length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
