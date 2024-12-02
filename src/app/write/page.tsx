import { Suspense } from 'react';

import { WriteForm } from '@/app/write/components/WriteForm';

export default function Write() {

  return (
    <Suspense>
      <WriteForm />
    </Suspense>
  );
}