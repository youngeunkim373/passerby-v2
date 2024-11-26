import { ChevronLeft, ChevronRight } from '@/assets/icons/Chevron';
import { Button } from '@/components/buttons/Button';
import { PaginationSet } from '@/hooks/usePagination';

interface Props<TFilter> {
  pagination: PaginationSet<TFilter>['pagination'];
  totalPage: number;
  onPagination: PaginationSet<TFilter>['onPagination'];
}

const calculateStartPage = (currentPage: number, totalPage: number) => {
  if (currentPage < 3 || totalPage < 6) return 1;
  if (currentPage > totalPage - 2) return totalPage - 4;
  return currentPage - 2;
};

export function Pagination<TFilter>({ pagination, totalPage, onPagination }: Props<TFilter>) {
  const startPage = calculateStartPage(pagination.page, totalPage);
  const pageCount = Math.min(5, totalPage);

  if(totalPage === 1) return <></>;

  return (
    <nav className={style.wrapper}>
      {/* Previous Button */}
      {pagination.page > 1 && (
        <Button
          className={style.arrow}
          color={'black'}
          size={'small'}
          variant={'text'}
          onClick={() => onPagination({ page: pagination.page - 1 })}>
          <ChevronLeft />
        </Button>
      )}

      {/* Page Buttons */}
      {Array.from({ length: pageCount }, (_, idx) => startPage + idx).map((pageNumber) => (
        <Button
          key={pageNumber}
          className={`
            ${style.page}
            ${pagination.page === pageNumber && '!text-main !text-base'}
          `}
          color={'black'}
          size={'small'}
          variant={'text'}
          onClick={() => onPagination({ page: pageNumber })}>
          {pageNumber}
        </Button>
      ))}

      {/* Next Button */}
      {pagination.page < totalPage && (
        <Button
          className={style.arrow}
          color={'black'}
          size={'small'}
          variant={'text'}
          onClick={() => onPagination({ page: pagination.page + 1 })}>
          <ChevronRight />
        </Button>
      )}
    </nav>
  );
}

const style = {
  wrapper: 'w-fit flex justify-between items-center py-2 mx-auto',
  arrow: 'text-gray-400 !px-1.5 hover:bg-gray-50',
  page: 'text-sm font-semibold text-gray-900 !px-3 hover:bg-gray-50',
};
