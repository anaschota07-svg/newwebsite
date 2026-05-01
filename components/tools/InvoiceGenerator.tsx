'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    clientName: '',
    amount: '',
  })

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🧾 Invoice Details
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
              placeholder="INV-001"
              className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={invoice.clientName}
              onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={invoice.date}
                onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={invoice.amount}
                onChange={(e) => setInvoice({ ...invoice, amount: e.target.value })}
                placeholder="1000"
                className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <Download className="h-5 w-5" />
            Generate Invoice PDF
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          💡 Features
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-cyan-500 font-bold">✦</span>
            <span>Professional invoice templates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Customizable fields and branding</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500 font-bold">✦</span>
            <span>Export as PDF instantly</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
