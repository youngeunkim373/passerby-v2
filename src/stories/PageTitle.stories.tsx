import { Meta, StoryFn } from '@storybook/react';

import { PageTitle, Props as PageTitleProps } from '@/components/common/PageTitle';

export default {
  component: PageTitle,
  title: 'Components/Common/PageTitle',
} as Meta<typeof PageTitle>;

const Template: StoryFn<PageTitleProps> = (props) => {
  return <PageTitle {...props} />;
};

export const Default = Template.bind({});

Default.args = {
  title: 'Page title test',
  description: 'Page title description test',
};