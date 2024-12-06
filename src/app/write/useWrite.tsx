import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Post } from '@/app/_data/posts.interface';
import { GetPostResponseDTO } from '@/app/board/board.interface';
import { getPost } from '@/app/board/board.service';
import { writePost } from '@/app/write/write.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';

type WriteFormDTO = Omit<Post, 'objectID' | 'postedAt'>;

export const useWrite = () => {
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
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm<WriteFormDTO>({ mode: 'all' });

  const formValidation = {
    title: { required: '제목을 입력해주세요' },
    category: { required: '분류를 선택해주세요' },
  };

  const handleChange = (value: string) => {
    contentRef.current = value;
  };

  const createPost = async () => {
    if(!loggedInUser) {
      throw new CustomError(401, '유저 인증 정보가 필요합니다.');
    }

    try {
      const { title, category } = getValues();
      const htmlContent = contentRef.current;

      // 정규식을 사용하여 첫 번째 이미지 태그 추출
      const imgRegex = /<img[^>]+src="([^">]+)"/i;
      const match = htmlContent.match(imgRegex);

      // const res = await writePost({ 
      await writePost({ 
        title, 
        category, 
        content: contentRef.current,
        imageUrl: match ? match[1] : undefined,
        userEmail: loggedInUser,
      });
      
      // TODO 게시글 상세 페이지로 이동
      // router.push(`/board/${res.objectID}`)
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

      const res = await getPost(postId as string);

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
    writePost: handleSubmit(createPost),
  };
};

