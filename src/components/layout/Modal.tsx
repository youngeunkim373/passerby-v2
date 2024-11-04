import {  PropsWithChildren } from 'react';

import { Presence } from '@/components/common/Presence';
import { useModalContext } from '@/contexts/ModalContext';

export interface Props extends PropsWithChildren {
  className?: string;
}

export function Modal({ children, className = '' }: Props) {
  const { isVisible, hide } = useModalContext();

  return (
    <Presence present={isVisible}>
      <div 
        className={`
          ${style.wrapper} 
          ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}
        `}>
        {/* ---------- Backdrop area ---------- */}
        <div className={style.backdrop}></div>

        {/* ---------- Modal area ---------- */}
        <div className={style.modal.layer} onClick={hide}>
          <div 
            className={`
              ${style.modal.box} 
              ${className}
              ${isVisible ? 'animate-scale-up' : 'animate-scale-down'}
            `} 
            onClick={(e) => e.stopPropagation()} >
            <div className={style.modal.content}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Presence>
  );
}

const style = {
  wrapper: 'relative z-50',
  backdrop: 'fixed inset-0 bg-gray-700 bg-opacity-75',
  modal: {
    layer: 'fixed inset-0 z-10 overflow-y-auto flex items-center justify-center p-4 md:p-8',
    box: 'w-full sm:max-w-lg relative flex items-center bg-white justify-center rounded-lg shadow-xl p-4 md:p-6',
    content: 'text-left',
  },
};