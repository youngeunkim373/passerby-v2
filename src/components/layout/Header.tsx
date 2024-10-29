'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { ChevronDown } from '@/assets/icons/Chevron';
import { Close } from '@/assets/icons/Close';
import { Hamburger } from '@/assets/icons/Bar';
import BubbleLogo from '@/assets/images/bubble-logo.svg';
import { Button } from '@/components/general/Button';
import { items } from '@/constants/menu';
import useVisible from '@/hooks/useVisible';

/* ---------- Header ---------- */
export function Header() {
  const router = useRouter();
  const { isVisible, open, close } = useVisible();

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        {/* ----------- Logo area ----------- */}
        <Button 
          variant={'link'} 
          onClick={() => router.push('/')}
          className={style.logo}>
          <Image 
            src={BubbleLogo}
            alt={'logo'}
            width={56}
            className={'min-w-[56px]'} />
        </Button>

        {/* ----------- Menu area ----------- */}
        <div className={style.menu}>
          {items.map((item) => (
            <MenuButton key={item.title} title={item.title} />
          ))}
        </div>

        {/* ----------- User area ----------- */}
        <div className={style.user}>
          <Button 
            variant={'link'}
            size={'small'}
            color={'black'}
            onClick={() => router.push('/signin')}>
              로그인
          </Button>
          <Button 
            variant={'solid'} 
            size={'small'}
            color={'black'}
            className={'rounded-r-full rounded-s-full'}>
              회원가입
          </Button>
          
          {/* ----------- Mobile area ----------- */}
          <Button 
            variant={'link'}
            size={'small'}
            color={'black'}
            className={style.mobile}
            onClick={isVisible ? open : close}>
            {isVisible ? <Close className={'size-4'} /> : <Hamburger className={'size-7'} />}
          </Button>
        </div>
      </nav>
    </header>
  );
}

const style = {
  header: 'w-full h-header bg-white bg-opacity-80 backdrop-blur-50 flex justify-center items-center fixed top-0 z-90',
  nav: 'w-max h-header',
  logo: 'px-0 py-1 pt-2 mr-0 lg:mr-20',
  menu: 'hidden lg:flex lg:flex-1 lg:gap-12 lg:justify-start',
  user: 'flex gap-4 md:gap-8 my-auto ml-0 lg:ml-20',
  mobile: 'w-[28px] h-[28px] my-auto lg:hidden',
};

/* ---------- MenuButton ---------- */
interface MenuButtonProps {
  title: string
}

function MenuButton({ title }: MenuButtonProps) {

  return (
    <Button 
      variant={'link'} 
      color={'black'}
      className={'flex items-center font-semibold px-0'}>
      {title}
      <ChevronDown className={'size-3.5 ml-1 mt-0.5'} />
    </Button>
  );
}