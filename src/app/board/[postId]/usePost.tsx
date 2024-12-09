'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GetPostResponseDTO } from '@/app/board/board.interface';
import { getPost } from '@/app/board/board.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';

export const usePost = () => {
  const router = useRouter();

  const params = useParams();
  const { postId } = params;

  const { show } = useModalContext();

  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ postDetail, setPostDetail ] = useState<GetPostResponseDTO | null>(null);

  const getPostDetail = async (): Promise<void> => {
    try {
      if(!postId) {
        throw new CustomError(404, '잘못된 요청입니다.');
      };

      setLoading(true);

      const res = await getPost(postId as string);

      setPostDetail(res);
    } catch (e) {
      console.error(e);

      if(e instanceof CustomError) {
        if(e.statusCode === 404) {
          router.push('/404');
        }

        show(
          <ErrorModal 
            statusCode={e.statusCode}
            message={e.message} />
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostDetail();
  }, [ postId ]);

  return {
    isLoading,
    postDetail,
  };
};