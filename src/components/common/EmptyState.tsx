import { ReactNode } from 'react';

import { SearcDocument } from '@/assets/icons/Search';

interface Props {
  title: string | ReactNode;
  description?: string | ReactNode;
}

export function EmptyState({ title, description }: Props) {
  return (
    <div className={style.wrapper}>
      <div className={style.image.wrapper}>
        <SearcDocument className={style.image.icon} />
      </div>

      <div>
        <h2 className={style.text.title}>{title}</h2>
        {description && <p className={style.text.description}>{description}</p>}
      </div>
    </div>
  );
}

const style = {
  wrapper: 'grid gap-4 w-60',
  image: {
    wrapper: 'w-20 h-20 mx-auto bg-gray-100 rounded-full shadow-sm justify-center items-center inline-flex',
    icon: 'size-8 text-main',
  },
  text: {
    title: 'text-center text-black text-lg font-semibold leading-7 pb-1',
    description: 'text-center text-gray-600 text-base font-normal leading-relaxed pb-4',
  }
};