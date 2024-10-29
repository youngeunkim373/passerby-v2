import { Meta, StoryFn } from '@storybook/react';

import { Button, Props as ButtonProps } from '@/components/Button';

export default {
  component: Button,
  title: 'Components/General/Button',
  argTypes: {
    className: { control: false }
  }
} as Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

export const Default = Template.bind({});

Default.args = {
  color: 'main',
  size: 'default',
  variant: 'outlined',
  children: 'Button',
};