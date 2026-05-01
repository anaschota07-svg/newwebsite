import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function BlogProse({ children }: { children: string }) {
  return (
    <div className="blog-prose max-w-none text-slate-700 dark:text-slate-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children: c }) => (
            <h1 className="mt-10 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white first:mt-0">{c}</h1>
          ),
          h2: ({ children: c }) => (
            <h2 className="mt-10 text-xl font-semibold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">{c}</h2>
          ),
          h3: ({ children: c }) => (
            <h3 className="mt-8 text-lg font-semibold text-slate-900 dark:text-white">{c}</h3>
          ),
          p: ({ children: c }) => <p className="mt-4 leading-relaxed">{c}</p>,
          a: ({ href, children: c }) => (
            <a
              className="font-medium text-sky-700 underline decoration-sky-700/35 underline-offset-2 hover:text-sky-900 hover:decoration-sky-700 dark:text-sky-300 dark:decoration-sky-400/40 dark:hover:text-sky-200 dark:hover:decoration-sky-300"
              href={href}
            >
              {c}
            </a>
          ),
          ul: ({ children: c }) => <ul className="mt-4 list-disc pl-6 space-y-2">{c}</ul>,
          ol: ({ children: c }) => <ol className="mt-4 list-decimal pl-6 space-y-2">{c}</ol>,
          li: ({ children: c }) => <li className="leading-relaxed">{c}</li>,
          blockquote: ({ children: c }) => (
            <blockquote className="mt-4 border-l-2 border-slate-300 pl-4 text-slate-600 dark:border-slate-600 dark:text-slate-400">
              {c}
            </blockquote>
          ),
          code: ({ className, children: c }) =>
            className ? (
              <code className={`${className} text-sm text-slate-900 dark:text-slate-100`}>{c}</code>
            ) : (
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {c}
              </code>
            ),
          pre: ({ children: c }) => (
            <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-100 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">{c}</pre>
          ),
          table: ({ children: c }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full border-collapse text-sm">{c}</table>
            </div>
          ),
          thead: ({ children: c }) => <thead className="bg-slate-100 dark:bg-slate-800/80">{c}</thead>,
          th: ({ children: c }) => (
            <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
              {c}
            </th>
          ),
          td: ({ children: c }) => (
            <td className="border-b border-slate-100 px-3 py-2 align-top dark:border-slate-800">{c}</td>
          ),
          hr: () => <hr className="my-10 border-slate-200 dark:border-slate-800" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
