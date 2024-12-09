import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GetPostResponseDTO } from '@/app/board/board.interface';
import { getPost } from '@/app/board/board.service';

export const usePost = () => {
  const params = useParams();
  const { postId } = params;

  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ postDetail, setPostDetail ] = useState<GetPostResponseDTO | null>(null);

  const getPostDetail = async (): Promise<void> => {
    try {
      // TODO postId 없을 때 처리
      if(!postId) return;

      setLoading(true);

      const res = await getPost(postId as string);

      setPostDetail(res);
    } catch (err) {
      console.error(err);
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