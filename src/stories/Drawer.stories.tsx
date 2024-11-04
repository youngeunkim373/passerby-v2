import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/components/buttons/Button';
import { Drawer, Props } from '@/components/layout/Drawer';
import { useDrawerContext } from '@/contexts/DrawerContext';

export default {
  component: Drawer,
  title: 'Components/Layout/Drawer',
  argTypes: {
    children: { control: false },
    className: { control: false },
  }
} as Meta<typeof Drawer>;

const Template: StoryFn<Props> = (args) => {
  const { show, hide } = useDrawerContext();

  const handleOpenDrawer= () => {
    show(
      <Drawer {...args} className={'flex justify-center items-center ml-[-16px]'}>
        <Button 
          variant={'solid'} 
          color={'red'}
          size={'large'}
          onClick={hide}
          className={'mx-auto'}>
          Close
        </Button>
      </Drawer>
    );
  };

  return (
    <div className={'w-screen h-screen flex justify-center items-center bg-black ml-[-16px] mt-[-16px]'}>
      <Button 
        variant={'solid'} 
        color={'blue'}
        size={'large'}
        onClick={handleOpenDrawer}>
          Open
      </Button>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  direction: 'right',
};