import { useState } from 'react';

export interface VisibleSet {
  isVisible: boolean;
  open: () => void;
  close: () => void;
}

const useVisible = (initialVisible?: boolean): VisibleSet => {
  const [ isVisible, setIsVisible ] = useState(initialVisible ?? false);

  const open = () => {
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };

  return { isVisible, open, close };
};

export default useVisible;
