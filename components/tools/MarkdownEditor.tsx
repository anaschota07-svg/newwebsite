'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and this is *italic*.')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              📝 Markdown
            </h3>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-96 px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white font-mono resize-none"
            placeholder="Enter markdown..."
          />
        </div>

        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
            👁️ Preview
          </h3>
          <div className="prose dark:prose-invert max-w-none h-96 overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
          💡 Markdown Syntax
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-mono">
          <li># Heading 1</li>
          <li>## Heading 2</li>
          <li>**bold** and *italic*</li>
          <li>[Link](url)</li>
        </ul>
      </div>
    </div>
  )
}
