import { ReactNode } from 'react';

import { CheckSolid } from '@/assets/icons/Chevron';
import { Button } from '@/components/buttons/Button';
import { Modal, Props as ModalProps } from '@/components/layout/Modal';
import { useModalContext } from '@/contexts/ModalContext';

export interface Props extends Omit<ModalProps, 'closable'> {
  button?: string;
  message: string | ReactNode;
}

export function SuccessModal({ button, message, ...modalProps }: Props) {
  const { hide } = useModalContext();

  const handleConfirm = () => {
    modalProps.onConfirm && modalProps.onConfirm();
    hide();
  };

  return (
    <Modal {...modalProps} closable={false} onConfirm={handleConfirm}>
      <div className={style.wrapper}>
        <CheckSolid className={style.image} />

        <span className={style.title}>
          Success
        </span>

        <div className={style.description}>
          
          {message}
        </div>

        <Button 
          className={style.confirmButton}
          color={'blue'}
          variant={'solid'} 
          onClick={handleConfirm}>
          {button ?? '확인'}
        </Button>
      </div>
    </Modal>
  );
}

const style = {
  wrapper: 'flex flex-col items-center gap-4',
  image: 'size-20 text-blue mx-auto',
  title: 'text-2xl font-bold text-blue',
  description: 'text-center text-sm text-gray-600',
  confirmButton: 'w-full mt-2',
};