import { Viewer as ToastViewer, ViewerProps } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';

import { SpinLoading } from '@/assets/icons/Loading';

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
  const viewerRef = useRef<ToastViewer>(null);

  const [ isLoading, setIsLoading ] = useState(true);

  const extractImageElements = (element: HTMLElement): HTMLImageElement[] => {
    const images = element.querySelectorAll('img');
    return Array.from(images);
  };

  const handleLoad = () => {
    if(!viewerRef.current) return;

    const viewerElement = viewerRef.current.getRootElement();
    const images = extractImageElements(viewerElement);

    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    const imageLoadStates = Array.from(images).map((img) => {
      return new Promise<void>((resolve) => {

        if (img.complete) {
          resolve();
        } else {
          img.addEventListener('load', () => resolve());
          img.addEventListener('error', () => resolve());
        }
      });
    });

    Promise.all(imageLoadStates)
      .then(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && (
        <div className={'w-full h-[300px] flex flex-col justify-center items-center gap-2'}>
          <SpinLoading className={'!size-12'} />
          <span className={'font-semibold text-gray-500'}>Loading..</span>
        </div>
      )}

      <ForwardedViewer 
        ref={viewerRef} 
        className={isLoading ? 'invisible' : 'visible'}
        onLoad={handleLoad}
        {...props} />
    </>

  );
};