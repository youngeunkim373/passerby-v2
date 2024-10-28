import { ReactNode } from 'react';
import type { Meta } from '@storybook/react';

import { Colors } from '../../tailwind.config';

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <span className={'text-gray-600 font-semibold text-xl'}>
      {children}
    </span>
  );
};

const RowFlexBox = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'flex flex-row justify-start items-center gap-8'}>
      {children}
    </div>
  );
};

type Circle = { color: Colors, className?: string };
const Circle = ({ color, className = '' }: Circle) => {
  return (
    <div className={`w-20 h-20 rounded-full bg-${color} flex items-center justify-center text-white text-center ${className}`}>
      {color}
    </div>
  );
};

type PaletteWell = Circle & { hex: string };
const PaletteWell = ({ hex, ...circleProps }: PaletteWell) => {
  return (
    <div className={'flex flex-col justify-center items-center gap-1'}>
      <Circle {...circleProps} /> 
      <span className={'text-gray-700 font-extralight'}>{hex}</span>
    </div>
  );
};

const meta: Meta<typeof Circle> = {
  title: 'StyleGuide/Colors',
  component: Circle,
};

export default meta;

export const Default = () => {
  return (
    <div className={'flex flex-col gap-8'}>
      <Title>White | Black</Title>
      <RowFlexBox>
        <PaletteWell 
          color={'white'}
          className={'border border-gray-300 text-black'} 
          hex={'#ffffff'} />
        <PaletteWell 
          color={'black'}
          hex={'#000000'} />
      </RowFlexBox>

      <Title>Gray scale</Title>
      <RowFlexBox>
        <PaletteWell 
          color={'gray-50'}
          className={'text-black'}
          hex={'#f8fafc'} />
        <PaletteWell 
          color={'gray-100'}
          className={'text-black'}
          hex={'#f1f5f9'} />
        <PaletteWell 
          color={'gray-200'}
          className={'text-black'}
          hex={'#e2e8f0'} />
        <PaletteWell 
          color={'gray-300'}
          className={'text-black'}
          hex={'#cbd5e1'} />
        <PaletteWell 
          color={'gray-400'}
          className={'text-black'}
          hex={'#94a3b8'} />
      </RowFlexBox>
      <RowFlexBox>
        <PaletteWell 
          color={'gray-500'}
          hex={'#64748b'} />
        <PaletteWell 
          color={'gray-600'}
          hex={'#475569'} />
        <PaletteWell 
          color={'gray-700'}
          hex={'#334155'} />
        <PaletteWell 
          color={'gray-800'}
          hex={'#1e293b'} />
        <PaletteWell 
          color={'gray-900'}
          hex={'#0f172a'} />
      </RowFlexBox>
      <RowFlexBox>
        <PaletteWell 
          color={'gray-950'}
          hex={'#020617'} />
      </RowFlexBox>

      <Title>Main color</Title>
      <RowFlexBox>
        <PaletteWell 
          color={'main-pale'}
          className={'text-black'}
          hex={'#ebe1ff'} />
        <PaletteWell 
          color={'main-light'}
          hex={'#c7abff'} />
        <PaletteWell 
          color={'main'}
          hex={'#7a37ff'} />
        <PaletteWell 
          color={'main-dark'}
          hex={'#6428dd'} />
      </RowFlexBox>

      <Title>Red</Title>
      <RowFlexBox>
        <PaletteWell 
          color={'red-pale'}
          className={'text-black'}
          hex={'#fff1f2'} />
        <PaletteWell 
          color={'red-light'}
          hex={'#fda4af'} />
        <PaletteWell 
          color={'red'}
          hex={'#f43f5e'} />
        <PaletteWell 
          color={'red-dark'}
          hex={'#e11d48'} />
      </RowFlexBox>

      <Title>Blue</Title>
      <RowFlexBox>
        <PaletteWell 
          color={'blue-pale'}
          className={'text-black'}
          hex={'#eff6ff'} />
        <PaletteWell 
          color={'blue-light'}
          hex={'#93c5fd'} />
        <PaletteWell 
          color={'blue'}
          hex={'#3b82f6'} />
        <PaletteWell 
          color={'blue-dark'}
          hex={'#2563eb'} />
      </RowFlexBox>

      <Title>Orange</Title>
      <RowFlexBox>
        <PaletteWell 
          color={'orange-pale'}
          className={'text-black'}
          hex={'#fff7ed'} />
        <PaletteWell 
          color={'orange-light'}
          hex={'#fed7aa'} />
        <PaletteWell 
          color={'orange'}
          hex={'#fb923c'} />
        <PaletteWell 
          color={'orange-dark'}
          hex={'#f97316'} />
      </RowFlexBox>
    </div>
  );
};