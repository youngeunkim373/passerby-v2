'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BoardFilterDTO, BoardSortBy, GetPostsResponseDTO } from '@/app/board/board.interface';
import { getPostsAPI } from '@/app/board/board.service';
import { Pagination, usePagination } from '@/hooks/usePagination';
import { changeQueryStringToFilter } from '@/utils/url';

interface Props {
  sortBy: BoardSortBy;
  initialPagination?: Pagination<BoardFilterDTO>;
}

export const useBoard = ({ sortBy, initialPagination }: Props) => {
  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ list, setList ] = useState<GetPostsResponseDTO['items']>([]);
  const [ totalCount, setTotaleCount ] = useState<number>(0);

  // 게시글 fetch
  const getBoardList = async (pagination?: Pagination<BoardFilterDTO>): Promise<void> => {
    try {
      setLoading(true);

      const res = await getPostsAPI({ pagination, sortBy }); 

      setTotaleCount(res.totalCount);
      setList(res.items);  
    } catch (err) {
      console.error(err);
    } finally {
      // Viewer를 dynamic import로 부르기 때문에 시간차를 두어 로딩 상태를 관리
      setTimeout(() => setLoading(false), 500);
    }
  };

  // url정보로 pagination 초기값 지정
  const searchParams = useSearchParams();
  const defaultPagination = changeQueryStringToFilter<BoardFilterDTO>(searchParams);

  const { pagination, onPagination } = usePagination<BoardFilterDTO>({
    defaultPagination: initialPagination ?? defaultPagination,
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