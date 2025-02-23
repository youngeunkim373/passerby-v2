import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  items: Post[];
  isLoading?: boolean | null;
  deletePost: (postId: Post['objectID']) => void;
}

export function UserBoardList({ items, isLoading = false, deletePost }: Props) {
  const [ imageLoadedState, setImageLoadedState ] = useState<boolean[]>([]);

  const postIds = JSON.stringify(items.map((item) => item.objectID));
  
  const allImagesLoaded = imageLoadedState.every(Boolean);
  const isListLoaded = isLoading === false && allImagesLoaded;

  const handleImageLoad = (idx: number) => {
    setImageLoadedState((prev) =>
      prev.map((loaded, i) => (i === idx ? true : loaded))
    );
  };

  useEffect(() => {
    if (imageLoadedState.length === 0) {
      const newImageState = items.map((item) => !item.imageUrl); 
      setImageLoadedState(newImageState);
    }
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
            deletePost={deletePost}
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
  wrapper: 'w-full flex flex-col justify-start items-center flex-grow divide-y divide-gray-100',
  content: { 
    wrapper: 'w-full flex flex-col gap-2 items-center flex-grow',
  },
};

/* ------------------ Item ------------------ */
interface ItemProps {
  item: Post;
  deletePost: (postId: Post['objectID']) => void;
  onImageLoad: () => void;
}

function Item({ item, deletePost, onImageLoad }: ItemProps) {
  const router = useRouter();

  const editPost = (postId: Post['objectID']) => {
    router.push(`/write?postId=${postId}`);
  };

  const textContent = item.content.replace(/<img[^>]*>/g, '').replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <li className={itemStyle.wrapper}>
      <div className={itemStyle.content.wrapper}>
        {item.imageUrl && (
          <Image 
            width={108}
            height={0}
            className={itemStyle.content.thumbnail} 
            src={item.imageUrl} 
            alt={item.title}
            onLoadingComplete={onImageLoad}
            onError={onImageLoad} />
        )}

        <div 
          className={itemStyle.content.text.wrapper}
          onClick={() => router.push(`/board/${item.objectID}`)}>
          <div className={itemStyle.content.text.body.wrapper}>
            <div className={itemStyle.content.text.body.textArea.wrapper}>
              <span className={itemStyle.content.text.body.textArea.category}>
                [{item.category.map((ele) => CategoryLabelRecord[ele]).join(', ')}]
              </span>
              <span className={itemStyle.content.text.body.textArea.title}>
                {item.title}
              </span>
            </div>

            <div className={itemStyle.content.text.body.description}>
              <Viewer 
                applyLoading={false}
                initialValue={textContent} />
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
      wrapper: 'w-full min-w-0 flex flex-col justify-between gap-x-6 sm:flex-row cursor-pointer',
      body: {
        wrapper: 'min-w-0',
        textArea: {
          wrapper: 'flex items-center gap-2',
          category: 'font-normal text-gray-500 text-[12px] text-nowrap',
          title: 'font-semibold text-gray-900 ellipsis-1',
        },
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