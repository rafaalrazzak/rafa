import Link from '@/components/Link'

export default function Pagination({ pageSlug, totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="space-y-2 pt-12 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            rel="previous"
            className="cursor-auto text-xl disabled:opacity-50"
            disabled={!prevPage}
          >
            &#8249;
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${pageSlug}/` : `/${pageSlug}/page/${currentPage - 1}`}
          >
            <button rel="previous" className="text-xl">
              &#8249;
            </button>
          </Link>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>
        {!nextPage && (
          <button
            rel="next"
            className="cursor-auto text-xl disabled:opacity-50"
            disabled={!nextPage}
          >
            &#8250;
          </button>
        )}
        {nextPage && (
          <Link href={`/${pageSlug}/page/${currentPage + 1}`}>
            <button rel="next" className="text-xl">
              &#8250;
            </button>
          </Link>
        )}
      </nav>
    </div>
  )
}
