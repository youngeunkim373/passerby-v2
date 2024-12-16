'use client';
import { Viewer } from '@/components/common/editor/Viewer';

import { PostTitle } from '@/app/board/[postId]/components/PostTitle';
import { usePost } from '@/app/board/[postId]/usePost';

export function PostDetail() {
  const { postDetail: post } = usePost();

  if(!post) return <></>;
  const { content, ...postInfo } = post;

  return (
    <div className={style.wrapper}>
      <PostTitle {...postInfo} />
      <Viewer initialValue={content} />
    </div>
  );
}

const style = {
  wrapper: 'w-full pt-8 pb-2 mb-auto',
};