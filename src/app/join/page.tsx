'use client';

import { Suspense } from 'react';
import { JoinForm } from './components/JoinForm';

export default function Join() {
 
  return (
    <Suspense>
      <JoinForm />
    </Suspense>

  );
}