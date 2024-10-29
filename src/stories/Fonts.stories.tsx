import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'StyleGuide/Fonts',
};

export default meta;

export const Default = () => {
  return (
    <div className={'flex flex-col gap-8'}>
      
      <span style={{ fontFamily: 'NanumGothic', fontWeight: 300 }}>NanumGothic light</span>
      <span style={{ fontFamily: 'NanumGothic', fontWeight: 400 }}>NanumGothic normal</span>
      <span style={{ fontFamily: 'NanumGothic', fontWeight: 700 }}>NanumGothic bold</span>
      <span style={{ fontFamily: 'NanumGothic', fontWeight: 900 }}>NanumGothic extra bold</span>
    </div>
  );
};