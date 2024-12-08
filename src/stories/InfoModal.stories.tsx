'use client';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/components/buttons/Button';
import { InfoModal, Props } from '@/components/modals/InfoModal';
import { ModalContextProvider, useModalContext } from '@/contexts/ModalContext';

export default {
  component: InfoModal,
  title: 'Components/Modals/InfoModal',
  argTypes: {
    children: { control: false },
    className: { control: false },
  }
} as Meta<typeof InfoModal>;

const Template: StoryFn<Omit<Props, 'content' | 'isVisible'>> = (args) => {
  const { show } = useModalContext();

  const handleOpenModal= () => {
    show(
      <InfoModal {...args} />
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
  button: 'Confirm',
  duration: 5000,
  message: 'This is really helpful information you need.',
};