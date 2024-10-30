'use client';
import { PropsWithChildren } from 'react';

import { VisibleSet } from '@/hooks/useVisible';

export type DrawerDirection = 'top' | 'left' | 'right';

export interface Props extends Pick<VisibleSet, 'isVisible'>, PropsWithChildren {
  id: string;
  direction?: DrawerDirection;
  className?: string;
}

export function Drawer({ id, children, direction = 'right', isVisible, className = '' }: Props) {
  const style = getStyle({ isVisible });

  return (
    <div 
      id={id}
      className={`
        ${style.wrapper}
        ${style.direction.common} 
        ${style.direction[direction]} 
        ${className}
      `}>
      <div className={style.content}>{children}</div>
    </div>
  );
}

const getStyle = ({ isVisible }: { isVisible: boolean }) => ({
  wrapper: 'w-full h-full bg-white fixed inset-y-0 z-40 overflow-y-auto',
  content: 'w-max',
  direction: {
    common: 'transition-transform ease-in-out duration-500',
    top: `${isVisible ? 'translate-y-0' : '-translate-y-full'}`,
    left: `${isVisible ? 'translate-x-0' : '-translate-x-full'}`,
    right: `${isVisible ? 'translate-x-0' : 'translate-x-full'}`,
  },
});