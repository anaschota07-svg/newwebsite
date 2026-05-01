'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, RefreshCw, Shield, Check, Sparkles } from 'lucide-react'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (options.uppercase) chars += uppercase
    if (options.lowercase) chars += lowercase
    if (options.numbers) chars += numbers
    if (options.symbols) chars += symbols

    if (chars === '') {
      alert('Please select at least one option')
      return
    }

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(newPassword)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    if (!password) return { text: '', gradient: '', width: '0%' }
    
    let strength = 0
    if (password.length >= 12) strength++
    if (password.length >= 16) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    if (strength <= 2) return { text: 'Weak', gradient: 'from-red-500 to-orange-500', width: '33%' }
    if (strength <= 4) return { text: 'Medium', gradient: 'from-yellow-500 to-orange-500', width: '66%' }
    return { text: 'Strong', gradient: 'from-green-500 to-emerald-500', width: '100%' }
  }

  const strength = getStrength()

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
        <div className="space-y-8">
          {/* Password Display */}
          {password && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-6 rounded-2xl glass border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <code className="text-xl font-mono text-slate-900 dark:text-white break-all font-bold tracking-wide">{password}</code>
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl glass border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all flex-shrink-0"
                  title="Copy"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  )}
                </motion.button>
              </div>
              
              {/* Strength Indicator */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Strength:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{strength.text}</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${strength.gradient} rounded-full`}
                    initial={{ width: '0%' }}
                    animate={{ width: strength.width }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Length Slider */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center justify-between">
              <span>Password Length</span>
              <span className="glass rounded-full border border-slate-200 px-3 py-1 font-semibold text-sky-600 dark:border-slate-600 dark:text-sky-400">
                {length}
              </span>
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="slider-futuristic h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 dark:bg-slate-700"
              style={{
                background: `linear-gradient(to right, rgb(14 165 233) 0%, rgb(14 165 233) ${((length - 8) / 24) * 100}%, rgb(226 232 240) ${((length - 8) / 24) * 100}%, rgb(226 232 240) 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500 mt-2 font-semibold">
              <span>8</span>
              <span>32</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {[
              { key: 'uppercase' as const, label: 'Uppercase', desc: 'A-Z' },
              { key: 'lowercase' as const, label: 'Lowercase', desc: 'a-z' },
              { key: 'numbers' as const, label: 'Numbers', desc: '0-9' },
              { key: 'symbols' as const, label: 'Symbols', desc: '!@#$%^&*' },
            ].map((option, i) => (
              <motion.label
                key={option.key}
                className="group flex cursor-pointer items-center justify-between rounded-2xl glass border border-slate-200 p-4 transition-colors hover:border-sky-400/50 dark:border-slate-700 dark:hover:border-sky-500/40"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={options[option.key]}
                    onChange={(e) => setOptions({ ...options, [option.key]: e.target.checked })}
                    className="h-5 w-5 cursor-pointer rounded border-2 border-slate-300 text-sky-600 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-600 dark:text-sky-500"
                  />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{option.label}</div>
                    <div className="text-xs text-slate-500 font-mono">{option.desc}</div>
                  </div>
                </div>
                {options[option.key] && (
                  <Check className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
                )}
              </motion.label>
            ))}
          </div>

          {/* Generate Button */}
          <motion.button
            type="button"
            onClick={generatePassword}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            <RefreshCw className="h-5 w-5" aria-hidden />
            Generate Password
          </motion.button>
        </div>
      </div>

      {/* Security Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
          Security Tips
        </h3>
        <div className="space-y-3">
          {[
            'Use at least 12 characters for better security',
            'Mix uppercase, lowercase, numbers, and symbols',
            'Avoid using personal information',
            'Use a unique password for each account',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-600 dark:bg-sky-500">
                <span className="text-xs text-white">✓</span>
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300">{tip}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
