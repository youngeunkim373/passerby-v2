import { useParams } from 'next/navigation';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { CommentStatus } from '@/app/_data/comments.interface';
import { CommentFormDTO } from '@/app/board/board.interface';
import { writeCommentAPI } from '@/app/board/board.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';

// @ts-expect-error: known issue
const CommentContext = createContext<ReturnType<typeof useComment>>(null);

export const useComment = () => {
  const { postId } = useParams();

  /* -------------------- 댓글 작성 -------------------- */
  const { loggedInUser } = useAuthContext();
  const { show } = useModalContext();
  
  const commentForm = useForm<CommentFormDTO>({ mode: 'all' });

  const createComment = async () => {
    try {
      if(!loggedInUser) {
        throw new CustomError(401, '유저 인증 정보가 필요합니다.');
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

      await writeCommentAPI(newComment);
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
    }
  };

  return {
    errors: commentForm.formState.errors,
    register: {
      comment: commentForm.register('comment'),
      originalCommentId: commentForm.register('originalCommentId'),
    },
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