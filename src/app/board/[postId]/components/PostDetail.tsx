'use client';
import { CommentContextProvider } from '@/app/board/[postId]/CommentContext';
import { CommentList } from '@/app/board/[postId]/components/CommentList';
import { Encourage } from '@/app/board/[postId]/components/Encourage';
import { PostTitle } from '@/app/board/[postId]/components/PostTitle';
import { usePost } from '@/app/board/[postId]/usePost';
import { Viewer } from '@/components/common/editor/Viewer';

export function PostDetail() {
  const { encouragement, post, encourage } = usePost();

  if(!post) return <></>;
  const { content, ...postInfo } = post;

  return (
    <CommentContextProvider>
      <div className={style.wrapper}>
        <PostTitle {...postInfo} />
        <Viewer initialValue={content} />
        <Encourage 
          encouragement={encouragement}
          encourage={encourage} />
        <CommentList />
      </div>
    </CommentContextProvider>
  );
}

const style = {
  wrapper: 'w-full pt-8 pb-2 mb-auto',
};