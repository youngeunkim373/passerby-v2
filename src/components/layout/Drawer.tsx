import { PropsWithChildren } from 'react';

import { Presence } from '@/components/common/Presence';
import { useDrawerContext } from '@/contexts/DrawerContext';

export type DrawerDirection = 'top' | 'left' | 'right';

export interface Props extends PropsWithChildren {
  direction?: DrawerDirection;
  className?: string;
}

export function Drawer({ children, className = '', direction = 'right' }: Props) {
  const { isVisible } = useDrawerContext();
  const style = getStyle({ isVisible });

  return (
    <Presence present={isVisible}>
      <div 
        className={`
          ${style.wrapper}
          ${style.direction[direction]} 
          ${className}
        `}>
        <div className={style.content}>{children}</div>
      </div>
    </Presence>
  );
}

const getStyle = ({ isVisible }: { isVisible: boolean }) => ({
  wrapper: 'w-full h-full bg-white fixed inset-y-0 z-40 overflow-y-auto',
  content: 'w-max',
  direction: {
    top: `${isVisible ? 'animate-slide-in-down' : 'animate-slide-out-up'}`,
    left: `${isVisible ? 'animate-slide-in-right' : 'animate-slide-out-left'}`,
    right: `${isVisible ? 'animate-slide-in-left' : 'animate-slide-out-right'}`,
  },
});