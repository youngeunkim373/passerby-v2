import { Meta, StoryFn } from '@storybook/react';
import Image from 'next/image';

import { Input, Props as InputProps } from '@/components/form/Input';

export default {
  component: Input,
  title: 'Components/Form/Input',
  argTypes: {
    prefix: {
      control: { type: 'radio' },
      options: [ 'string', 'icon', 'none' ],
    },
    suffix: {
      control: { type: 'radio' },
      options: [ 'string', 'icon', 'none' ],
    },
  },
} as Meta<typeof Input>;

const options = {
  fix: {
    'string': '$',
    'icon': (
      <Image 
        src={'/images/bubble-logo.svg'} 
        alt={'logo'} 
        width={24}
        height={21.2} />
    ),
    'none': null,
  }
};

type FixType = keyof typeof options.fix;

const Template: StoryFn<InputProps> = (args) => {
  const { prefix, readOnly, suffix, ...rest } = args;

  const prefixSet: React.ReactNode = options.fix[prefix as FixType];
  const suffixSet: React.ReactNode = options.fix[suffix as FixType];

  return (
    <div className={'flex h-screen justify-center items-center'}>
      <Input 
        prefix={prefixSet} 
        readOnly={readOnly}
        suffix={suffixSet} 
        {...rest} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  prefix: 'icon',
  readOnly: false,
  size: 'default',
  width: 300,
  state: 'normal',
  suffix: '@gmail.com',
};