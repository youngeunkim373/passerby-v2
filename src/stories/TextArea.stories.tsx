import { TextArea, Props as TextAreaProps } from '@/components/form/TextArea';
import { Meta, StoryFn } from '@storybook/react';

export default {
  component: TextArea,
  title: 'Components/Form/TextArea',
} as Meta<typeof TextArea>;

const Template: StoryFn<TextAreaProps> = (props) => {

  return (
    <div className={'flex h-screen justify-center items-center'}>
      <TextArea {...props} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  maxLength: 30,
  placeholder: 'Enter a value',
  readOnly: false,
  size: 'default',
  state: 'normal',
  width: '500px',
};