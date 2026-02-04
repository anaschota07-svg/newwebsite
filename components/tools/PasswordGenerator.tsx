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
      <div className="glass rounded-3xl p-8 border border-white/10">
        <div className="space-y-8">
          {/* Password Display */}
          {password && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-6 rounded-2xl glass border border-white/10"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <code className="text-xl font-mono text-slate-900 dark:text-white break-all font-bold tracking-wide">{password}</code>
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl glass border border-white/10 hover:border-cyan-500/50 transition-all flex-shrink-0"
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
                  <span className="font-black gradient-text">{strength.text}</span>
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
              <span className="px-3 py-1 rounded-full glass border border-cyan-500/30 text-cyan-500 font-black">{length}</span>
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full appearance-none cursor-pointer slider-futuristic"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #a855f7 ${((length - 8) / 24) * 100}%, #e2e8f0 ${((length - 8) / 24) * 100}%, #e2e8f0 100%)`
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
                className="flex items-center justify-between p-4 rounded-2xl glass border border-white/10 hover:border-cyan-500/30 cursor-pointer transition-all group"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={options[option.key]}
                    onChange={(e) => setOptions({ ...options, [option.key]: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 text-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
                  />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{option.label}</div>
                    <div className="text-xs text-slate-500 font-mono">{option.desc}</div>
                  </div>
                </div>
                {options[option.key] && (
                  <Check className="w-5 h-5 text-cyan-500" />
                )}
              </motion.label>
            ))}
          </div>

          {/* Generate Button */}
          <motion.button
            onClick={generatePassword}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full px-8 py-4 rounded-2xl font-bold text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Generate Password
            </span>
          </motion.button>
        </div>
      </div>

      {/* Security Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-500" />
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
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300">{tip}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
