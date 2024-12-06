'use client';
import { useEffect } from 'react';

import { useWrite } from '@/app/write/useWrite';
import { Button } from '@/components/buttons/Button';
import { Editor } from '@/components/common/editor/Editor';
import { Form } from '@/components/form/Form';
import { FormItemProps } from '@/components/form/FormItem';
import { Input, InputState } from '@/components/form/Input';
import { FormSelect } from '@/components/form/select/FormSelect';
import { SelectState } from '@/components/form/select/Select';
import { LoginModal } from '@/components/modals/LoginModal';
import { Category, CategoryLabelRecord } from '@/constants/post';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';

export function WriteForm() {
  const { isLoggedIn } = useAuthContext();
  const { show } = useModalContext();

  const { 
    control, 
    errors,
    fieldState,
    isLoading,
    post,
    register, 
    handleChange,
    handleSubmit,
  } = useWrite();

  const formItems: FormItemProps[] = [
    {
      name: 'title',
      label: '제목',
      isRequired: true,
      children: (
        <Input
          placeholder={'제목을 입력해주세요'}
          allowClear={false}
          state={fieldState.title as InputState}
          {...register.title} />
      ),
    },
    {
      name: 'category',
      label: '분류',
      isRequired: true,
      children: (
        <FormSelect
          control={control}
          placeholder={'분류를 선택해주세요'}
          mode={'multiple'}
          state={fieldState.category as SelectState}
          options={
            Object
              .entries(Category)
              .map(([ key, value ]) => ({ id: key, title: CategoryLabelRecord[value] }))
          }
          {...register.category} />
      ),
    },
  ];

  // 유저 로그인 여부 확인
  useEffect(() => {
    if (isLoggedIn === null) return;
    if (isLoggedIn === false) {
      show(<LoginModal />);
    }
  }, [ isLoggedIn ]);

  return (
    <div className={style.wrapper}>
      {isLoading && (
        <div className={style.loading}>게시글 로드 중...</div>
      )}

      <Form
        items={formItems}
        onSubmit={handleSubmit}
        errors={errors}
        className={style.form} />

      <Editor 
        initialValue={' '}
        content={post?.content}
        storageDirectory={'board'}
        onChange={handleChange} />

      <Button 
        variant={'solid'}
        className={'w-full'}
        onClick={handleSubmit}>
        작성 완료
      </Button>
    </div>
  );
}

const style = {
  wrapper: 'w-full max-w-[700px] flex flex-col justify-center items-center gap-8 pt-12 pb-16 mx-auto',
  form: 'w-full  flex flex-col gap-4',
  loading: `
    absolute top-[calc(50%+22.5px)] z-40
    left-1/2 -translate-x-1/2 -translate-y-1/2 
    text-gray-400
  `,
};