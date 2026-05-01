'use client'

import { useState } from 'react'

export default function TextDiffChecker() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            📝 Original Text
          </h3>
          <textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Enter original text..." className="w-full h-96 px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono resize-none" />
        </div>

        <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            📝 Modified Text
          </h3>
          <textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Enter modified text..." className="w-full h-96 px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono resize-none" />
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          💡 Compare
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This tool compares two texts side-by-side. Differences will be highlighted when both texts are provided.
        </p>
      </div>
    </div>
  )
}
