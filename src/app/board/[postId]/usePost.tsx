'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { EncouragementStatus } from '@/app/_data/encouragement_history.interface';
import { GetPostResponseDTO } from '@/app/board/board.interface';
import { encourageAPI, getEncouragementAPI, getPostAPI, updateViewsAPI } from '@/app/board/board.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { LoginModal } from '@/components/modals/LoginModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';

export const usePost = () => {
  const router = useRouter();

  const params = useParams();
  const { postId } = params;

  const { isLoggedIn, loggedInUser } = useAuthContext();
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

      // 게시글 조회수 업데이트
      await updateViewsAPI({ postId });

      // 게시글 정보 조회
      const post = await getPostAPI(postId);
      setPost(post);
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
              게시글 조회 도중 알 수 없는 오류가 발생했습니다.<br />
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

  /* ---------------------- 게시글 응원 정보 조회 ---------------------- */
  const [ encouragement, setEncouragement ] = useState<EncouragementStatus>(EncouragementStatus.CANCEL);

  const getEncouragement = async (): Promise<void> => {
    try {
      if(!postId || Array.isArray(postId)) {
        throw new CustomError(404, '잘못된 요청입니다.');
      };

      if(loggedInUser) {
        const encouragement = await getEncouragementAPI({
          userEmail: loggedInUser,
          postId,
        });

        if(encouragement) {
          setEncouragement(encouragement.status);
        }
      }
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
              게시글 응원 정보 조회 도중 알 수 없는 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </>
          } />
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEncouragement();
  }, [ isLoggedIn ]);

  /* ---------------------- 응원하기 ---------------------- */
  const encourage = async (): Promise<void> => {
    try {
      if(!postId || Array.isArray(postId)) {
        throw new CustomError(404, '잘못된 요청입니다.');
      };

      // 로그인 유저 체크
      if(isLoggedIn === null) {
        throw new CustomError(401, '잠시 후에 다시 시도해주세요.');
      }

      if(isLoggedIn === false || !loggedInUser) {
        return show(<LoginModal />);
      }

      // 게시글 응원 정보 조회
      const encouragement = await encourageAPI({
        userEmail: loggedInUser,
        postId,
      });

      setEncouragement(encouragement);

      // 게시글 정보 조회
      const post = await getPostAPI(postId);
      setPost(post);
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
              게시글 응원 도중 알 수 없는 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </>
          } />
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    encouragement,
    isLoading,
    post,
    encourage,
  };
};