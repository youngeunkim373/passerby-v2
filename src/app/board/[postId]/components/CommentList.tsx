
import { useCommentContext } from '@/app/board/[postId]/CommentContext';
import { CommentForm } from '@/app/board/[postId]/components/CommentForm';

export function CommentList() {  
  const { errors, register, submit } = useCommentContext();

  return (
    <div className={listStyle.wrapper}>
      <CommentForm 
        errors={errors}
        register={register}
        submit={submit} />
    </div>
  );
}

const listStyle = {
  wrapper: 'w-full flex flex-col py-12',
};

