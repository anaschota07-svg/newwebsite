'use client'

import { useState } from 'react'

export default function TextDiffChecker() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
            📝 Original Text
          </h3>
          <textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Enter original text..." className="w-full h-96 px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white font-mono resize-none" />
        </div>

        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
            📝 Modified Text
          </h3>
          <textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Enter modified text..." className="w-full h-96 px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white font-mono resize-none" />
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
          💡 Compare
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This tool compares two texts side-by-side. Differences will be highlighted when both texts are provided.
        </p>
      </div>
    </div>
  )
}
