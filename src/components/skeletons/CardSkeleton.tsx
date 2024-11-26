import { Skeleton } from '@/components/common/Skeleton';

export function CardSkeleton() {
  return (
    <div className={style.wrapper}>
      <Skeleton className={style.image} />

      <div className={style.content.wrapper}>
        <Skeleton className={style.content.title} />
        <Skeleton className={style.content.link} />
        <Skeleton className={style.content.description} />
      </div>
    </div>
  );
}

const style = {
  wrapper: 'w-full flex justify-between gap-x-4 sm:gap-x-6 py-4 sm:py-6 bg-white',
  content: {
    wrapper: 'h-[88px] flex flex-col justify-between flex-grow sm:h-[108px]',
    title: 'w-[60%] h-[20px]',
    link: 'w-[80%] h-[20px]',
    description: 'w-full h-[20px]',
  },
  image: `
    w-[88px] min-w-[88px] h-[88px]
    sm:w-[108px] sm:min-w-[108px] sm:h-[108px]
    rounded-md
  `,
};

