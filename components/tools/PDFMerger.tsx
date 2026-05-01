'use client'

import { useState } from 'react'
import { Upload, Download, Trash2 } from 'lucide-react'

export default function PDFMerger() {
  const [files, setFiles] = useState<string[]>([])

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          📚 Upload PDFs
        </h3>
        <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-sky-500/50 transition-all cursor-pointer">
          <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">
            Click to upload PDF files
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Select multiple PDFs to merge
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            📄 Files ({files.length})
          </h3>
          <button className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all">
            <Download className="h-5 w-5 inline mr-2" />
            Merge & Download
          </button>
        </div>
      )}

      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          💡 How It Works
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-cyan-500 font-bold">✦</span>
            <span>Upload multiple PDF files</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Drag to reorder files</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500 font-bold">✦</span>
            <span>Merge into a single PDF</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
