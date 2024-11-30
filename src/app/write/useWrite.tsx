import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Post } from '@/app/_data/posts.interface';
import { writePost } from '@/app/write/write.service';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';

type WriteFormDTO = Omit<Post, 'objectID' | 'postedAt'>;

export const useWrite = () => {
  const contentRef = useRef<string>('');

  const { show } = useModalContext();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    getValues,
  } = useForm<WriteFormDTO>({ mode: 'all' });

  const formValidation = {
    title: { required: '제목을 입력해주세요' },
    category: { required: '분류를 선택해주세요' },
  };

  const handleChange = (value: string) => {
    contentRef.current = value;
  };

  const createPost = async () => {
    try {
      const { title, category } = getValues();

      const res = await writePost({ 
        title, 
        category, 
        content: contentRef.current
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

  return {
    control,
    errors,
    register: {
      title: register('title', formValidation.title),
      category: register('category', formValidation.category),
    },
    handleChange,
    writePost: handleSubmit(createPost),
  };
};

