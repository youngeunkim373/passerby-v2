'use client';
import { BoardSortBy } from '@/app/board/board.interface';
import { Board } from '@/app/board/components/Board';
import { useBoard } from '@/app/board/useBoard';

export function MostViewedBoard() {
  const { 
    isLoading, 
    list,
    pagination, 
    totalPage, 
    onPagination,
  } = useBoard({ sortBy: BoardSortBy.VIEWS });

  return (
    <Board 
      isLoading= {isLoading}
      list={list}
      pagination={pagination}
      totalPage={totalPage}
      onPagination={onPagination} />
  );
}

