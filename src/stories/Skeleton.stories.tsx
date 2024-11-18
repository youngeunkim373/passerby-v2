import type { Meta } from '@storybook/react';

import { CardSkeleton } from '@/components/skeletons/CardSkeleton';

const meta: Meta<typeof CardSkeleton> = {
  title: 'Components/Skeletons/CardSkeleton',
  component: CardSkeleton,
  argTypes: {
    width: { control: false },
    height: { control: false },
    className: { control: false },
  }
};

export default meta;

export const Default = () => {
  return (
    <div className={'w-screen h-screen flex justify-center items-center bg-black ml-[-16px] mt-[-16px]'}>
      <CardSkeleton />
    </div>
  );
};