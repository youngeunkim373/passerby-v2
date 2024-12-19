import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Post } from '@/app/_data/posts.interface';
import { Eye } from '@/assets/icons/Eye';
import { Heart } from '@/assets/icons/Heart';
import { PencilSquare } from '@/assets/icons/Pencil';
import { Trash } from '@/assets/icons/Trash';
import { Button } from '@/components/buttons/Button';
import { Viewer } from '@/components/common/editor/Viewer';
import { EmptyState } from '@/components/common/EmptyState';
import { CardSkeleton } from '@/components/skeletons/CardSkeleton';
import { CategoryLabelRecord } from '@/constants/label';
import { getTimeAgo } from '@/utils/time';

/* ------------------ List ------------------ */
interface Props {
  isLoading?: boolean | null;
  items: Post[];
  deletePost: (postId: Post['objectID']) => void;
}

export function UserBoardList({ isLoading = false, items, deletePost }: Props) {
  const [ imagesLoaded, setImagesLoaded ] = useState(0);

  const imageCount = items.filter((item) => item.imageUrl).length;
  const allImagesLoaded = imagesLoaded === imageCount;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <ul className={listStyle.wrapper}>
      {/* 로딩 화면 */}
      {(isLoading || !allImagesLoaded) && (
        [ ...Array(3) ].map((_, idx) => <CardSkeleton key={idx} />)
      )}

      {/* 데이터 있을 때 화면 */}
      {(isLoading === false && items.length > 0) && (
        items.map((item) => (
          <Item 
            key={item.objectID} 
            item={item} 
            allImagesLoaded={allImagesLoaded}
            deletePost={deletePost}
            onImageLoad={handleImageLoad} />
        ))
      )}
      {/* 데이터 없을 때 화면 */}
      {(isLoading === false && items.length === 0) && (
        <div className={listStyle.content.wrapper}>
          <EmptyState
            title={'검색 결과가 없습니다'}
            description={<>검색어가 바르게 입력되었는지<br />확인해 보세요</>} />
        </div>
      )}
    </ul>
  );
}

const listStyle = {
  wrapper: 'w-full flex flex-col justify-start items-center flex-grow divide-y divide-gray-100',
  content: { 
    wrapper: 'w-full flex flex-col gap-2 justify-center items-center flex-grow',
  },
};

/* ------------------ Item ------------------ */
interface ItemProps {
  allImagesLoaded: boolean;
  item: Post;
  deletePost: (postId: Post['objectID']) => void;
  onImageLoad: () => void;
}

function Item({ allImagesLoaded, item, deletePost, onImageLoad }: ItemProps) {
  const router = useRouter();

  const editPost = (postId: Post['objectID']) => {
    router.push(`/write?postId=${postId}`);
  };

  const textContent = item.content.replace(/<img[^>]*>/g, '').replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <li 
      key={item.objectID} 
      className={`
        ${itemStyle.wrapper}
        ${allImagesLoaded ? 'visible' : 'invisible'}
      `}>
      <div className={itemStyle.content.wrapper}>
        {item.imageUrl && (
          <Image 
            width={108}
            height={0}
            className={itemStyle.content.thumbnail} 
            src={item.imageUrl} 
            alt={item.title}
            onLoadingComplete={onImageLoad} />
        )}

        <div 
          className={itemStyle.content.text.wrapper}
          onClick={() => router.push(`/board/${item.objectID}`)}>
          <div>
            <p className={itemStyle.content.text.body.title}>
              <span className={itemStyle.content.text.body.category}>
              [{item.category.map((ele) => CategoryLabelRecord[ele]).join(', ')}]
              </span>
              {item.title}
            </p>
            <div className={itemStyle.content.text.body.description}>
              <Viewer initialValue={textContent} />
            </div>
          </div>

          <div className={itemStyle.content.text.info.wrapper}>
            <div className={itemStyle.content.text.info.reaction}>
              <Eye className={'size-4 text-gray-500 p-1'} />
              {item.views} 
              <Heart className={'size-4 text-gray-500 p-1 ml-2'} />
              {item.hits}
            </div>

            <p className={itemStyle.content.text.info.time}>
              <time>{getTimeAgo(item.postedAt)}</time>
            </p>
          </div>
        </div>
      </div>

      <div className={itemStyle.action}>
        <Button 
          color={'blue'} 
          size={'small'}
          variant={'link'}
          onClick={() => editPost(item.objectID)}>
          <PencilSquare />
        </Button>
        <Button 
          color={'red'} 
          size={'small'}
          variant={'link'}
          onClick={() => deletePost(item.objectID)}>
          <Trash />
        </Button>
      </div>
    </li>
  );
}

const itemStyle = {
  wrapper: 'w-full py-4',
  content: {
    wrapper: 'w-full flex gap-x-4 sm:gap-x-6',
    thumbnail: `
      w-[88px] min-w-[88px] h-[88px]
      sm:w-[108px] sm:min-w-[108px] sm:h-[108px]
      object-cover rounded-md
    `,
    text: {
      wrapper: 'w-full flex flex-col justify-between gap-x-6 sm:flex-row cursor-pointer',
      body: {
        category: 'font-normal text-gray-500 text-[12px] mr-2',
        title: 'font-semibold text-gray-900 ellipsis-1',
        description: `
          text-xs/5 text-gray-500 break-all
          text-ellipsis overflow-hidden break-words line-clamp-1 sm:line-clamp-4
          mt-1
        `,
      },
      info: {
        wrapper: `
          flex justify-end items-center gap-1 shrink-0 
          sm:flex-col sm:items-end sm:justify-center
          mt-2 sm:mt-0
        `,
        reaction: 'flex justify-end text-sm/6 text-gray-900',
        time: 'text-xs/5 text-gray-500 ml-2',
      },
    }, 
  },
  action: 'flex gap-4 justify-end pt-2',
};