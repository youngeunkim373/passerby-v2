import React from 'react';
import { DrawerContextProvider } from '../src/contexts/DrawerContext';
import { ModalContextProvider } from '../src/contexts/ModalContext';

export function Global(Story) {
  return (
    <DrawerContextProvider>
      <ModalContextProvider>
        <Story />
      </ModalContextProvider>
    </DrawerContextProvider>
  )
};




