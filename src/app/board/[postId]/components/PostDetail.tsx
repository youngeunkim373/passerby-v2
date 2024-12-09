'use client';
import { Viewer } from '@/components/common/editor/Viewer';

import { usePost } from '@/app/board/[postId]/usePost';
import { Eye } from '@/assets/icons/Eye';
import { Thumb } from '@/assets/icons/Thumb';
import { UserCircle } from '@/assets/icons/User';
import { CategoryLabelRecord } from '@/constants/post';
import { getTimeAgo } from '@/utils/time';

export function PostDetail() {
  const { postDetail: post } = usePost();

  if(!post) return <></>;

  return (
    <div className={style.wrapper}>
      <div className={style.titleArea.wrapper}>
        <p className={style.titleArea.category}>
          [{post.category.map((ele) => CategoryLabelRecord[ele]).join(', ')}]
        </p>
        <p className={style.titleArea.title}>
          {post.title}
        </p>
        <div className={style.info.wrapper}>
          <div className={style.info.user.wrapper}>
            {/* TODO 유저 대표 이미지 기능 추가하기 */}
            <UserCircle className={'size-12 text-gray-400'} />

            <div className={style.info.user.textArea}>
              {/* TODO 이메일 -> 닉네임으로 변경 */}
              <p>
                {post.userEmail}
              </p>
              <p className={style.info.user.time}>
                <time>{getTimeAgo(post.postedAt)} 게시</time>
              </p>
            </div>
          </div>

          <div className={style.info.reaction.wrapper}>
            <Eye className={style.info.reaction.icon} />
            {post.views} 
            <Thumb className={style.info.reaction.icon + ' ml-3'} />
            {post.hits}
          </div>
        </div>
      </div>

      <hr className={style.titleArea.divide} />

      <Viewer initialValue={post.content} />
    </div>
  );
}

const style = {
  wrapper: 'w-full pt-8 pb-2',
  titleArea: {
    wrapper: 'flex flex-col gap-4',
    title: 'font-semibold text-2xl text-gray-900 mb-6',
    category: 'font-normal text-gray-500 text-md mr-2',
    divide: 'w-full h-[1px] bg-gray-200 border-0 mt-8 mb-12',
  },
  info: {
    wrapper: 'flex justify-between items-center gap-1',
    user: {
      wrapper: 'flex items-center gap-2', 
      textArea: 'flex flex-col',
      time: 'text-gray-400',
    },
    reaction: {
      wrapper: 'flex gap-1',
      icon: 'size-4 text-gray-400',
    },
  },
};