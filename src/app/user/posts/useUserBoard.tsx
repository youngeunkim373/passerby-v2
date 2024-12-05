'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Post } from '@/app/_data/posts.interface';
import { BoardFilterDTO, BoardSortBy, GetBoardResponseDTO } from '@/app/board/board.interface';
import { getPosts } from '@/app/board/board.service';
import { LoginModal } from '@/components/modals/LoginModal';
import { useModalContext } from '@/contexts/ModalContext';
import { Pagination, usePagination } from '@/hooks/usePagination';
import { changeQueryStringToFilter } from '@/utils/url';

interface Props {
  isLoggedIn: boolean | null;
  userEmail: Post['userEmail'] | null;
}

export const useUserBoard = ({ isLoggedIn, userEmail }: Props) => {
  const { show } = useModalContext();

  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ list, setList ] = useState<GetBoardResponseDTO['items']>([]);
  const [ totalCount, setTotaleCount ] = useState<number>(0);

  // 게시글 fetch
  const getBoardList = async (pagination?: Pagination<BoardFilterDTO>): Promise<void> => {
    try {
      setLoading(true);

      const res = await getPosts({ 
        pagination, 
        sortBy: BoardSortBy.POSTEDAT, 
        userEmail,
      }); 

      setTotaleCount(res.totalCount);
      setList(res.items);  
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // url정보로 pagination 초기값 지정
  const searchParams = useSearchParams();
  const defaultPagination = changeQueryStringToFilter<BoardFilterDTO>(searchParams);

  const { pagination, onPagination } = usePagination<BoardFilterDTO>({
    defaultPagination,
    afterPagination: getBoardList,
  });

  useEffect(() => {
    // 로그인 유저 체크
    if(isLoggedIn === null) return;

    if(isLoggedIn === false) {
      return show(<LoginModal />);
    }

    getBoardList(pagination);
  }, [ isLoggedIn ]);

  return {
    isLoading,
    list,
    pagination,
    totalPage: Math.ceil(totalCount / pagination.size),
    onPagination,
  };
};