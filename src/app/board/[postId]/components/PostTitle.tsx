import { Post } from '@/app/_data/posts.interface';
import { Eye } from '@/assets/icons/Eye';
import { Heart } from '@/assets/icons/Heart';
import { CategoryLabelRecord } from '@/constants/label';
import { getTimeAgo } from '@/utils/time';

export function PostTitle(props: Omit<Post, 'objectID' | 'content'>) {
  return (
    <div>
      <div className={style.titleArea.wrapper}>
        <p className={style.titleArea.category}>
          [{props.category.map((ele) => CategoryLabelRecord[ele]).join(', ')}]
        </p>
        <p className={style.titleArea.title}>
          {props.title}
        </p>
        <div className={style.info.wrapper}>
          <div className={style.info.user.wrapper}>
            {/* TODO 유저 대표 이미지 기능 추가하기 */}
            {/* <UserCircle className={'size-12 text-gray-400'} /> */}

            <div className={style.info.user.textArea}>
              {/* TODO 이메일 -> 닉네임으로 변경 */}
              <p>
                {props.userEmail}
              </p>
              <p className={style.info.user.time}>
                <time>{getTimeAgo(props.postedAt)} 게시</time>
              </p>
            </div>
          </div>

          <div className={style.info.reaction.wrapper}>
            <Eye className={style.info.reaction.icon} />
            {props.views} 
            <Heart className={style.info.reaction.icon + ' ml-3'} />
            {props.hits}
          </div>
        </div>
      </div>

      <hr className={style.titleArea.divide} />
    </div>
  );
}

const style = {
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