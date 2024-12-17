'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GetPostResponseDTO } from '@/app/board/board.interface';
import { getPostAPI, updateViewsAPI } from '@/app/board/board.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';

export const usePost = () => {
  const router = useRouter();

  const params = useParams();
  const { postId } = params;

  const { show } = useModalContext();

  /* ---------------------- 상세 게시글 조회 ---------------------- */
  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ post, setPost ] = useState<GetPostResponseDTO | null>(null);

  const getPost = async (): Promise<void> => {
    try {
      if(!postId || Array.isArray(postId)) {
        throw new CustomError(404, '잘못된 요청입니다.');
      };

      setLoading(true);

      await updateViewsAPI({ postId });
      const res = await getPostAPI(postId);

      setPost(res);
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
    getPost();
  }, [ postId ]);

  return {
    isLoading,
    post,
  };
};