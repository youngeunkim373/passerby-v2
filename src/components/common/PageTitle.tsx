import { ReactNode } from 'react';

export interface Props {
  title: string;
  description?: string;
  suffix?: ReactNode;
}

export function PageTitle({ 
  title, 
  description, 
  suffix,
}: Props) {
  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.text.wrapper}>
          <p className={style.text.title}>{title}</p>
          {description && (
            <p className={style.text.description}>{description}</p>
          )}
        </div>

        {suffix}

      </div>
      <hr className={style.divide} />
    </div>
  );
}

const style = {
  wrapper: 'flex justify-between items-center',
  text: {
    wrapper: 'flex flex-col gap-2',
    title: 'text-3xl font-bold',
    description: 'text-sm text-gray-500',
  },
  divide: 'w-full h-[1px] bg-gray-200 border-0 mt-8 mb-6',
};