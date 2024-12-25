import { Meta, StoryFn } from '@storybook/react';

import { BoardLinkCard } from '@/app/home/components/BoardLinkCard';
import { Bell } from '@/assets/icons/Bell';
import { Fire } from '@/assets/icons/Fire';
import { Heart } from '@/assets/icons/Heart';
import { Carousel, Props as CarouselProps } from '@/components/common/Carousel';

export default {
  component: Carousel,
  title: 'Components/Common/Carousel',
  argTypes: {
    className: { control: false },
    items: { control: false },
  }
} as Meta<typeof Carousel>;

const Template: StoryFn<CarouselProps> = (props) => {
  return <Carousel {...props} />;
};

export const Default = Template.bind({});

const style = {
  card: '!border-0 !border-t border-gray-100',
  image: '!size-12 text-main text-extralight',
};

Default.args = {
  items: [
    {
      id: 'most_cheered_posts',
      content: (
        <BoardLinkCard
          key={1}
          className={'!border-0 !border-t border-gray-100'}
          image={<Heart className={style.image} strokeWidth={1} />}
          link={'/board/hits'}
          subtitle={'Most cheered posts'}
          title={'최다 응원 게시글'} />
      ),
    },
    {
      id: 'most_viewed_posts',
      content: (
        <BoardLinkCard
          key={2}
          className={'!border-0 !border-t border-gray-100'}
          image={<Fire className={style.image} strokeWidth={1} />}
          link={'/board/views'}
          subtitle={'Most viewed posts'}
          title={'최다 조회 게시글'} />
      ),
    },
    {
      id: 'latest_posts',
      content: (
        <BoardLinkCard 
          key={3}
          className={'!border-0 !border-t border-gray-100'}
          image={<Bell className={style.image} strokeWidth={1} />}
          link={'/board/latest'}
          subtitle={'Latest posts'}
          title={'최신 작성 게시글'} />
      ),
    },
  ],
  className: 'shadow-lg border',
  autoplay: true,
  hideButton: false,
  hideIndicator: false,
};