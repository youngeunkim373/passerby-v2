import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

import { CommentFormDTO } from '@/app/board/board.interface';
import { SpinLoading } from '@/assets/icons/Loading';
import { Button } from '@/components/buttons/Button';
import { Form } from '@/components/form/Form';
import { FormItemProps } from '@/components/form/FormItem';
import { Input } from '@/components/form/input/Input';
import { TextArea } from '@/components/form/TextArea';

interface Props {
  errors:  FieldErrors<CommentFormDTO>;
  isLoading: boolean;
  register: {
    comment: UseFormRegisterReturn<'comment'>;
    originalCommentId: UseFormRegisterReturn<'originalCommentId'>;
  },
  className?: string;
  submit: () => Promise<void>;
}

export function CommentForm ({ errors, isLoading, register, className, submit }: Props) {
  const formItems: FormItemProps[] = [
    {
      name: 'originalCommentId',
      hidden: true,
      children: <Input {...register.originalCommentId} />,
    },
    {
      name: 'comment',
      children: (
        <TextArea
          rows={1}
          maxLength={3000}
          placeholder={'댓글을 작성하려면 로그인을 해주세요'} 
          {...register.comment} />
      ),
    },
  ];

  return (
    <div
      className={`
      ${style.wrapper}
      ${className}
    `}>
      <Form 
        className={'w-full'}
        errors={errors}
        items={formItems} 
        onSubmit={submit} />
      <Button 
        size={'small'}
        className={'w-fit'}
        onClick={submit}>
        등록
        {isLoading && <SpinLoading className={'pl-1'} />}
      </Button>
    </div>
  );
}

const style = {
  wrapper: 'flex flex-col items-end gap-4',
};