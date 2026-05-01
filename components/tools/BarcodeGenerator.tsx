'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

export default function BarcodeGenerator() {
  const [text, setText] = useState('')
  const [type, setType] = useState('code128')

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          📊 Barcode Data
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Text/Number</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or number..." className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Barcode Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white">
              <option value="code128">Code 128</option>
              <option value="code39">Code 39</option>
              <option value="ean13">EAN-13</option>
              <option value="upc">UPC</option>
            </select>
          </div>

          <button className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <Download className="h-5 w-5" />
            Download Barcode
          </button>
        </div>
      </div>

      {text && (
        <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Preview
          </h3>
          <div className="flex items-center justify-center p-8 bg-white rounded-xl">
            <div className="text-slate-400 text-sm">Barcode Preview</div>
          </div>
        </div>
      )}
    </div>
  )
}
