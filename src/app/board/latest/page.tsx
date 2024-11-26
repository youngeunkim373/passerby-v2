import { Suspense } from 'react';

import { LatestBoard } from '@/app/board/latest/components/LatestBoard';

export default function Latest() {

  return (
    <Suspense>
      <LatestBoard />
    </Suspense>
  );
}