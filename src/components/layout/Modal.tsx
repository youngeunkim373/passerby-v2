import { PropsWithChildren } from 'react';

import { Close } from '@/assets/icons/Close';
import { Presence } from '@/components/common/Presence';
import { useModalContext } from '@/contexts/ModalContext';

export interface Props extends PropsWithChildren {
  className?: string;
  closable?: boolean;
}

export function Modal({ children, className = '', closable = true }: Props) {
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
            onClick={(e) => e.stopPropagation()}>
            {closable && (
              <Close 
                onClick={hide}
                className={style.modal.close} />
            )}
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
    box: `
      relative 
      flex justify-center items-center
      w-auto min-w-[300px] min-h-[160px]
      bg-white rounded-lg shadow-xl 
      p-4
    `,
    content: 'text-left',
    close: 'size-5 p-1 absolute top-4 right-4 text-gray-400 cursor-pointer',
  },
};