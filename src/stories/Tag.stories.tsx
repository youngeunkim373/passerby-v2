import { Meta, StoryFn } from '@storybook/react';

import { Tag, Props as TagProps } from '@/components/common/Tag';

export default {
  component: Tag,
  title: 'Components/Common/Tag',
} as Meta<typeof Tag>;

const Template: StoryFn<TagProps> = ({ children, ...rest }) => {
  return <Tag {...rest}>{children}</Tag>;
};

export const Default = Template.bind({});

Default.args = {
  children: 'tag tester',
  color: 'main',
};