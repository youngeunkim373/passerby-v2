import { Skeleton } from '@/components/common/Skeleton';

export function CardSkeleton() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Skeleton className={style.title} />
        <Skeleton className={style.link} />
        <Skeleton className={style.description} />
      </div>

      <Skeleton className={style.image} />
    </div>
  );
}

const style = {
  wrapper: 'w-full flex justify-between gap-8 bg-white px-6 py-8 rounded-md',
  content: 'h-[90px] flex flex-col justify-between gap-3 flex-grow',
  title: 'w-[60%] h-[22px]',
  link: 'w-[80%] h-[22px]',
  description: 'w-full h-[22px]',
  image: 'w-[90px] h-[90px]',
};