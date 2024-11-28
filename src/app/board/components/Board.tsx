import { Post } from '@/app/_data/posts.interface';
import { BoardFilterDTO } from '@/app/board/board.interface';
import { BoardSearch } from '@/app/board/components/BoardSearch';
import { List } from '@/components/common/List';
import { Pagination } from '@/components/common/Pagination';
import { PaginationSet } from '@/hooks/usePagination';

interface Props {
  isLoading: boolean | null;
  list: Post[];
  pagination: PaginationSet<BoardFilterDTO>['pagination'];
  totalPage: number;
  onPagination: PaginationSet<BoardFilterDTO>['onPagination'];
}

export function Board({ 
  isLoading,
  list,
  pagination,
  totalPage,
  onPagination,
}: Props) {
  return (
    <div className={style.wrapper}>
      <BoardSearch
        defaultFilter={pagination.filter}
        onPagination={onPagination} />
      <List 
        isLoading={isLoading} 
        items={list} />
      <Pagination 
        pagination={pagination} 
        totalPage={totalPage}
        onPagination={onPagination} />
    </div>
  );
}

const style = {
  wrapper: 'w-full h-min flex flex-col gap-2 pt-8 pb-2 mb-auto sm:pt-10 sm:pb-4',
};
