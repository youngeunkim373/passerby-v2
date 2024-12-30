import toastStyle from '@/style/toast-ui.module.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Viewer, ViewerProps } from '@toast-ui/react-editor';
import { ForwardedRef } from 'react';

interface Props extends ViewerProps {
  forwardedRef: ForwardedRef<Viewer>;
}

export default function WrappedEditor({ forwardedRef, className, ...props }: Props) {
  return (
    <div className={`w-full ${toastStyle} ${className}`}>
      <Viewer 
        ref={forwardedRef}
        {...props} />
    </div>
  );
};