'use client';
import { searchClient } from 'algolia';
import { useParams } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CommentStatus } from '@/app/_data/comments.interface';
import { CommentFilterDTO, CommentFormDTO, GetCommentsResponseDTO } from '@/app/board/board.interface';
import { getCommentsAPI, writeCommentAPI } from '@/app/board/board.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { LoginModal } from '@/components/modals/LoginModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { Pagination, usePagination } from '@/hooks/usePagination';
import { CustomError } from '@/utils/error';

// @ts-expect-error: known issue
const CommentContext = createContext<ReturnType<typeof useComment>>(null);

export const useComment = () => {
  const { postId } = useParams();

  /* -------------------- 댓글 조회 -------------------- */ 
  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ comments, setComments ] = useState<GetCommentsResponseDTO['items']>([]);
  const [ totalCount, setTotaleCount ] = useState<number>(0);

  const getComments = async (pagination: Pagination<CommentFilterDTO>): Promise<void> => {
    try {
      setLoading(true);

      if(!postId || Array.isArray(postId)) {
        throw new CustomError(404, '잘못된 요청입니다.');
      }

      const res = await getCommentsAPI({
        pagination,
        postId,
      });

      setTotaleCount(res.totalCount);
      setComments(res.items); 
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
              댓글 조회 도중 알 수 없는 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </>
          } />
      );
    } finally {
      setLoading(false);
    }
  };

  const { pagination, onPagination } = usePagination<CommentFilterDTO>({
    afterPagination: getComments,
  });

  useEffect(() => {
    getComments(pagination);
  }, [ postId ]);

  /* -------------------- 댓글 작성 -------------------- */
  const [ isCreateLoading, setCreateLoading ] = useState<boolean>(false);

  const { loggedInUser } = useAuthContext();
  const { show } = useModalContext();
  
  const commentForm = useForm<CommentFormDTO>({ mode: 'all' });

  const createComment = async () => {
    try {
      setCreateLoading(true);

      if(!loggedInUser) {
        return show(<LoginModal />);
      }
  
      if(!postId || Array.isArray(postId)) {
        throw new CustomError(404, '잘못된 요청입니다.');
      };
  
      const { comment } = commentForm.getValues();

      if(!comment) {
        return commentForm.setError(
          'comment', 
          { type: 'manual', message: '댓글 내용을 입력해주세요' },
        );
      }

      const now = new Date().valueOf();

      const newComment = {
        userEmail: loggedInUser,
        postId,
        comment,
        originalCommentId: null,
        depth: 1,
        status: CommentStatus.ACTIVE,
        createdAt: now,
        updatedAt: now,
      };

      const response = await writeCommentAPI(newComment);

      // Algolia 데이터 생성 동기화
      // 그냥 firestore와의 동기화에 맡기기엔 refetch 시기를 잡기 어려움
      const index = searchClient.initIndex('comments_createdAt_desc');
      const createTask = await index.saveObject({
        objectID: response.objectID,
        ...newComment,
      });
      await index.waitTask(createTask.taskID);

      await getComments(pagination);
      commentForm.reset({ comment: '' });
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
              댓글 작성 도중 알 수 없는 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </>
          } />
      );
    } finally {
      setCreateLoading(false);
    }
  };

  return {
    comments,
    errors: commentForm.formState.errors,
    isCreateLoading,
    isLoading,
    pagination,
    register: {
      comment: commentForm.register('comment'),
      originalCommentId: commentForm.register('originalCommentId'),
    },
    totalCount,
    getComments,
    onPagination,
    submit: commentForm.handleSubmit(createComment),
  };
};

export function useCommentContext() {
  return useContext(CommentContext);
}

export function CommentContextProvider({ children }: PropsWithChildren) {
  const state = useComment();

  return (
    <CommentContext.Provider value={state}>
      {children}
    </CommentContext.Provider>
  );
} 