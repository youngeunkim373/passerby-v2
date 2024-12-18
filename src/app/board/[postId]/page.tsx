import { Suspense } from 'react';

import { PostDetail } from '@/app/board/[postId]/components/PostDetail';

export default function Post() {

  return (
    <Suspense>
      <PostDetail />
    </Suspense>
  );
}