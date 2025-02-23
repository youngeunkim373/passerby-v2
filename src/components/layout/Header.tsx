'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Hamburger } from '@/assets/icons/Bar';
import { Close } from '@/assets/icons/Close';
import { SpinLoading } from '@/assets/icons/Loading';
import { UserCircle } from '@/assets/icons/User';
import { Button } from '@/components/buttons/Button';
import { MenuButton } from '@/components/buttons/MenuButton';
import { Notification } from '@/components/common/Notification';
import { Drawer } from '@/components/layout/Drawer';
import { UserMenuModal } from '@/components/modals/UserMenuModal';
import { items } from '@/constants/menu';
import { useAuthContext } from '@/contexts/AuthContext';
import { useDrawerContext } from '@/contexts/DrawerContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useNotificationContext } from '@/contexts/NotificationContext';

/* ---------- Header ---------- */
export function Header() {
  const router = useRouter();

  const { isLoggedIn, logout } = useAuthContext();
  const { isVisible, show: showDrawer, hide } = useDrawerContext();
  const { show: showModal, hide: hideModal } = useModalContext();
  const { show: showNotification } = useNotificationContext();

  const notifyFeatureInProgress = () => {
    showNotification(
      <Notification 
        title={'아직 준비 중인 기능입니다'} 
        duration={1200} />
    );
  };

  const handleClickMenu = (path: string) => {
    router.push(path);
    hide();
  };

  const handleClickUserMenu = () => {
    hide();

    showModal(
      <UserMenuModal 
        hideModal={hideModal}
        notifyFeatureInProgress={notifyFeatureInProgress} />
    );
  };

  const handleOpenMenu = () => {
    showDrawer(
      <Drawer 
        direction={'top'}>
        <div className={'flex flex-col gap-8 absolute top-[72px]'}>
          {/* TODO 메뉴 정하고 디자인 다시 하기 */}
          {items.map((item) => (
            <MenuButton 
              key={item.title} 
              title={item.title} 
              onClick={() => handleClickMenu(item.path)} />
          ))}
        </div>
      </Drawer>
    );
  };

  const handleLogout = () => {
    hide();
    logout();
  };

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        {/* ----------- Logo area ----------- */}
        <Button 
          variant={'link'} 
          onClick={() => handleClickMenu('/')}
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
              title={item.title}
              onClick={() => handleClickMenu(item.path)} />
          ))}
        </div>

        {/* ----------- User area ----------- */}
        <div className={style.user}>
          {isLoggedIn === true
            ? <LoggedInUserArea 
              logout={handleLogout} 
              onClickUser={handleClickUserMenu} />
            : isLoggedIn === false 
              ? <LoggedOutUserArea onClickMenu={handleClickMenu} /> 
              : <SpinLoading fill={'#64748b'} /> }
            
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
  user: 'flex items-center gap-4 md:gap-8 my-auto ml-0 lg:ml-20',
  mobile: 'w-[28px] h-[28px] my-auto lg:hidden',
};

/* ---------- UserArea ---------- */
interface Props {
  onClickMenu: (path: string) => void;
}

function LoggedOutUserArea({ onClickMenu }: Props) {
  return (
    <>
      <Button 
        variant={'link'}
        size={'small'}
        color={'black'}
        onClick={() => onClickMenu('/login')}>
        로그인
      </Button>
      <Button 
        variant={'solid'} 
        size={'small'}
        color={'black'}
        className={'rounded-r-full rounded-s-full'}
        onClick={() => onClickMenu('/join')}>
        회원가입
      </Button>
    </>
  );
}

function LoggedInUserArea({ logout, onClickUser }: { 
  logout: () => void;
  onClickUser: () => void; 
}) {
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
        color={'black'}
        onClick={onClickUser}>
        <UserCircle className={'size-7'} />
      </Button>
    </>
  );
}