// components/NewsPagination.tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface NewsPaginationProps {
  currentPage: number
  totalPage: number | 0
  onPageChange: (page: number) => void
}

export function ContentsPagination({
  currentPage,
  totalPage,
  onPageChange,
}: NewsPaginationProps) {
  const maxPagesToShow = 5

  const getPageNumbers = () => {
    const pageNumbers = []
    let startPage = Math.max(0, currentPage - 2)
    let endPage = Math.min(totalPage - 1, startPage + maxPagesToShow - 1)

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-textLight"
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              className={` ${
                currentPage === pageNum
                  ? 'bg-green text-white [&>svg]:stroke-[0]'
                  : 'h text-textLight hover:text-textLight'
              }`}
              isActive={currentPage === pageNum}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className="text-textLight"
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
