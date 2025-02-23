import { EditorProps, Editor as ToastEditor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState, } from 'react';

import { GetPostResponseDTO } from '@/app/board/board.interface';
import { SpinLoading } from '@/assets/icons/Loading';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useModalContext } from '@/contexts/ModalContext';
import { uploadImage } from '@/utils/image';

/* -------------------- ForwardedEditor -------------------- */
const WrappedEditor = dynamic(
  () => import('./WrappedEditor'), 
  { 
    ssr: false, 
    loading: () => (
      <div className={'w-full h-[300px] flex flex-col justify-center items-center gap-2'}>
        <SpinLoading className={'!size-12'} />
        <span className={'font-semibold text-gray-500'}>Loading..</span>
      </div>
    ), 
  },
);

const ForwardedEditor = forwardRef((
  props: EditorProps, 
  forwardedRef: ForwardedRef<ToastEditor>,
) => {
  return <WrappedEditor {...props} forwardedRef={forwardedRef} />;
});

ForwardedEditor.displayName = 'ForwardedEditor';

/* -------------------- Editor -------------------- */
type StorageDirectory = 'static' | 'board';

interface Props extends EditorProps {
  storageDirectory: StorageDirectory;
  content?: GetPostResponseDTO['content'] | null;
  onChange: (value: string) => void;
}

export const Editor = ({ storageDirectory, content, onChange, ...props }: Props) => {
  const editorRef = useRef<ToastEditor>(null);
  const [ isImageUploading, setImageUploading ] = useState(false);

  const { show } = useModalContext();

  const handleChange = useCallback(() => {
    if(!editorRef.current) return;
    const instance = editorRef.current.getInstance();
    onChange(instance.getHTML());
  }, [ onChange ]);

  const handleUploadImage = useCallback(async (
    blob: File, 
    callback?: (downloadUrl: string) => void,
  ): Promise<void> => {
    if(!editorRef.current) return;

    if(!storageDirectory) {
      return show(<ErrorModal message={'이미지가 저장될 경로가 필요합니다.'} />);
    }

    setImageUploading(true);

    try {
      const imageUrl = await uploadImage(blob, storageDirectory);
      if(callback) callback(imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
      show(<ErrorModal message={'이미지 업로드 중 문제가 발생하였습니다.'} />);
    } finally {
      setImageUploading(false);
    }
  }, [ show, storageDirectory ]);

  // 게시글 수정 시에는 기존에 작성한 내용이 들어오도록 함
  useEffect(() => {
    if(!editorRef.current || !content) return;
    editorRef.current.getInstance().setHTML(content);
  }, [ content ]);

  return (
    <div className={style.wrapper}>
      <ForwardedEditor
        ref={editorRef}
        onChange={handleChange}
        hooks={{ addImageBlobHook: handleUploadImage }}
        height={'auto'}
        {...props} />
      
      {isImageUploading && (
        <div className={style.upload}>이미지 업로드 중...</div>
      )}
    </div>
  );
};

const style = {
  wrapper: 'w-full relative',
  upload: `
    absolute top-[calc(50%+22.5px)] z-40
    left-1/2 -translate-x-1/2 -translate-y-1/2 
    text-gray-400
  `,
};