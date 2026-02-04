'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'

export default function LoanCalculator() {
  const [loan, setLoan] = useState({ amount: 100000, rate: 5, years: 30 })
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const principal = loan.amount
    const monthlyRate = loan.rate / 100 / 12
    const months = loan.years * 12
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal

    setResult({
      monthly: monthlyPayment.toFixed(2),
      total: totalPayment.toFixed(2),
      interest: totalInterest.toFixed(2)
    })
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          🏦 Loan Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={loan.amount}
              onChange={(e) => setLoan({ ...loan, amount: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Interest Rate (% per year)
            </label>
            <input
              type="number"
              step="0.1"
              value={loan.rate}
              onChange={(e) => setLoan({ ...loan, rate: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Loan Term (years)
            </label>
            <input
              type="number"
              value={loan.years}
              onChange={(e) => setLoan({ ...loan, years: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Calculator className="h-5 w-5" />
            Calculate
          </button>
        </div>
      </div>

      {result && (
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg animate-slide-up">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">
            📊 Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Monthly Payment</p>
              <p className="text-2xl font-black text-cyan-600">${result.monthly}</p>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Payment</p>
              <p className="text-2xl font-black text-purple-600">${result.total}</p>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Interest</p>
              <p className="text-2xl font-black text-pink-600">${result.interest}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
