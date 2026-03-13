'use client'

import React from 'react'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Parse markdown and convert to JSX
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Bold text: **text**
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g)
        elements.push(
          <p key={i} className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            {parts.map((part, idx) => (
              idx % 2 === 1 ? (
                <strong key={idx} className="font-bold">{part}</strong>
              ) : (
                <span key={idx}>{part}</span>
              )
            ))}
          </p>
        )
      }
      // Bullet points: •
      else if (line.trim().startsWith('•')) {
        elements.push(
          <li key={i} className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed ml-6 mb-2">
            {line.replace('•', '').trim()}
          </li>
        )
      }
      // Headings: ###
      else if (line.startsWith('###')) {
        elements.push(
          <h3 key={i} className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-4">
            {line.replace(/^#+\s/, '')}
          </h3>
        )
      }
      // Headings: ##
      else if (line.startsWith('##')) {
        elements.push(
          <h2 key={i} className="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            {line.replace(/^#+\s/, '')}
          </h2>
        )
      }
      // Empty lines
      else if (line.trim() === '') {
        elements.push(<div key={i} className="h-2" />)
      }
      // Regular text
      else if (line.trim()) {
        elements.push(
          <p key={i} className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            {line}
          </p>
        )
      }

      i++
    }

    return elements
  }

  return (
    <div className="space-y-4">
      {parseMarkdown(content)}
    </div>
  )
}
