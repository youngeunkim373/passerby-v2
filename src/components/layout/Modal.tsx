'use client';
import {  PropsWithChildren, useState } from 'react';

import { VisibleSet } from '@/hooks/useVisible';

export interface Props extends Pick<VisibleSet, 'close'>, PropsWithChildren {
  className?: string;
}

export function Modal({ children, className = '', close }: Props) {
  const [ isVisible, setVisible ] = useState(true);

  // 모달이 닫힐 때 애니메이션 적용을 위해 timeout 설정
  const handleClose = () => {
    setVisible(false);
    setTimeout(close, 500);
  };

  return (
    <div className={style.wrapper}>
      {/* ---------- Backdrop area ---------- */}
      <div
        className={`
        ${style.backdrop} 
        ${isVisible ? 'animate-fadeIn' : 'animate-fadeOut'}
      `}></div>

      {/* ---------- Modal area ---------- */}
      <div className={style.modal.layer} onClick={handleClose}>
        <div 
          className={`
            ${style.modal.box} ${className}
            ${isVisible ? 'animate-scaleUp' : 'animate-scaleDown'}
          `} 
          onClick={(e) => e.stopPropagation()} >
          <div className={style.modal.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const style = {
  wrapper: 'relative z-50',
  backdrop: 'fixed inset-0 bg-gray-700 bg-opacity-75 transition-all',
  modal: {
    layer: 'fixed inset-0 z-10 overflow-y-auto flex items-center justify-center p-4 md:p-8',
    box: 'w-full sm:max-w-lg relative flex items-center bg-white justify-center rounded-lg shadow-xl p-4 md:p-6',
    content: 'text-left',
  },
};