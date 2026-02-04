'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'
import { toolsData } from '@/data/tools/toolsData'
import Link from 'next/link'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredTools = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()

    return toolsData
      .filter(
        tool =>
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query])

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Input */}
      <div className="relative">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder="Search tools…"
          className="
            w-full py-4 pl-6 pr-16
            rounded-2xl glass
            border border-white/10
            text-base font-medium
            text-slate-900 dark:text-white
            placeholder-slate-500
            focus:outline-none
            focus:border-cyan-500
            focus:ring-2 focus:ring-cyan-500/20
            transition-all
          "
        />

        {/* Right icons */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <motion.button
              onClick={() => setQuery('')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-red-500/10 text-slate-500 hover:text-red-500 transition"
              aria-label="Clear search"
            >
              <X size={18} />
            </motion.button>
          )}

          <Search className="text-slate-400" size={20} />
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="
              absolute z-50 mt-3 w-full
              rounded-2xl glass
              border border-white/10
              overflow-hidden
            "
          >
            {filteredTools.length > 0 ? (
              filteredTools.map(tool => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="
                    flex items-center gap-4 px-5 py-4
                    hover:bg-white/5 transition
                  "
                >
                  <div className="text-xl">{tool.icon}</div>

                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {tool.name}
                    </p>
                    <p className="text-sm text-slate-500 line-clamp-1">
                      {tool.description}
                    </p>
                  </div>

                  <ArrowRight className="text-slate-400" size={18} />
                </Link>
              ))
            ) : (
              <div className="px-5 py-4 text-sm text-slate-500">
                No tools found for <span className="font-medium">“{query}”</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
