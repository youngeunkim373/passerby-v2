'use client';
import { searchClient } from 'algolia';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Post } from '@/app/_data/posts.interface';
import { BoardFilterDTO, BoardSortBy, GetBoardResponseDTO } from '@/app/board/board.interface';
import { getPosts } from '@/app/board/board.service';
import { removePost } from '@/app/write/write.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { LoginModal } from '@/components/modals/LoginModal';
import { useModalContext } from '@/contexts/ModalContext';
import { Pagination, usePagination } from '@/hooks/usePagination';
import { CustomError } from '@/utils/error';
import { changeQueryStringToFilter } from '@/utils/url';

interface Props {
  isLoggedIn: boolean | null;
  userEmail: Post['userEmail'] | null;
}

export const useUserBoard = ({ isLoggedIn, userEmail }: Props) => {
  const { show } = useModalContext();

  const [ isDeleteLoading, setDeleteLoading ] = useState<boolean>(false);
  const [ isFetchLoading, setFetchLoading ] = useState<boolean>(false);
  const [ list, setList ] = useState<GetBoardResponseDTO['items']>([]);
  const [ totalCount, setTotaleCount ] = useState<number>(0);

  // 게시글 fetch
  const getBoardList = async (pagination?: Pagination<BoardFilterDTO>): Promise<void> => {
    try {
      setFetchLoading(true);

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
      setFetchLoading(false);
    }
  };

  // 게시글 삭제
  const deletePost = async (postId: Post['objectID']) => {
    if(!isLoggedIn) {
      throw new CustomError(401, '유저 인증 정보가 필요합니다.');
    }

    try {
      setDeleteLoading(true);

      await removePost({ postId });

      // Algolia 데이터 삭제 동기화
      // 그냥 firestore와의 동기화에 맡기기엔 refetch 시기를 잡기 어려움
      const index = searchClient.initIndex(BoardSortBy.POSTEDAT);
      await index.deleteObject(postId);

      getBoardList(defaultPagination);
    } catch (err) {
      console.error(err);

      if(err instanceof CustomError) {
        return show(
          <ErrorModal 
            statusCode={err.statusCode}
            message={err.message} />
        );
      }

      show(
        <ErrorModal 
          message={
            <>
              게시글 삭제 도중 알 수 없는 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </>
          } />
      );
    } finally {
      setDeleteLoading(false);
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
    isDeleteLoading,
    isFetchLoading,
    list,
    pagination,
    totalPage: Math.ceil(totalCount / pagination.size),
    deletePost,
    onPagination,
  };
};