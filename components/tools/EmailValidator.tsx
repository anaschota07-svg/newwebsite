'use client'

import { useState } from 'react'
import { Mail, CheckCircle, XCircle } from 'lucide-react'

export default function EmailValidator() {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsValid(regex.test(email))
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          📧 Email Address
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              className="w-full pl-12 pr-4 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white"
            />
          </div>
          <button
            onClick={validateEmail}
            className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Validate Email
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
                  <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    Valid Email
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    This email address has a valid format
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-8 w-8 text-red-500" />
                <div>
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                    Invalid Email
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    This email address format is invalid
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
