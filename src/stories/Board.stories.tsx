'use client';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Post } from '@/app/_data/posts.interface';
import { BoardFilterDTO, GetBoardResponseDTO } from '@/app/board/board.interface';
import { Board } from '@/app/board/components/Board';
import { Props } from '@/components/common/Notification';
import { Category } from '@/constants/post';
import { Pagination } from '@/hooks/usePagination';

export default {
  component: Board,
  title: 'Components/Common/Board',
} as Meta<typeof Board>;

const Template: StoryFn<Props> = () => {
  const [ isLoading, setLoading ] = useState<boolean | null>(null);
  const [ list, setList ] = useState<Post[]>([]);
  const [ totalCount, setTotaleCount ] = useState<number>(0);
  const [ pagination, setPagination ] = useState<Pagination<BoardFilterDTO>>({ size: 3, page: 1 });

  const onPagination = async (newPagination: Partial<Pagination<BoardFilterDTO>>) => {
    const mergedPagination: Pagination<BoardFilterDTO> = {
      page: newPagination.page ?? pagination.page,
      size: newPagination.size ?? pagination.size, 
      filter: {
        ...(pagination.filter ?? {}),
        ...(newPagination.filter ?? {})
      } as BoardFilterDTO,
    };

    setPagination(mergedPagination);
  };

  const getBoardList = async (newPagination: Pagination<BoardFilterDTO>)
    : Promise<GetBoardResponseDTO[] | void > => {
    try {
      setLoading(true);

      const { page, size, filter } = newPagination;

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
      setLoading(false);
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
    <div className={'w-max'}>
      <Board 
        isLoading= {isLoading}
        list={list}
        pagination={pagination}
        totalPage={Math.ceil(totalCount / pagination.size)}
        onPagination={onPagination} />
    </div>
  );
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
    'objectID': '2yQzzzDoHXi50CWMi7pb',
    'imageUrl': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    'objectID': '2yQzzzDoHXi50CWMi7pb',
    'imageUrl': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    'objectID': '2yQzzzDoHXi50CWMi7pb',
    'imageUrl': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    'objectID': '2yQzzzDoHXi50CWMi7pb',
    'imageUrl': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    'objectID': '2yQzzzDoHXi50CWMi7pb',
    'imageUrl': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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