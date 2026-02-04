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
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              ✍️ Enter Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              rows={8}
              className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white resize-none transition-all font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => convertCase('upper')}
              className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-cyan-500/20 transition-all"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => convertCase('lower')}
              className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-md hover:shadow-purple-500/20 transition-all"
            >
              lowercase
            </button>
            <button
              onClick={() => convertCase('title')}
              className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-md hover:shadow-emerald-500/20 transition-all"
            >
              Title Case
            </button>
            <button
              onClick={() => convertCase('sentence')}
              className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-md hover:shadow-amber-500/20 transition-all"
            >
              Sentence case
            </button>
            <button
              onClick={() => convertCase('camel')}
              className="px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-md hover:shadow-pink-500/20 transition-all"
            >
              camelCase
            </button>
            <button
              onClick={() => convertCase('snake')}
              className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all"
            >
              snake_case
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className="flex-1 px-4 py-3 glass border border-white/10 hover:border-emerald-500 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all disabled:cursor-not-allowed"
            >
              📋 Copy to Clipboard
            </button>
            <button
              onClick={() => setText('')}
              disabled={!text}
              className="flex-1 px-4 py-3 glass border border-white/10 hover:border-red-500 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all disabled:cursor-not-allowed"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      {text && (
        <div className="glass rounded-2xl p-8 border border-cyan-500/20 shadow-lg animate-slide-up bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
            📊 Text Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center glass rounded-xl p-5 border border-cyan-500/30">
              <div className="text-4xl font-black text-cyan-500 mb-2">{text.length}</div>
              <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Characters</div>
            </div>
            <div className="text-center glass rounded-xl p-5 border border-purple-500/30">
              <div className="text-4xl font-black text-purple-500 mb-2">{text.trim().split(/\s+/).filter(Boolean).length}</div>
              <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Words</div>
            </div>
            <div className="text-center glass rounded-xl p-5 border border-emerald-500/30">
              <div className="text-4xl font-black text-emerald-500 mb-2">{text.split(/[.!?]+/).filter(Boolean).length}</div>
              <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Sentences</div>
            </div>
            <div className="text-center glass rounded-xl p-5 border border-pink-500/30">
              <div className="text-4xl font-black text-pink-500 mb-2">{text.split(/\n\n+/).filter(Boolean).length}</div>
              <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Paragraphs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
