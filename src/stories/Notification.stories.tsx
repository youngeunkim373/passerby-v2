'use client';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/components/buttons/Button';
import { Notification, Props } from '@/components/common/Notification';
import { NotificationContextProvider, useNotificationContext } from '@/contexts/NotificationContext';

export default {
  component: Notification,
  title: 'Components/Common/Notification',
  argTypes: {
    id: { control: false },
    className: { control: false },
    icon: { control: { type: 'boolean' } },
  },
} as Meta<typeof Notification>;

const Template: StoryFn<Props> = ({ icon, ...restArgs }) => {
  const { show } = useNotificationContext();

  const externalIcon = (restArgs.showIcon && icon) ? '🤍' : undefined;

  const handleOpenModal = () => {
    show(<Notification icon={externalIcon} {...restArgs} />);
  };

  return (
    <NotificationContextProvider>
      <div className={'w-screen h-screen flex justify-start items-end ml-[-16px] mt-[-16px]'}>
        <Button 
          variant={'solid'} 
          color={'blue'}
          size={'large'}
          className={'ml-8 mb-8'}
          onClick={handleOpenModal}>
          Open
        </Button>
      </div>
    </NotificationContextProvider>
  );
};

export const Default = Template.bind({});

Default.args = {
  closalble: true,
  content: 'This is Notification UI Test.',
  duration: 3000,
  title: 'This is Notification',
  type: 'info',
  showIcon: true,
  icon: false,
};