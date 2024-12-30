'use client';
import { useRouter } from 'next/navigation';

import { UserBoardList } from '@/app/user/posts/components/UserBoardList';
import { UserBoardSearch } from '@/app/user/posts/components/UserBoardSearch';
import { useUserBoard } from '@/app/user/posts/useUserBoard';
import { Button } from '@/components/buttons/Button';
import { PageTitle } from '@/components/common/PageTitle';
import { Pagination } from '@/components/common/Pagination';
import { useAuthContext } from '@/contexts/AuthContext';

export function UserBoard() {
  const router = useRouter();

  const { isLoggedIn, loggedInUser } = useAuthContext();

  const { 
    isDeleteLoading,
    isFetchLoading,
    list,
    pagination, 
    totalPage, 
    deletePost,
    onPagination,
  } = useUserBoard({ isLoggedIn, userEmail: loggedInUser });

  const isLoaded = !!isLoggedIn 
    && !isFetchLoading 
    && !isDeleteLoading;

  return (
    <div className={style.wrapper}>
      <PageTitle 
        title={'내가 쓴 글 보기'} 
        description={'그동안 작성한 게시글을 조회할 수 있습니다.'} />

      <UserBoardSearch
        defaultFilter={pagination.filter}
        onPagination={onPagination}
        userEmail={loggedInUser} />
      <UserBoardList 
        isLoading={!isLoaded} 
        items={list}
        deletePost={deletePost} />
      <Pagination 
        pagination={pagination} 
        totalPage={totalPage}
        onPagination={onPagination} />

      {isFetchLoading === false && (
        <Button 
          variant={'solid'} 
          className={style.button}
          onClick={() => router.push('/write')}>
          글 쓰기
        </Button>
      )}
    </div> 
  );
}

const style = {
  wrapper: `
    w-full h-min
    relative
    flex flex-col gap-2 
    pt-8 pb-2 mb-auto sm:pt-10 sm:pb-4
  `,
  button: 'w-fit sticky bottom-4 !right-[16px z-10 ml-auto mb-2',
};

