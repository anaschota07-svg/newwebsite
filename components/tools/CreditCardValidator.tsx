'use client'

import { useState } from 'react'
import { CreditCard, CheckCircle, XCircle } from 'lucide-react'

export default function CreditCardValidator() {
  const [cardNumber, setCardNumber] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const luhnCheck = (num: string) => {
    const arr = num.replace(/\s/g, '').split('').reverse().map(x => parseInt(x))
    const sum = arr.reduce((acc, val, idx) => {
      if (idx % 2 !== 0) {
        val *= 2
        if (val > 9) val -= 9
      }
      return acc + val
    }, 0)
    return sum % 10 === 0
  }

  const validateCard = () => {
    const cleanNumber = cardNumber.replace(/\s/g, '')
    setIsValid(cleanNumber.length >= 13 && cleanNumber.length <= 19 && luhnCheck(cleanNumber))
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          💳 Enter Card Number
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full pl-12 pr-4 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white font-mono text-lg"
            />
          </div>
          <button
            onClick={validateCard}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Validate Card
          </button>
        </div>
      </div>

      {isValid !== null && (
        <div className={`glass rounded-3xl p-6 border ${isValid ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'} animate-slide-up`}>
          <div className="flex items-center gap-3">
            {isValid ? (
              <>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
                <div>
                  <h3 className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    Valid Card Number
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    This card number passes the Luhn algorithm check
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-8 w-8 text-red-500" />
                <div>
                  <h3 className="text-lg font-black text-red-600 dark:text-red-400">
                    Invalid Card Number
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    This card number does not pass validation
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="glass rounded-3xl p-6 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
          💡 About Validation
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This tool uses the Luhn algorithm to validate credit card numbers. This checks the format and checksum but does not verify if the card exists or is active.
        </p>
      </div>
    </div>
  )
}
