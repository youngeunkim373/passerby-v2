'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Hamburger } from '@/assets/icons/Bar';
import { Close } from '@/assets/icons/Close';
import { UserCircle } from '@/assets/icons/User';
import { Button } from '@/components/buttons/Button';
import { MenuButton } from '@/components/buttons/MenuButton';
import { Drawer } from '@/components/layout/Drawer';
import { items } from '@/constants/menu';
import { useAuthContext } from '@/contexts/AuthContext';
import { useDrawerContext } from '@/contexts/DrawerContext';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/* ---------- Header ---------- */
export function Header() {
  const router = useRouter();

  const { isVisible, show, hide } = useDrawerContext();
  const { isLoggedIn, logout } = useAuthContext();

  const handleOpenMenu = () => [
    show(
      <Drawer 
        direction={'top'}>
        <div className={'flex flex-col gap-8 absolute top-[72px]'}>
          {/* TODO 메뉴 정하고 디자인 다시 하기 */}
          {items.map((item) => (
            <MenuButton key={item.title} title={item.title} onClick={hide} />
          ))}
        </div>
      </Drawer>
    )
  ];

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        {/* ----------- Logo area ----------- */}
        <Button 
          variant={'link'} 
          onClick={() => router.push('/')}
          className={style.logo.button}>
          <Image 
            src={'/images/bubble-logo.svg'}
            alt={'logo'}
            width={56}
            height={49.5}
            className={style.logo.image} />
        </Button>

        {/* ----------- Menu area ----------- */}
        <div className={style.menu}>
          {items.map((item) => (
            <MenuButton 
              key={item.title} 
              title={item.title} />
          ))}
        </div>

        {/* ----------- User area ----------- */}
        <div className={style.user}>
          {isLoggedIn 
            ? <LoggedInUserArea logout={logout} />
            : <LoggedOutUserArea router={router} />}
            
          {/* ----------- Mobile area ----------- */}
          <Button 
            variant={'link'}
            size={'small'}
            color={'black'}
            className={style.mobile}
            onClick={isVisible ? hide : handleOpenMenu}>
            {isVisible ? <Close className={'size-4'} /> : <Hamburger className={'size-7'} />}
          </Button>
        </div>
      </nav>
    </header>
  );
}

const style = { 
  header: 'w-full h-header bg-white flex justify-center items-center fixed top-0 z-50',
  nav: 'w-max h-header',
  logo: {
    button: 'px-0 py-1 pt-2 mr-0 lg:mr-20',
    image:'min-w-[56px]',
  },
  menu: 'hidden lg:flex lg:flex-1 lg:gap-12 lg:justify-start',
  user: 'flex gap-4 md:gap-8 my-auto ml-0 lg:ml-20',
  mobile: 'w-[28px] h-[28px] my-auto lg:hidden',
};

/* ---------- UserArea ---------- */
function LoggedOutUserArea({ router }: { router: AppRouterInstance }) {
  return (
    <>
      <Button 
        variant={'link'}
        size={'small'}
        color={'black'}
        onClick={() => router.push('/login')}>
              로그인
      </Button>
      <Button 
        variant={'solid'} 
        size={'small'}
        color={'black'}
        className={'rounded-r-full rounded-s-full'}
        onClick={() => router.push('/join')}>
        회원가입
      </Button>
    </>
  );
}

function LoggedInUserArea({ logout }: { logout: () => void }) {
  return (
    <>
      <Button 
        variant={'link'}
        size={'small'}
        color={'black'}
        onClick={logout}>
        로그아웃
      </Button>
      <Button 
        variant={'link'}
        size={'small'}
        color={'black'}>
        <UserCircle className={'size-7'} />
      </Button>
    </>
  );
}