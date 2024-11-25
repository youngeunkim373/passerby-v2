'use client';
import { BoardSortBy } from '@/app/board/board.interface';
import { LatestBoardSearch } from '@/app/board/latest/components/LatestBoardSearch';
import { useBoard } from '@/app/board/useBoard';
import { List } from '@/components/common/List';
import { Pagination } from '@/components/common/Pagination';

export function MostViewedBoard() {
  const { 
    isLoading, 
    list,
    pagination, 
    totalPage, 
    onPagination,
  } = useBoard({ sortBy: BoardSortBy.VIEWS });

  return (
    <div className={style.wrapper}>
      <LatestBoardSearch
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
  wrapper: 'w-full h-min flex flex-col gap-2 pt-8 pb-2 mb-auto sm:pt-10 sm:pb-4 grow-0',
};
