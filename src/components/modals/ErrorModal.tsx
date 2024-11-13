import { ReactNode } from 'react';

import { CloseSolid } from '@/assets/icons/Close';
import { Button } from '@/components/buttons/Button';
import { Modal, Props as ModalProps } from '@/components/layout/Modal';
import { useModalContext } from '@/contexts/ModalContext';

interface Props extends Omit<ModalProps, 'closable'> {
  button?: string;
  message?: string | ReactNode;
  statusCode?: number;
}

export function ErrorModal({ button, message, statusCode, ...modalProps }: Props) {
  const { hide } = useModalContext();

  const handleConfirm = () => {
    modalProps.onConfirm && modalProps.onConfirm();
    hide();
  };

  return (
    <Modal {...modalProps} closable={false} onConfirm={handleConfirm}>
      <div className={style.wrapper}>
        <CloseSolid className={style.image} />

        <span className={style.title}>
          Error {statusCode}
        </span>
          
        <div className={style.description}>
          {message ?? (
            <>
              <p>오류가 발생했습니다.</p>
              <p>잠시 후에 다시 시도해주세요.</p>
            </>
          )}
        </div>

        <Button 
          className={style.confirmButton}
          color={'red'}
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
  image: 'size-20 text-red mx-auto',
  title: 'text-2xl font-bold text-red',
  description: 'text-center text-sm text-gray-600',
  confirmButton: 'w-full mt-2',
};