import { Viewer as ToastViewer, ViewerProps } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { ForwardedRef, forwardRef, useRef } from 'react';

/* -------------------- ForwardedViewer -------------------- */
const WrappedViewewr = dynamic(() => import('./WrappedViewer'), { ssr: false });

const ForwardedViewer = forwardRef((
  props: ViewerProps, 
  forwardedRef: ForwardedRef<ToastViewer>,
) => {
  return <WrappedViewewr {...props} forwardedRef={forwardedRef} />;
});

ForwardedViewer.displayName = 'ForwardedViewer';

/* -------------------- Viewer -------------------- */
export const Viewer = (props: ViewerProps) => {
  const ref = useRef<ToastViewer>(null);
  return <ForwardedViewer ref={ref} {...props} />;
};