'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/buttons/Button';

export function MainBanner() {
  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <div className={style.maxWrapper.wrapper}>
        <div className={style.maxWrapper.textArea.wrapper}>
          <p 
            className={`
              ${style.maxWrapper.textArea.subtitle}
              animate-[slideInRight_1s_forwards]
            `}>
            &quot;길 가는 사람 붙잡고 물어봐라&quot;<br />할 때 그 사람들
          </p>
          <p 
            className={`
              ${style.maxWrapper.textArea.title}
              animate-[slideInRight_1s_forwards]
            `}>
            길 가는 사람들
          </p>
          <p 
            className={`
              ${style.maxWrapper.textArea.description}
              animate-[slideInRight_1s_forwards_100ms]
            `}>
            가까운 사람에게도 하지 못 하는 속앓이 사연 다들 하나씩은 있잖아요?
            이 답답한 마음을 어딘가에라도 꼭 털어놓고 싶은데 누구에게도 말하기 어려울 때, 
            대나무숲처럼 이용할 수 있는 &quot;길 가는 사람들&quot;이 있습니다.
          </p>
          <div 
            className={`
              ${style.maxWrapper.textArea.actions}
              animate-[slideInRight_1s_forwards_150ms]
            `}>
            <Button 
              variant={'solid'} 
              className={'w-[120px]'}
              onClick={() => router.push('/write')}>
              고민 나누기
            </Button>
            <Button 
              className={'w-[120px]'}
              onClick={() => router.push('/join')}>
              회원가입
            </Button>
          </div>
        </div>

        <div className={style.maxWrapper.imageArea.wrapper}>
          <Image 
            alt={'banner_image'} 
            width={600}
            height={600}
            src={'/images/full-logo.png'} />
        </div>
      </div>
    </div>
  );
}

const style = {
  wrapper: 'min-w-[100vw] flex items-center bg-gray-50',
  maxWrapper: { 
    wrapper: `
      w-max h-full 
      flex flex-col-reverse items-center gap-10 md:flex-row
      py-8
    `,
    textArea: {
      wrapper: 'flex flex-col justify-center gap-4 text-sm text-center md:text-left',
      subtitle: 'text-gray-600 text-base font-[400] md:text-lg md:text-gray-800 font-semibold',
      title: 'text-5xl font-bold whitespace-nowrap',
      description: 'text-gray-600 hidden md:block',
      actions: 'flex gap-2 pt-4 justify-center md:justify-start',
    },
    imageArea: {
      wrapper: `
      w-full min-w-[288px] max-w-[320px] md:min-w-[340px] md:max-w-full 
      flex justify-center md:justify-start
    `,
    },
  },
};