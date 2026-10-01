import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface FooterPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
  isLoading?: boolean
}

export const FooterPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: FooterPaginationProps) => {
  const getPageNumbers = (currPage: number, totalPages: number): (number | string)[] => {
    const delta = 1
    const pages: (number | string)[] = []
    let last = 0

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currPage - delta && i <= currPage + delta)) {
        if (last && i - last === 2) pages.push(last + 1)
        else if (last && i - last > 2) pages.push('...')
        pages.push(i)
        last = i
      }
    }

    return pages
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages)
    }
  }

  const handleFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1)
    }
  }

  return (
    <footer className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleFirstPage}
          disabled={currentPage === 1 || isLoading}
          className="cursor-pointer rounded-full bg-zinc-50 p-1 transition-colors duration-200 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || isLoading}
          className="cursor-pointer rounded-full bg-zinc-50 p-1 transition-colors duration-200 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-1">
          {getPageNumbers(currentPage, totalPages).map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                type="button"
                onClick={() => onPageChange(page)}
                disabled={isLoading}
                className={`flex size-7 cursor-pointer items-center justify-center rounded-full text-sm transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                  page === currentPage ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-200'
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="p-2 text-zinc-400 select-none">
                {page}
              </span>
            ),
          )}
        </div>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isLoading}
          className="cursor-pointer rounded-full bg-zinc-50 p-1 transition-colors duration-200 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
        <button
          type="button"
          onClick={handleLastPage}
          disabled={currentPage === totalPages || isLoading}
          className="cursor-pointer rounded-full bg-zinc-50 p-1 transition-colors duration-200 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </footer>
  )
}
