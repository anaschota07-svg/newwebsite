interface BlogInsightBlocksProps {
  content: string
}

function extractListAfterHeading(lines: string[], headingPattern: RegExp): string[] {
  const startIndex = lines.findIndex((line) => headingPattern.test(line.trim()))
  if (startIndex === -1) return []

  const items: string[] = []
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) {
      if (items.length > 0) break
      continue
    }

    // Stop on next heading-like line.
    if (/^[A-Za-z].*:$/.test(line) && !line.startsWith('✓') && !line.startsWith('✗') && !line.startsWith('•')) {
      break
    }

    if (line.startsWith('✓') || line.startsWith('✗') || line.startsWith('•') || line.startsWith('- ')) {
      items.push(line.replace(/^(✓|✗|•|-)\s*/, ''))
    } else if (items.length > 0) {
      // End list once non-list text begins after collecting items.
      break
    }
  }

  return items
}

function extractFirstMarkdownTable(content: string): { headers: string[]; rows: string[][] } | null {
  const lines = content.split('\n')
  for (let i = 0; i < lines.length - 1; i++) {
    const headerLine = lines[i].trim()
    const separatorLine = lines[i + 1].trim()
    if (!headerLine.startsWith('|') || !separatorLine.includes('---')) continue

    const headers = headerLine
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim())

    const rows: string[][] = []
    let j = i + 2
    while (j < lines.length && lines[j].trim().startsWith('|')) {
      rows.push(
        lines[j]
          .trim()
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((cell) => cell.trim())
      )
      j++
    }

    if (headers.length > 1 && rows.length > 0) {
      return { headers, rows }
    }
  }
  return null
}

export function BlogInsightBlocks({ content }: BlogInsightBlocksProps) {
  const lines = content.split('\n')
  const pros = extractListAfterHeading(lines, /^(strengths|pros):$/i)
  const cons = extractListAfterHeading(lines, /^(weaknesses|cons):$/i)
  const table = extractFirstMarkdownTable(content)

  if (pros.length === 0 && cons.length === 0 && !table) {
    return null
  }

  return (
    <div className="space-y-6">
      {(pros.length > 0 || cons.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-900/15 p-5">
            <h3 className="text-lg font-black text-emerald-800 dark:text-emerald-300 mb-3">Pros</h3>
            {pros.length > 0 ? (
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {pros.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No explicit pros listed in this section.</p>
            )}
          </div>

          <div className="rounded-2xl border border-rose-500/30 bg-rose-50/80 dark:bg-rose-900/15 p-5">
            <h3 className="text-lg font-black text-rose-800 dark:text-rose-300 mb-3">Cons</h3>
            {cons.length > 0 ? (
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {cons.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No explicit cons listed in this section.</p>
            )}
          </div>
        </div>
      )}

      {table && (
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-900/10 p-5">
          <h3 className="text-lg font-black text-cyan-900 dark:text-cyan-300 mb-3">Comparison Snapshot</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/70">
                <tr>
                  {table.headers.map((header) => (
                    <th key={header} className="px-3 py-2 text-left font-semibold text-slate-900 dark:text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white/70 dark:bg-slate-900/60">
                {table.rows.slice(0, 5).map((row, index) => (
                  <tr key={index} className="border-t border-slate-200/70 dark:border-slate-700/70">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-3 py-2 text-slate-700 dark:text-slate-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Full comparison details remain in the section below.
          </p>
        </div>
      )}
    </div>
  )
}
