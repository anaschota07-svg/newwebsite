'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
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
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  const getStrength = () => {
    if (!password) return { text: '', color: '', width: '0%' }
    
    let strength = 0
    if (password.length >= 12) strength++
    if (password.length >= 16) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    if (strength <= 2) return { text: 'Weak', color: 'bg-red-500', width: '33%' }
    if (strength <= 4) return { text: 'Medium', color: 'bg-yellow-500', width: '66%' }
    return { text: 'Strong', color: 'bg-green-500', width: '100%' }
  }

  const strength = getStrength()

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="space-y-6">
          {password && (
            <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 border border-gray-300 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <code className="text-xl font-mono text-gray-900 dark:text-white break-all">{password}</code>
                <button
                  onClick={copyToClipboard}
                  className="ml-4 p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                  title="Copy to clipboard"
                >
                  <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Password Strength:</span>
                  <span className={`font-semibold ${strength.text === 'Strong' ? 'text-green-600' : strength.text === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {strength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className={`${strength.color} h-2 rounded-full transition-all duration-300`} style={{ width: strength.width }}></div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>8</span>
              <span>32</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                className="w-5 h-5 text-blue-600 bg-gray-100 dark:bg-slate-900 border-gray-300 dark:border-slate-700 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">Uppercase Letters (A-Z)</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                className="w-5 h-5 text-blue-600 bg-gray-100 dark:bg-slate-900 border-gray-300 dark:border-slate-700 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">Lowercase Letters (a-z)</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                className="w-5 h-5 text-blue-600 bg-gray-100 dark:bg-slate-900 border-gray-300 dark:border-slate-700 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                className="w-5 h-5 text-blue-600 bg-gray-100 dark:bg-slate-900 border-gray-300 dark:border-slate-700 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">Symbols (!@#$%^&*)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Generate Password
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Password Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span>Use at least 12 characters for better security</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span>Mix uppercase, lowercase, numbers, and symbols</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span>Avoid using personal information</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span>Use a unique password for each account</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
