import React from 'react';
import { ModalContextProvider } from '../src/contexts/ModalContext';

export function Global(Story) {
  return (
    <ModalContextProvider>
      <Story />
    </ModalContextProvider>
  )
};




