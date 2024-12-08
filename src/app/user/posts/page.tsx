import { Suspense } from 'react';

import { UserBoard } from '@/app/user/posts/components/UserBoard';

export default function UserPosts() {
  return (
    <Suspense>
      <UserBoard />
    </Suspense>
  );
}