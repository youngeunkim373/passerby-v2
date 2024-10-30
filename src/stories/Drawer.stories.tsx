import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/components/buttons/Button';
import { Drawer, Props as DrawerProps } from '@/components/layout/Drawer';
import useVisible from '@/hooks/useVisible';

export default {
  component: Drawer,
  title: 'Components/Layout/Drawer',
  argTypes: {
    className: { control: false },
    content: { control: false },
    isVisible: { control: false },
  }
} as Meta<typeof Drawer>;

const Template: StoryFn<Omit<DrawerProps, 'content' | 'isVisible'>> = ({ direction }) => {
  const { isVisible, open, close } = useVisible();

  return (
    <div className={'w-screen h-screen flex justify-center items-center bg-black ml-[-16px] mt-[-16px]'}>
      <Button 
        variant={'solid'} 
        color={'blue'}
        size={'large'}
        onClick={open}>
        Show
      </Button>

      <Drawer 
        id={'storybook'}
        direction={direction}
        isVisible={isVisible}>
        <div className={'w-screen h-screen flex justify-center items-center'}>
          <Button 
            variant={'solid'}
            color={'red'}
            size={'large'}
            onClick={close}
            className={'mx-auto'}>
            Hide
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  direction: 'right',
};