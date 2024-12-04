import { Close } from '@/assets/icons/Close';
import { PropsWithChildren } from 'react';

type TagColor = 'main' | 'red' | 'blue' | 'orange' | 'green' | 'black';

export interface Props extends PropsWithChildren {
 color: TagColor;
 onClose?: () => void;
}

export function Tag({ children, color, onClose }: Props) {
  const handleRemove = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    if(onClose) onClose();
  };

  return(
    <span 
      className={`
        ${style.tag}
        ${tagConfig.color[color]}
      `}>
      {children}
      <Close 
        className={style.close} 
        onClick={handleRemove} />
    </span>
  );
}

const tagConfig = {
  color: {
    main: 'bg-main-pale text-main',
    red: 'bg-red-pale text-red',
    blue: 'bg-blue-pale text-blue',
    orange: 'bg-orange-pale text-orange',
    green: 'bg-green-pale text-green',
    black: 'bg-gray-100 text-gray-600',
  },
};

const style = {
  tag: `
    w-fit
    flex justify-center items-center
    rounded
    font-semibold text-xs text-nowrap
    pl-2.5 pr-0.5 py-1 me-2
  `,
  close: '!size-6 cursor-pointer p-2',
};

