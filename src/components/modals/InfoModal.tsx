import { ReactNode } from 'react';

import { InfoSolid } from '@/assets/icons/Info';
import { Button } from '@/components/buttons/Button';
import { Modal, Props as ModalProps } from '@/components/layout/Modal';
import { useModalContext } from '@/contexts/ModalContext';

export interface Props extends Omit<ModalProps, 'closable'> {
  button?: string;
  title: string | ReactNode;
  message: string | ReactNode;
}

export function InfoModal({ button, title, message, ...modalProps }: Props) {
  const { hide } = useModalContext();

  const handleConfirm = () => {
    if(modalProps.onConfirm) modalProps.onConfirm();
    hide();
  };

  return (
    <Modal {...modalProps} closable={false} onConfirm={handleConfirm}>
      <div className={style.wrapper}>
        <InfoSolid className={style.image} />

        <span className={style.title}>
          {title}
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
  image: '!size-16 text-blue mx-auto',
  title: 'text-xl font-bold text-black',
  description: 'text-center text-sm text-gray-600',
  confirmButton: 'w-full mt-2',
};