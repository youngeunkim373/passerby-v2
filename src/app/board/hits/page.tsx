import { Suspense } from 'react';

import { MostHitBoard } from '@/app/board/hits/components/MostHitBoard';

export default function MostViewed() {

  return (
    <Suspense>
      <MostHitBoard />
    </Suspense>
  );
}