'use client'

import React from 'react'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const renderInlineMarkdown = (value: string) => {
    const parts = value.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, idx) =>
      idx % 2 === 1 ? (
        <strong key={idx} className="font-semibold text-slate-900 dark:text-white">
          {part}
        </strong>
      ) : (
        <span key={idx}>{part}</span>
      )
    )
  }

  const isListLine = (line: string) => {
    const trimmed = line.trim()
    return (
      trimmed.startsWith('•') ||
      trimmed.startsWith('- ') ||
      trimmed.startsWith('✓') ||
      trimmed.startsWith('✗')
    )
  }

  const parseTableRow = (line: string): string[] =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim())

  // Parse markdown and convert to JSX
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0
    let key = 0

    while (i < lines.length) {
      const line = lines[i]
      const trimmed = line.trim()

      // Skip empty lines
      if (!trimmed) {
        i++
        continue
      }

      // Markdown tables
      if (trimmed.startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().includes('---')) {
        const header = parseTableRow(lines[i])
        i += 2 // skip header + separator
        const rows: string[][] = []

        while (i < lines.length && lines[i].trim().startsWith('|')) {
          rows.push(parseTableRow(lines[i]))
          i++
        }

        elements.push(
          <div
            key={`table-${key++}`}
            className="my-6 overflow-x-auto rounded-2xl border border-slate-200/70 dark:border-slate-700/70"
          >
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/70">
                <tr>
                  {header.map((cell, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-left font-bold text-slate-900 dark:text-white whitespace-nowrap"
                    >
                      {renderInlineMarkdown(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white/70 dark:bg-slate-900/60">
                {rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-t border-slate-200/70 dark:border-slate-700/70">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-3 text-slate-700 dark:text-slate-300 align-top">
                        {renderInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        continue
      }

      // Headings
      if (trimmed.startsWith('###')) {
        elements.push(
          <h3 key={`h3-${key++}`} className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
            {trimmed.replace(/^###\s*/, '')}
          </h3>
        )
        i++
        continue
      }

      if (trimmed.startsWith('##')) {
        elements.push(
          <h2 key={`h2-${key++}`} className="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            {trimmed.replace(/^##\s*/, '')}
          </h2>
        )
        i++
        continue
      }

      // List block (•, -, ✓, ✗)
      if (isListLine(trimmed)) {
        const listItems: { icon: string; text: string }[] = []

        while (i < lines.length && isListLine(lines[i])) {
          const current = lines[i].trim()
          const icon = current[0]
          const textValue = current.replace(/^(•|-|✓|✗)\s*/, '')
          listItems.push({ icon, text: textValue })
          i++
        }

        elements.push(
          <ul key={`list-${key++}`} className="space-y-2 my-4">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                <span
                  className={
                    item.icon === '✓'
                      ? 'text-emerald-500 mt-1'
                      : item.icon === '✗'
                      ? 'text-rose-500 mt-1'
                      : 'text-cyan-500 mt-1'
                  }
                >
                  {item.icon}
                </span>
                <span>{renderInlineMarkdown(item.text)}</span>
              </li>
            ))}
          </ul>
        )
        continue
      }

      // Paragraph block: merge consecutive non-special lines
      const paragraphLines: string[] = [trimmed]
      i++
      while (i < lines.length) {
        const next = lines[i].trim()
        if (!next || next.startsWith('##') || next.startsWith('###') || isListLine(next) || next.startsWith('|')) {
          break
        }
        paragraphLines.push(next)
        i++
      }

      const paragraph = paragraphLines.join(' ')
      const isTakeaway = /^key takeaway:/i.test(paragraph)

      elements.push(
        <p
          key={`p-${key++}`}
          className={
            isTakeaway
              ? 'text-lg leading-relaxed mb-4 rounded-xl border border-cyan-500/30 bg-cyan-50/80 px-4 py-3 text-cyan-900 dark:bg-cyan-900/20 dark:text-cyan-100'
              : 'text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4'
          }
        >
          {renderInlineMarkdown(paragraph)}
        </p>
      )
    }

    return elements
  }

  return (
    <div className="space-y-4">
      {parseMarkdown(content)}
    </div>
  )
}
