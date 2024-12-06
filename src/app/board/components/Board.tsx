import { useRouter } from 'next/navigation';

import { Post } from '@/app/_data/posts.interface';
import { BoardFilterDTO } from '@/app/board/board.interface';
import { BoardList } from '@/app/board/components/BoardList';
import { BoardSearch } from '@/app/board/components/BoardSearch';
import { Button } from '@/components/buttons/Button';
import { Pagination } from '@/components/common/Pagination';
import { PaginationSet } from '@/hooks/usePagination';

interface Props {
  isLoading: boolean | null;
  list: Post[];
  pagination: PaginationSet<BoardFilterDTO>['pagination'];
  totalPage: number;
  onPagination: PaginationSet<BoardFilterDTO>['onPagination'];
}

export function Board({ 
  isLoading,
  list,
  pagination,
  totalPage,
  onPagination,
}: Props) {
  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <BoardSearch
        defaultFilter={pagination.filter}
        onPagination={onPagination} />
      <BoardList 
        isLoading={isLoading} 
        items={list} />
      <Pagination 
        pagination={pagination} 
        totalPage={totalPage}
        onPagination={onPagination} />

      {isLoading === false && (
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
