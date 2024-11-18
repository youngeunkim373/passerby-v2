import { Suspense } from 'react';

import { LoginForm } from '@/app/login/components/LoginForm';

export default function Login() {

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}