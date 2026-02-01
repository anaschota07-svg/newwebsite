'use client'

import { useState } from 'react'

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0,
    lines: text.split(/\n/).length,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
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
              placeholder="Start typing or paste your text here..."
              rows={12}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Copy Text
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stats.words}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{stats.characters}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.sentences}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 text-center">
          <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">{stats.paragraphs}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detailed Statistics</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Characters (with spaces):</span>
            <span className="font-semibold text-gray-900 dark:text-white">{stats.characters}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Characters (no spaces):</span>
            <span className="font-semibold text-gray-900 dark:text-white">{stats.charactersNoSpaces}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Lines:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{stats.lines}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Reading Time:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{stats.readingTime} min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
