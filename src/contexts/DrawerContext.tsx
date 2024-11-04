'use client';
import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';

// @ts-ignore
const DrawerContext = createContext<ReturnType<typeof useDrawer>>(null);

const useDrawer = () => {
  const [ content, setContent ] = useState<ReactNode | null>(null);
  const [ isVisible, setVisible ] = useState(false);

  const show = (currentContent: ReactNode) => {
    setContent(currentContent);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return {
    content,
    isVisible,
    show,
    hide,
  };
};

export function useDrawerContext() {
  return useContext(DrawerContext);
}

export function DrawerContextProvider({ children }: PropsWithChildren) {
  const state = useDrawer();

  return (
    <DrawerContext.Provider value={state}>
      {children}
      {state.content}
    </DrawerContext.Provider>
  );
}  