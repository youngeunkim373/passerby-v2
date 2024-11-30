import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor, EditorProps } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { ForwardedRef, forwardRef, useCallback, useRef, } from 'react';

/* -------------------- ForwardedEditor -------------------- */
const WrappedEditor = dynamic(() => import('./WrappedEditor'), { ssr: false });

const ForwardedEditor = forwardRef((
  props: EditorProps, 
  forwardedRef: ForwardedRef<ToastEditor>,
) => {
  return <WrappedEditor {...props} forwardedRef={forwardedRef} />;
});

ForwardedEditor.displayName = 'ForwardedEditor';

/* -------------------- Editor -------------------- */
interface Props extends EditorProps {
  onChange: (value: string) => void;
}

export const Editor = ({ onChange, ...props }: Props) => {
  const ref = useRef<ToastEditor>(null);

  const handleChange = useCallback(() => {
    if (!ref.current) return;
    const instance = ref.current.getInstance();
    onChange(instance.getHTML());
  }, [ onChange ]);

  return (
    <ForwardedEditor
      ref={ref}
      onChange={handleChange}
      {...props} />
  );
};