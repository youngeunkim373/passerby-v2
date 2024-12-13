
import { Comment } from '@/app/_data/comments.interface';
import { useCommentContext } from '@/app/board/[postId]/CommentContext';
import { CommentForm } from '@/app/board/[postId]/components/CommentForm';
import { Button } from '@/components/buttons/Button';
import { Pagination } from '@/components/common/Pagination';
import { getTimeAgo } from '@/utils/time';

export function CommentList() {  
  const { 
    comments, 
    errors, 
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
          onClick={console.log}>
          답글
        </Button>
        <time className={itemStyle.time}>{getTimeAgo(item.createdAt)}</time>
      </div>
    </li>
  );
}

const itemStyle = {
  wrapper: 'w-full flex flex-col gap-4 py-4',
  user: 'font-semibold',
  time: 'text-sm text-gray-400',
  reply: 'flex items-center gap-2',
};