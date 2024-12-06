import { useRouter } from 'next/navigation';

import { UserCircle } from '@/assets/icons/User';
import { Modal } from '@/components/layout/Modal';
import { useAuthContext } from '@/contexts/AuthContext';
import { PencilSquare } from '@/assets/icons/Pencil';

interface Props {
  hideModal: () => void;
  notifyFeatureInProgress: () => void;
}

export function UserMenuModal({ hideModal, notifyFeatureInProgress }: Props) {
  const router = useRouter();
  const { loggedInUser } = useAuthContext();

  return (
    <Modal>
      <div className={style.wrapper}>
        <div className={style.profile.wrapper}>
          {/* TODO 유저 대표 이미지 설정 기능 넣을 때 */}
          {/* <UserCircle className={style.profile.image} /> */}
          <div className={style.profile.welcome}>안녕하세요<br />{loggedInUser}님</div>
        </div>

        <div className={style.menu.wrapper}>
          <p
            className={style.menu.content}
            onClick={notifyFeatureInProgress}>
            <UserCircle className={style.menu.image} />
            계정 관리
          </p>
          <p 
            className={style.menu.content} 
            onClick={() => {
              router.push('/user/posts');
              hideModal();
            }}>
            <PencilSquare className={style.menu.image} />
            내가 쓴 글 보기
          </p>
        </div>
      </div>
    </Modal>
  );
}

const style = {
  wrapper: 'w-full lex flex-col justify-center text-lg py-4',
  profile: {
    wrapper: 'w-full flex flex-col items-center gap-2 pb-4 text-center',
    image: '!size-16 stroke-1 text-gray-400 mx-auto',
    welcome: 'text-2xl font-medium',
  },
  menu: {
    wrapper: 'w-full flex flex-col items-center rounded-md divide-y text-lg cursor-pointer',
    image: '!size-7',
    content: 'w-full flex gap-2 p-4',
  },
};