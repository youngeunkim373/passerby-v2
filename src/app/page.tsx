import { Suspense } from 'react';

import { HomeDetail } from '@/app/home/components/HomeDetail';

export default function Home() {
  return (
    <Suspense>
      <HomeDetail />
    </Suspense>
  );
}