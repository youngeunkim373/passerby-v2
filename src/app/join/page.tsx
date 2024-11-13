import { Suspense } from 'react';

import { JoinForm } from '@/app/join/components/JoinForm';

export default function Join() {

  return (
    <Suspense>
      <JoinForm />
    </Suspense>
  );
}