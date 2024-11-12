'use client';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/components/buttons/Button';
import { Modal, Props } from '@/components/layout/Modal';
import { ModalContextProvider, useModalContext } from '@/contexts/ModalContext';

export default {
  component: Modal,
  title: 'Components/Layout/Modal',
  argTypes: {
    children: { control: false },
    className: { control: false },
  }
} as Meta<typeof Modal>;

const Template: StoryFn<Omit<Props, 'content' | 'isVisible'>> = (args) => {
  const { show } = useModalContext();

  const handleOpenModal= () => {
    show(
      <Modal {...args}>
        Test1
      </Modal>
    );
  };

  return (
    <ModalContextProvider>
      <div className={'w-screen h-screen flex justify-center items-center bg-black ml-[-16px] mt-[-16px]'}>
        <Button 
          variant={'solid'} 
          color={'blue'}
          size={'large'}
          onClick={handleOpenModal}>
          Open
        </Button>
      </div>
    </ModalContextProvider>
  );
};

export const Default = Template.bind({});

Default.args = {
  closable: true,
};