import React from 'react';
import { DrawerContextProvider } from '../src/contexts/DrawerContext';
import { ModalContextProvider } from '../src/contexts/ModalContext';
import { NotificationContextProvider } from '../src/contexts/NotificationContext';

export function Global(Story) {
  return (
    <DrawerContextProvider>
      <ModalContextProvider>
        <NotificationContextProvider>
          <Story />
        </NotificationContextProvider>
      </ModalContextProvider>
    </DrawerContextProvider>
  )
};




