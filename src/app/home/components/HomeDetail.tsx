import { BoardLinkSection } from '@/app/home/components/BoardLinkSection';
import { MainBanner } from '@/app/home/components/MainBanner';

export function HomeDetail() {
  return (
    <div className={style.wrapper}>
      {/* 배너는 부모 너비를 넘어야 하기 때문에 absolute 처리한 상태 */}
      <MainBanner />
      <BoardLinkSection />
    </div>
  );
}

const style = {
  wrapper: 'w-full flex flex-col items-center',
};