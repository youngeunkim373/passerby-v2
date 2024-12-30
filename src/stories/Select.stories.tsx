import { Meta, StoryFn } from '@storybook/react';

import { Select, Props as SelectProps } from '@/components/form/select/Select';
import { options } from '@/stories/constants';

export default {
  component: Select,
  title: 'Components/Form/Select',
  argTypes: {
    options: { control: false },
    initialOptionId: { control: false },
    onChange: { control: false },
    mode: {
      control: { type: 'radio' },
      options: [ 'single', 'multiple' ],
    },
  },
} as Meta<typeof Select>;

const Template: StoryFn<SelectProps> = (args) => {
  return (
    <div className={'w-screen h-screen flex flex-col justify-between items-center ml-[-16px] mt-[-16px]'}>
      <div className={'pt-8'}>
        <Select {...args} options={options} />
        <p>{'브라우저에 하단에 남은 공간 > Dropdown의 높이'}</p>
        <p>Dropdown이 아래로 펼쳐짐</p>
      </div>

      <div className={'pb-8'}>
        <Select {...args} options={options} />
        <p>{'브라우저에 하단에 남은 공간 <= Dropdown의 높이'}</p>
        <p>Dropdown이 위로 펼쳐짐</p>
      </div>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  allowClear: true,
  mode: 'single',
  placeholder: '국가를 선택해주세요',
  size: 'default',
  state: 'normal',
  width: '240px',
};