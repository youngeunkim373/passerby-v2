'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useWrite } from '@/app/write/useWrite';
import { Button } from '@/components/buttons/Button';
import { Editor } from '@/components/common/editor/Editor';
import { Form } from '@/components/form/Form';
import { FormItemProps } from '@/components/form/FormItem';
import { Input, InputState } from '@/components/form/Input';
import { FormSelect } from '@/components/form/select/FormSelect';
import { SelectState } from '@/components/form/select/Select';
import { InfoModal } from '@/components/modals/InfoModal';
import { Category, CategoryLabelRecord } from '@/constants/post';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';

export function WriteForm() {
  const router = useRouter();

  // 유저 로그인 여부 확인
  const { isLoggedIn } = useAuthContext();
  const { show } = useModalContext();

  const { 
    control, 
    errors,
    fieldState,
    register, 
    handleChange,
    writePost,
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

  useEffect(() => {
    if (isLoggedIn === null) return;
  
    if (!isLoggedIn) {
      show(
        <InfoModal
          title={'로그인을 먼저 해주세요'}
          message={'글쓰기를 하려면 로그인이 먼저 선행되어야 합니다.'}
          button={'로그인하러 가기'}
          onConfirm={() => router.push('/login')}
        />
      );
    }
  }, [ isLoggedIn ]);

  return (
    <div className={style.wrapper}>
      <Form
        items={formItems}
        onSubmit={writePost}
        errors={errors}
        className={style.form} />

      <Editor 
        initialValue={' '}
        storageDirectory={'board'}
        onChange={handleChange} />

      <Button 
        variant={'solid'}
        className={'w-full'}
        onClick={writePost}>
        작성 완료
      </Button>
    </div>
  );
}

const style = {
  wrapper: 'w-full max-w-[700px] flex flex-col justify-center items-center gap-8 pt-12 pb-16 mx-auto',
  form: 'w-full  flex flex-col gap-4',
};