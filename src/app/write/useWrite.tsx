import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Post } from '@/app/_data/posts.interface';
import { GetPostResponseDTO } from '@/app/board/board.interface';
import { getPostAPI } from '@/app/board/board.service';
import { editPostAPI, writePostAPI } from '@/app/write/write.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';

type WriteFormDTO = Omit<Post, 'objectID' | 'postedAt'>;

export const useWrite = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const { postId } = Object.fromEntries(searchParams.entries());

  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ post, setPost ] = useState<GetPostResponseDTO | null>(null);

  const contentRef = useRef<string>('');

  const { loggedInUser } = useAuthContext();
  const { show } = useModalContext();

  const {
    control,
    formState: { errors },
    clearErrors,
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<WriteFormDTO>({ mode: 'all' });

  const formValidation = {
    title: { required: '제목을 입력해주세요' },
    category: { required: '분류를 선택해주세요' },
  };

  const occurContentError = (content: string): boolean => {
    const conditions = !content 
      || content === '<p><br></p>' 
      || content.replaceAll(' ', '') === '<p></p>';

    if(conditions) {
      setError('content', {
        type: 'manual',
        message: '게시글을 작성해주세요',
      });
    } else {
      clearErrors('content');
    }

    return conditions;
  };

  const handleChange = (value: string) => {
    if(occurContentError(value)) return;
    contentRef.current = value;
  };

  const createUpdatePost = async () => {
    const htmlContent = contentRef.current;
    if(occurContentError(htmlContent)) return;

    if(!loggedInUser) {
      throw new CustomError(401, '유저 인증 정보가 필요합니다.');
    }

    try {
      const { title, category } = getValues();

      // 정규식을 사용하여 첫 번째 이미지 태그 추출
      const imgRegex = /<img[^>]+src="([^">]+)"/i;
      const match = htmlContent.match(imgRegex);

      const imageUrl = match ? match[1] : undefined;
      const commonBody = { title, category, content: htmlContent, imageUrl };

      let res;

      if (!postId) {
        res = await writePostAPI({ ...commonBody, userEmail: loggedInUser });
      } else {
        res = await editPostAPI({ postId, ...commonBody });
      }
      
      router.replace(`/board/${res.objectID}`);
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
              게시글 작성 도중 알 수 없는 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </>
          } />
      );
    }
  };

  const getPostDetail = async (): Promise<void> => {
    try {
      if(!postId) return;

      setLoading(true);

      const res = await getPostAPI(postId as string);

      setPost(res);
      reset({
        title: res.title,
        category: res.category,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!postId) return;
    getPostDetail();
  }, [ postId ]);

  return {
    control,
    errors,
    fieldState: {
      title: errors.title ? 'error' : 'normal',
      category: errors.category ? 'error' : 'normal',
    },
    isLoading,
    post,
    register: {
      title: register('title', formValidation.title),
      category: register('category', formValidation.category),
    },
    handleChange,
    handleSubmit: handleSubmit(createUpdatePost),
  };
};

