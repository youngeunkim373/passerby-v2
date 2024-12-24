import { BoardLinkCard } from '@/app/home/components/BoardLinkCard';
import { Bell } from '@/assets/icons/Bell';
import { Fire } from '@/assets/icons/Fire';
import { Heart } from '@/assets/icons/Heart';
import { Carousel } from '@/components/common/Carousel';

export function BoardLinkSection() {
  const commonProps = {
    hits: {
      image: <Heart className={style.image} strokeWidth={1} />,
      link: '/board/hits',
      subtitle: 'Most cheered posts',
      title: '최다 응원 게시글',
    },
    views: {
      image: <Fire className={style.image} strokeWidth={1} />,
      link: '/board/views',
      subtitle: 'Most viewed posts',
      title: '최다 조회 게시글',
    },
    latest: {
      image: <Bell className={style.image} strokeWidth={1} />,
      link: '/board/latest',
      subtitle: 'Latest posts',
      title: '최신 작성 게시글',
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={'w-max'}>
        <div className={style.grid.wrapper}>
          <BoardLinkCard {...commonProps.hits} />
          <BoardLinkCard {...commonProps.views} />
          <BoardLinkCard {...commonProps.latest} />
        </div>

        <div className={style.carousel.wrapper}>
          <Carousel
            autoplay={true}
            hideButton={true}
            items={[
              {
                id: 'most_cheered_posts',
                content: (
                  <BoardLinkCard
                    key={1}
                    className={style.carousel.item}
                    {...commonProps.hits} />
                ),
              },
              {
                id: 'most_viewed_posts',
                content: (
                  <BoardLinkCard
                    key={2}
                    className={style.carousel.item}
                    {...commonProps.views} />
                ),
              },
              {
                id: 'latest_posts',
                content: (
                  <BoardLinkCard 
                    key={3}
                    className={style.carousel.item}
                    {...commonProps.latest} />
                ),
              },
            ]} />
        </div>
      </div>
    </div>
  );
}

const style = {
  wrapper: 'min-w-[100vw] py-20 bg-gray-50',
  image: '!size-12 text-main text-extralight',
  grid: {
    wrapper: `
      w-full hidden
      md:grid md:gap-4 md:grid-cols-3 md:grid-rows-1 
      sm:grid sm:gap-4 sm:grid-cols-2 sm:grid-rows-2 
    `,
  },
  carousel: {
    wrapper: 'w-full block sm:hidden rounded-lg border border-gray-100 shadow-lg',
    item: '!border-0 !border-t border-gray-100 shadow-none',
  },
};