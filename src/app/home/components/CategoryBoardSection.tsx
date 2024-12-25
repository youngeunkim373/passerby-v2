import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Category } from '@/app/_data/posts.interface';
import { BoardSortBy } from '@/app/board/board.interface';
import { BoardList } from '@/app/board/components/BoardList';
import { useBoard } from '@/app/board/useBoard';
import { ChevronDown } from '@/assets/icons/Chevron';
import { Search } from '@/assets/icons/Search';
import { Button } from '@/components/buttons/Button';
import { CategoryLabelRecord } from '@/constants/label';

type CategoryWithAll = Category | 'ALL';

export function CategoryBoardSection() {
  const router = useRouter();
  const [ currentCategory, setCurrentCategory ] = useState('ALL');

  const { isLoading, list, onPagination } = useBoard({ 
    sortBy: BoardSortBy.HITS,
    initialPagination: { page: 1, size: 5 }, 
  });

  const handleClickTab = (category: CategoryWithAll) => {
    setCurrentCategory(category);

    if (category !== 'ALL') {
      onPagination(
        { filter: { category } }, 
        { scroll: false },
      );
    } else {
      onPagination(
        { filter: { category: null } }, 
        { scroll: false },
      );
    }
  };

  const handleNavigate = () => {
    if (currentCategory === 'ALL') router.push('/board/hits');
    else router.push(`/board/hits?category="${currentCategory}"`);
  };

  const categoryWithAll = [ 'ALL', ...Object.values(Category) ] as CategoryWithAll[]; 
  const CategoryLabelRecordWithAll = {
    ALL: '전체',
    ...CategoryLabelRecord,
  };

  return (
    <div className={style.wrapper}>
      <span className={style.title}>
        <Search className={'!size-7'} strokeWidth={2} />
        카테고리별 조회하기
      </span>

      <div className={style.tabs.wrapper}>
        {categoryWithAll.map((category) => (
          <Button 
            key={category}
            className={`
              ${style.tabs.button}
              ${currentCategory === category 
            ? '!bg-gray-800 !text-white !border-gray-800' 
            : '!bg-white !text-gray-800 !border-gray-500'}
            `}
            color={'black'}
            variant={'solid'}
            size={'small'}
            type={'button'}
            onClick={() => handleClickTab(category)}>
            {CategoryLabelRecordWithAll[category]}
          </Button>
        ))}
      </div>

      <BoardList 
        isLoading={isLoading} 
        items={list} />

      <span 
        className={style.more} 
        onClick={handleNavigate}>
        더 보기
        <ChevronDown 
          strokeWidth={2} 
          className={'!size-4 group-hover:text-main'} />
      </span>
    </div>
  );
};

const style = {
  wrapper: 'w-full flex flex-col py-20',
  title: 'flex items-center gap-2 text-2xl font-semibold pb-6',
  tabs: {
    wrapper: 'flex flex-wrap items-center gap-2 text-lg pb-6',
    button: '!border !rounded-3xl',
  },
  more: 'group flex justify-center items-center gap-2 cursor-pointer',
};

