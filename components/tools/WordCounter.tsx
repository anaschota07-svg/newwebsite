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
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              ✍️ Enter Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              rows={12}
              className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white resize-none transition-all font-semibold"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className="flex-1 px-4 py-3 glass border border-white/10 hover:border-emerald-500 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all disabled:cursor-not-allowed"
            >
              📋 Copy Text
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-6 border border-cyan-500/30 text-center bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
          <div className="text-5xl font-black text-cyan-500 mb-2">{stats.words}</div>
          <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Words</div>
        </div>
        <div className="glass rounded-2xl p-6 border border-purple-500/30 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <div className="text-5xl font-black text-purple-500 mb-2">{stats.characters}</div>
          <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Characters</div>
        </div>
        <div className="glass rounded-2xl p-6 border border-emerald-500/30 text-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
          <div className="text-5xl font-black text-emerald-500 mb-2">{stats.sentences}</div>
          <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Sentences</div>
        </div>
        <div className="glass rounded-2xl p-6 border border-pink-500/30 text-center bg-gradient-to-br from-pink-500/10 to-rose-500/10">
          <div className="text-5xl font-black text-pink-500 mb-2">{stats.paragraphs}</div>
          <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Paragraphs</div>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 border border-cyan-500/20 shadow-lg bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
          📊 Detailed Statistics
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between p-4 glass rounded-xl border border-white/10">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Characters (with spaces):</span>
            <span className="font-black text-slate-900 dark:text-white text-lg">{stats.characters}</span>
          </div>
          <div className="flex justify-between p-4 glass rounded-xl border border-white/10">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Characters (no spaces):</span>
            <span className="font-black text-slate-900 dark:text-white text-lg">{stats.charactersNoSpaces}</span>
          </div>
          <div className="flex justify-between p-4 glass rounded-xl border border-white/10">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Lines:</span>
            <span className="font-black text-slate-900 dark:text-white text-lg">{stats.lines}</span>
          </div>
          <div className="flex justify-between p-4 glass rounded-xl border border-white/10">
            <span className="text-slate-600 dark:text-slate-400 font-bold">📖 Reading Time:</span>
            <span className="font-black text-slate-900 dark:text-white text-lg">{stats.readingTime} min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
