import { searchClient } from 'algolia';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Comment, CommentStatus } from '@/app/_data/comments.interface';
import { useCommentContext } from '@/app/board/[postId]/CommentContext';
import { CommentFormDTO } from '@/app/board/board.interface';
import { writeCommentAPI } from '@/app/board/board.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';

export const useNestedComment = (item: Comment) => {
  const { postId } = useParams();
  
  const { loggedInUser } = useAuthContext();
  const { show } = useModalContext();
  const { pagination, getComments } = useCommentContext();

  const [ isLoading, setLoading ] = useState(false);

  /* -------------------- 대댓글 작성 -------------------- */
  const nestedCommentForm = useForm<CommentFormDTO>({ mode: 'all' });

  useEffect(() => {
    nestedCommentForm.setValue(
      'originalCommentId', 
      item.objectID,
    );
  }, [ item ]);

  const createNestedComment = async () => {
    try {
      setLoading(true);

      if(!loggedInUser) {
        throw new CustomError(401, '유저 인증 정보가 필요합니다.');
      }

      if(!postId || Array.isArray(postId)) {
        throw new CustomError(404, '잘못된 요청입니다.');
      };
  
      const { comment, originalCommentId } = nestedCommentForm.getValues();

      if(!comment || !originalCommentId) {
        return nestedCommentForm.setError(
          'comment', 
          { type: 'manual', message: '댓글 내용을 입력해주세요' },
        );
      }

      const now = new Date().valueOf();

      const newNestedComment = {
        userEmail: loggedInUser,
        postId,
        comment,
        originalCommentId,
        depth: 2,
        status: CommentStatus.ACTIVE,
        createdAt: now,
        updatedAt: now,
      };

      const response = await writeCommentAPI(newNestedComment);

      // Algolia 데이터 생성 동기화
      // 그냥 firestore와의 동기화에 맡기기엔 refetch 시기를 잡기 어려움
      const index = searchClient.initIndex('comments_createdAt_desc');
      const createTask = await index.saveObject({
        objectID: response.objectID,
        ...newNestedComment,
      });
      await index.waitTask(createTask.taskID);

      await getComments(pagination);
      nestedCommentForm.reset({ comment: '' });
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
      setLoading(false);
    }
  };

  return {
    errors: nestedCommentForm.formState.errors,
    isLoading,
    register: {
      comment: nestedCommentForm.register('comment'),
      originalCommentId: nestedCommentForm.register('originalCommentId'),
    },
    submit: nestedCommentForm.handleSubmit(createNestedComment),
  };
};