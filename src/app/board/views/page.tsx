import { Suspense } from 'react';

import { MostViewedBoard } from '@/app/board/views/components/MostViewedBoard';

export default function MostViewed() {

  return (
    <Suspense>
      <MostViewedBoard />
    </Suspense>
  );
}