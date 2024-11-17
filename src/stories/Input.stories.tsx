import { Meta, StoryFn } from '@storybook/react';

import { Mail } from '@/assets/icons/Mail';
import { User } from '@/assets/icons/User';
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
  prefix: {
    string: 'Email',
    icon: <User />,
    none: null,
  },
  suffix: {
    string: '@gmail.com',
    icon: <Mail />,
    none: null,
  },
};

type PrefixType = keyof typeof options.prefix;
type SuffixType = keyof typeof options.suffix;

const Template: StoryFn<InputProps> = (args) => {
  const { prefix, readOnly, suffix, ...rest } = args;

  const prefixSet: React.ReactNode = options.prefix[prefix as PrefixType];
  const suffixSet: React.ReactNode = options.suffix[suffix as SuffixType];

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
  allowClear: true,
  disabled: false,
  placeholder: 'Enter a value',
  prefix: 'icon',
  readOnly: false,
  size: 'default',
  state: 'normal',
  suffix: 'string',
  width: 300,
};