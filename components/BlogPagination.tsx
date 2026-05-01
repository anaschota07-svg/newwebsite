import Link from 'next/link'
import type { PaginationModel } from '@/lib/blog/posts'

interface BlogPaginationProps {
  page: number
  totalPages: number
  model: PaginationModel
}

function hrefForPage(p: number) {
  return p <= 1 ? '/blog' : `/blog?page=${p}`
}

export function BlogPagination({ page, totalPages, model }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const prevHref = hrefForPage(page - 1)
  const nextHref = hrefForPage(page + 1)

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p className="order-2 text-center text-sm text-slate-500 dark:text-slate-400 sm:order-1 sm:text-left">
        Page <span className="font-semibold text-slate-700 dark:text-slate-300">{page}</span> of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{totalPages}</span>
      </p>

      <ul className="order-1 flex flex-wrap items-center justify-center gap-1 sm:order-2">
        <li>
          {page <= 1 ? (
            <span className="inline-flex min-h-10 min-w-[4.25rem] items-center justify-center rounded-lg border border-slate-100 bg-slate-50 px-3 text-sm text-slate-400 dark:border-slate-900 dark:bg-slate-900 dark:text-slate-600">
              Prev
            </span>
          ) : (
            <Link
              href={prevHref}
              className="inline-flex min-h-10 min-w-[4.25rem] items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              rel="prev"
            >
              Prev
            </Link>
          )}
        </li>

        {model.map((cell, idx) =>
          cell.type === 'gap' ? (
            <li key={`g-${idx}`} className="px-2 text-slate-400" aria-hidden>
              …
            </li>
          ) : (
            <li key={cell.page}>
              <Link
                href={hrefForPage(cell.page)}
                className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border text-sm font-medium transition ${
                  cell.page === page
                    ? 'border-sky-500 bg-sky-500 text-white dark:border-sky-600 dark:bg-sky-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
                aria-current={cell.page === page ? 'page' : undefined}
              >
                {cell.page}
              </Link>
            </li>
          )
        )}

        <li>
          {page >= totalPages ? (
            <span className="inline-flex min-h-10 min-w-[4.25rem] items-center justify-center rounded-lg border border-slate-100 bg-slate-50 px-3 text-sm text-slate-400 dark:border-slate-900 dark:bg-slate-900 dark:text-slate-600">
              Next
            </span>
          ) : (
            <Link
              href={nextHref}
              className="inline-flex min-h-10 min-w-[4.25rem] items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              rel="next"
            >
              Next
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
