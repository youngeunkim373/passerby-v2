'use client';
import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';

// @ts-ignore
const ModalContext = createContext<ReturnType<typeof useModal>>(null);

const useModal = () => {
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

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalContextProvider({ children }: PropsWithChildren) {
  const state = useModal();

  return (
    <ModalContext.Provider value={state}>
      {children}
      {state.content}
    </ModalContext.Provider>
  );
} 