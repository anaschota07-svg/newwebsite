'use client'

import { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')
  const [result, setResult] = useState<number | null>(null)

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR']

  const convert = () => {
    // Placeholder conversion rate - in production, use live API
    const rate = 0.85
    setResult(amount * rate)
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          💱 Convert Currency
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white">
                {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white">
                {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button onClick={convert} className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Convert
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Result
          </h3>
          <p className="text-4xl font-semibold">
            {result.toFixed(2)} {to}
          </p>
        </div>
      )}
    </div>
  )
}
