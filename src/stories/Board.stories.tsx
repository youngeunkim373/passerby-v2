'use client';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Post } from '@/app/_data/posts.interface';
import { BoardFilterDTO, GetPostsResponseDTO } from '@/app/board/board.interface';
import { Board } from '@/app/board/components/Board';
import { BoardList } from '@/app/board/components/BoardList';
import { BoardSearch } from '@/app/board/components/BoardSearch';
import { Props } from '@/components/common/Notification';
import { Pagination } from '@/components/common/Pagination';
import { Category } from '@/constants/post';
import { Pagination as PaginationProps } from '@/hooks/usePagination';

export default {
  component: Board,
  title: 'Components/Common/Board',
} as Meta<typeof Board>;

const Template: StoryFn<Props> = () => {
  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ list, setList ] = useState<Post[]>([]);
  const [ totalCount, setTotaleCount ] = useState<number>(0);
  const [ pagination, setPagination ] = useState<PaginationProps<BoardFilterDTO>>({ size: 3, page: 1 });

  const onPagination = async (newPagination: Partial<PaginationProps<BoardFilterDTO>>) => {
    const mergedPagination: PaginationProps<BoardFilterDTO> = {
      page: newPagination.page ?? pagination.page,
      size: newPagination.size ?? pagination.size, 
      filter: {
        ...(pagination.filter ?? {}),
        ...(newPagination.filter ?? {})
      } as BoardFilterDTO,
    };

    setPagination(mergedPagination);
  };

  const getBoardList = async ({ 
    page, 
    size, 
    filter, 
  }: PaginationProps<BoardFilterDTO>): Promise<GetPostsResponseDTO[] | void > => {
    try {
      setLoading(true);

      let items = [ ...data ];

      if(filter?.titleOrContent) {
        if(filter!.titleOrContent !== pagination.filter?.titleOrContent) {
          onPagination({ page: 1 });
        }

        items = items.filter((row) => row.title.includes(filter.titleOrContent!));
      }

      if(filter?.category) {
        if(filter!.category !== pagination.filter?.category) {
          onPagination({ page: 1 });
        }

        items = items.filter((row) => row.category.includes(filter.category!));
      }
      
      const totalCount = items.length;
      items = items.slice((page - 1) * size, page * size);

      setTotaleCount(totalCount);
      setList(items);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    getBoardList(pagination);
  }, [ 
    pagination.page, 
    pagination.size, 
    pagination.filter?.titleOrContent, 
    pagination.filter?.category,
  ]);

  return (
    <div className={style.wrapper}>
      <BoardSearch
        defaultFilter={pagination.filter}
        onPagination={onPagination} />
      <BoardList 
        isLoading={isLoading} 
        items={list} />
      <Pagination 
        pagination={pagination} 
        totalPage={Math.ceil(totalCount / pagination.size)}
        onPagination={onPagination} />
    </div> 
  );
};

const style = {
  wrapper: `
    w-full h-min
    relative
    flex flex-col gap-2 
    pt-8 pb-2 mb-auto sm:pt-10 sm:pb-4
  `,
  button: 'w-fit sticky bottom-4 !right-[16px z-10 ml-auto mb-2',
};

export const Default = Template.bind({});

Default.args = {
  closalble: true,
  content: 'This is Notification UI Test.',
  duration: 3000,
  title: 'This is Notification',
  type: 'info',
  showIcon: true,
  icon: false,
};

const data: Post[] = [
  {
    'objectID': '1',
    'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/passersby-67eaa.firebasestorage.app/o/static%2Fbubble-logo.png?alt=media&token=c1bdaf96-8814-48f7-899d-1b976966d1fe',
    'content': 'test1입니다. test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.test1입니다.',
    'hits': 3,
    'views': 6,
    'title': 'test1',
    'userEmail': 'youngeunkim373@gmail.com',
    'postedAt': 1732598076000,
    'updatedAt': 1732598076000,
    'category': [ Category.LOVE ],
  },
  {
    'objectID': '2',
    'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/passersby-67eaa.firebasestorage.app/o/static%2Fbubble-logo.png?alt=media&token=c1bdaf96-8814-48f7-899d-1b976966d1fe',
    'content': 'test2입니다. test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.test2입니다.',
    'hits': 3,
    'views': 6,
    'title': 'test2',
    'userEmail': 'youngeunkim373@gmail.com',
    'postedAt': 1732598076000,
    'updatedAt': 1732598076000,
    'category': [ Category.LOVE ],
  },
  {
    'objectID': '3',
    'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/passersby-67eaa.firebasestorage.app/o/static%2Fbubble-logo.png?alt=media&token=c1bdaf96-8814-48f7-899d-1b976966d1fe',
    'content': 'test3입니다. test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.test3입니다.',
    'hits': 3,
    'views': 6,
    'title': 'test3',
    'userEmail': 'youngeunkim373@gmail.com',
    'postedAt': 1732598076000,
    'updatedAt': 1732598076000,
    'category': [ Category.PARENTING, Category.FAMILY ],
  },
  {
    'objectID': '4',
    'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/passersby-67eaa.firebasestorage.app/o/static%2Fbubble-logo.png?alt=media&token=c1bdaf96-8814-48f7-899d-1b976966d1fe',
    'content': 'test4입니다. test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.test4입니다.',
    'hits': 3,
    'views': 6,
    'title': 'test4',
    'userEmail': 'youngeunkim373@gmail.com',
    'postedAt': 1732598076000,
    'updatedAt': 1732598076000,
    'category': [ Category.SCHOOL, Category.RELATIONSHIP ],
  },
  {
    'objectID': '5',
    'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/passersby-67eaa.firebasestorage.app/o/static%2Fbubble-logo.png?alt=media&token=c1bdaf96-8814-48f7-899d-1b976966d1fe',
    'content': 'test5입니다. test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.test5입니다.',
    'hits': 3,
    'views': 6,
    'title': 'test5',
    'userEmail': 'youngeunkim373@gmail.com',
    'postedAt': 1732598076000,
    'updatedAt': 1732598076000,
    'category': [ Category.ETC ],
  },
];