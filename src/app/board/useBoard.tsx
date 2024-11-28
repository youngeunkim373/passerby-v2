'use client';
import { useEffect, useState } from 'react';

import { BoardFilterDTO, BoardSortBy, GetBoardResponseDTO } from '@/app/board/board.interface';
import { getPosts } from '@/app/board/board.service';
import { Pagination, usePagination } from '@/hooks/usePagination';

interface Props {
  defaultPagination?: Pagination<BoardFilterDTO>;
  sortBy: BoardSortBy;
}

export const useBoard = ({ defaultPagination, sortBy }: Props) => {
  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ list, setList ] = useState<GetBoardResponseDTO['items']>([]);
  const [ totalCount, setTotaleCount ] = useState<number>(0);

  // 게시글 fetch
  const getBoardList = async (pagination?: Pagination<BoardFilterDTO>): Promise<void> => {
    try {
      setLoading(true);

      const res = await getPosts({ pagination, sortBy }); 

      setTotaleCount(res.totalCount);
      setList(res.items);  
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const { pagination, onPagination } = usePagination<BoardFilterDTO>({
    defaultPagination,
    afterPagination: getBoardList,
  });

  useEffect(() => {
    getBoardList(pagination);
  }, []);

  return {
    isLoading,
    list,
    pagination,
    totalPage: Math.ceil(totalCount / pagination.size),
    onPagination,
  };
};