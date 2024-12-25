'use client';
import { BoardLinkSection } from '@/app/home/components/BoardLinkSection';
import { CategoryBoardSection } from '@/app/home/components/CategoryBoardSection';
import { MainBanner } from '@/app/home/components/MainBanner';
import { SearchSection } from '@/app/home/components/SearchSection';

export function HomeDetail() {
  return (
    <div className={style.wrapper}>
      {/* 배너는 부모 너비를 넘어야 하기 때문에 absolute 처리한 상태 */}
      <MainBanner />
      <SearchSection />
      <BoardLinkSection />
      <CategoryBoardSection />
    </div>
  );
}

const style = {
  wrapper: 'w-full flex flex-col items-center',
};