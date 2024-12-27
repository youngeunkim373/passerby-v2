import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Post } from '@/app/_data/posts.interface';
import { Eye } from '@/assets/icons/Eye';
import { Heart } from '@/assets/icons/Heart';
import { Viewer } from '@/components/common/editor/Viewer';
import { EmptyState } from '@/components/common/EmptyState';
import { CardSkeleton } from '@/components/skeletons/CardSkeleton';
import { CategoryLabelRecord } from '@/constants/label';
import { getTimeAgo } from '@/utils/time';

/* ------------------ List ------------------ */
interface Props {
  items: Post[];
  isLoading?: boolean | null;
}

export function BoardList({ items, isLoading = false }: Props) {
  const [ imageLoadedState, setImageLoadedState ] = useState<boolean[]>([]);

  const postIds = useMemo(() => items.map((item) => item.objectID), [ items ]);
  
  const allImagesLoaded = imageLoadedState.every(Boolean);
  const isListLoaded = isLoading === false && allImagesLoaded;

  const handleImageLoad = (idx: number) => {
    setImageLoadedState((prev) =>
      prev.map((loaded, i) => (i === idx ? true : loaded))
    );
  };

  useEffect(() => {
    const newImageState = items.map((item) => !item.imageUrl);  
    setImageLoadedState(newImageState);
  }, [ postIds ]);

  return (
    <ul className={listStyle.wrapper}>
      {/* 로딩 화면 */}
      {!isListLoaded && (
        [ ...Array(3) ].map((_, idx) => <CardSkeleton key={idx} />)
      )}

      {/* 데이터 있을 때 화면 */}
      {/* onLoad 이벤트로 인해 조건부 렌더링 X */}
      <div 
        className={`
          ${listStyle.content.wrapper}
          ${(isListLoaded && items.length > 0) ? 'visible h-auto' : 'invisible h-0'}
          divide-y divide-gray-100
        `}>
        {items.map((item, idx) => (
          <Item 
            key={item.objectID} 
            item={item} 
            onImageLoad={() => handleImageLoad(idx)} />
        ))}
      </div>

      {/* 데이터 없을 때 화면 */}
      <div 
        className={`
          ${listStyle.content.wrapper}
          ${(isListLoaded && items.length === 0) ? 'block' : 'hidden'}
           my-auto
        `}>
        <EmptyState
          title={'검색 결과가 없습니다'}
          description={<>검색어가 바르게 입력되었는지<br />확인해 보세요</>} />
      </div>
    </ul>
  );
}

const listStyle = {
  wrapper: 'w-full flex-grow flex flex-col justify-start items-center',
  content: { 
    wrapper: 'w-full flex flex-col gap-2 items-center',
  },
};

/* ------------------ Item ------------------ */
interface ItemProps {
  item: Post;
  onImageLoad: () => void;
}

function Item({ item, onImageLoad }: ItemProps) {
  const router = useRouter();

  const textContent = item.content.replace(/<img[^>]*>/g, '').replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <li className={itemStyle.wrapper}>
      {item.imageUrl && (
        <Image 
          width={108}
          height={0}
          className={itemStyle.thumbnail} 
          src={item.imageUrl} 
          alt={item.title}
          onLoadingComplete={onImageLoad} />
      )}

      <div className={itemStyle.content.wrapper}>
        <div 
          className={itemStyle.content.textArea.wrapper}
          onClick={() => router.push(`/board/${item.objectID}`)}>
          <p className={itemStyle.content.textArea.title}>
            <span className={itemStyle.content.textArea.category}>
              [{item.category.map((ele) => CategoryLabelRecord[ele]).join(', ')}]
            </span>
            {item.title}
          </p>
          <div className={itemStyle.content.textArea.description}>
            <Viewer 
              applyLoading={false}
              initialValue={textContent} />
          </div>
        </div>

        <div className={itemStyle.content.info.wrapper}>
          <div className={itemStyle.content.info.reaction}>
            <Eye className={'size-4 text-gray-500 p-1'} />
            {item.views} 
            <Heart className={'size-4 text-gray-500 p-1 ml-2'} />
            {item.hits}
          </div>
          <p className={itemStyle.content.info.time}>
            <time>{getTimeAgo(item.postedAt)}</time>
          </p>
        </div>
      </div>
    </li>
  );
}

const itemStyle = {
  wrapper: 'w-full flex py-4 gap-x-4 sm:py-6 sm:gap-x-6',
  thumbnail: `
    w-[88px] min-w-[88px] h-[88px]
    sm:w-[108px] sm:min-w-[108px] sm:h-[108px]
    object-cover rounded-md
  `,
  content: {
    wrapper: 'w-full flex flex-col justify-between gap-x-6 sm:flex-row cursor-pointer',
    textArea: {
      wrapper: 'flex-auto',
      title: 'font-semibold text-gray-900 ellipsis-1',
      category: 'font-normal text-gray-500 text-[12px] mr-2',
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
};