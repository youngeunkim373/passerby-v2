import { useState } from 'react';

import { Comment } from '@/app/_data/comments.interface';
import { useCommentContext } from '@/app/board/[postId]/CommentContext';
import { CommentForm } from '@/app/board/[postId]/components/CommentForm';
import { useNestedComment } from '@/app/board/[postId]/useNestedComment';
import { Button } from '@/components/buttons/Button';
import { Pagination } from '@/components/common/Pagination';
import { getTimeAgo } from '@/utils/time';

/* ------------------ List ------------------ */
export function CommentList() {  
  const { 
    comments, 
    errors, 
    isCreateLoading,
    pagination, 
    register, 
    totalCount, 
    onPagination,
    submit,
  } = useCommentContext();

  return (
    <div className={listStyle.wrapper}>
      <CommentForm 
        errors={errors}
        isLoading={isCreateLoading}
        register={register}
        submit={submit} />

      <ul className={listStyle.list}>
        {comments.map((comment) => (
          <Item 
            key={comment.objectID} 
            item={comment} />
        ))}
      </ul>

      <Pagination 
        pagination={pagination} 
        totalPage={Math.ceil(totalCount / pagination.size)}
        onPagination={onPagination} />
    </div>
  );
}

const listStyle = {
  wrapper: 'w-full flex flex-col py-12',
  list: 'divide-y divide-gray-200',
};

/* ------------------ Item ------------------ */
interface ItemProps {
  item: Comment;
}

function Item({ item }: ItemProps) {
  const [ isOpen, setOpen ] = useState(false);

  const { 
    errors, 
    isLoading,
    register, 
    submit 
  } = useNestedComment(item); 

  return (
    <li 
      key={item.objectID} 
      className={itemStyle.wrapper}>
      {/* TODO 유저 대표 이미지 적용 */}
      {/* TODO 유저 이메일 -> 닉네임 변경 */}
      <p className={itemStyle.user}>{item.userEmail}</p>
      <p>{item.comment}</p>
      <div className={itemStyle.reply}>
        <Button 
          color={'blue'}
          size={'small'}
          className={'w-fit'}
          variant={'link'}
          onClick={() => setOpen((prev) => !prev)}>
          답글
        </Button>
        <time className={itemStyle.time}>{getTimeAgo(item.createdAt)}</time>
      </div>

      {isOpen && (
        <div className={itemStyle.list.bracket}>
          <CommentForm 
            className={'w-full'}
            errors={errors}
            isLoading={isLoading}
            register={register}
            submit={submit} />
        </div>
      )}

      <ul 
        className={`
          ${listStyle.list} 
          ${itemStyle.list.wrapper}
        `}>
        {(item.nestedComments ?? []).map((nestedComment) => (
          <li 
            key={nestedComment.objectID}
            className={`
                  ${itemStyle.list.item}
                  ${itemStyle.list.bracket}
                  first:border-t first:border-gray-200
                `}>
            <div className={'flex flex-col gap-4'}>
              <p className={itemStyle.user}>{nestedComment.userEmail}</p>
              <p>{nestedComment.comment}</p>
              <time className={itemStyle.time}>{getTimeAgo(nestedComment.createdAt)}</time>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

const itemStyle = {
  wrapper: 'w-full flex flex-col gap-4 py-4',
  user: 'font-semibold',
  time: 'text-sm text-gray-400',
  reply: 'flex items-center gap-2',
  list: {
    wrapper: 'flex flex-col',
    item: 'flex items-start py-4',
    bracket: `
      flex 
      before:content-["⌞"] 
      before:relative before:-top-4
      before:text-3xl before:text-gray-400 
      before:pl-8 before:pr-3
    `,
  },
};