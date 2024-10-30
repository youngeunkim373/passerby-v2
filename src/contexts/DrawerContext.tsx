'use client';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

import useVisible from '@/hooks/useVisible';

// @ts-ignore
const DrawerContext = createContext<ReturnType<typeof useDrawer>>(null);

export type DrawerIds = 'menu';

type DrawerOpenStatus = Record<DrawerIds, boolean>;

const useDrawer = () => {
  const { isVisible, open, close } = useVisible();

  const [ currentDrawerId, setCurrentDrawerId ] = useState<DrawerIds | null>(null);

  const drawerOpenStatus: DrawerOpenStatus = {
    menu: isVisible && currentDrawerId === 'menu',
  };

  const show = async (drawerId: DrawerIds) => {
    setCurrentDrawerId(drawerId);

    // 다른 드로어가 열려있으면 그거 먼저 닫고 현재 드로어를 엶
    if(currentDrawerId && currentDrawerId !== drawerId) {
      close();
      return setTimeout(open, 500);
    }

    open();
  };

  const hide = () => {
    setCurrentDrawerId(null);
    close();
  };

  return {
    isVisible,
    currentDrawerId,
    drawerOpenStatus,
    show,
    hide,
  };
};

export function useDrawerContext() {
  return useContext(DrawerContext);
}

export function DrawerContextProvider({ children }: PropsWithChildren) {
  const state = useDrawer();
  return <DrawerContext.Provider value={state}>{children}</DrawerContext.Provider>;
} 