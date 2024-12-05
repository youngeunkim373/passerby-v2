import { useRouter } from 'next/navigation';

import { InfoModal } from '@/components/modals/InfoModal';

export function LoginModal() {
  const router = useRouter();

  return (
    <InfoModal
      title={'로그인을 먼저 해주세요'}
      message={<>로그인 후에 이용할 수 있는 기능입니다.</>}
      button={'로그인하러 가기'}
      onConfirm={() => router.push('/login?isBackAvailable=true')} />
  );
}