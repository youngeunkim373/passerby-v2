import '@toast-ui/editor/dist/toastui-editor.css';
import toastStyle from '@/style/toast-ui.module.css';
import editorStyle from '@/style/toast-ui-editor.module.css';

import { Editor, EditorProps } from '@toast-ui/react-editor';
import { ForwardedRef } from 'react';

interface Props extends EditorProps {
  forwardedRef: ForwardedRef<Editor>;
}

export default function WrappedEditor({ forwardedRef, ...props }: Props) {
  return (
    <div className={`w-full ${toastStyle} ${editorStyle}`}>
      <Editor
        ref={forwardedRef}
        previewStyle={'tab'}
        initialEditType={'wysiwyg'}
        useCommandShortcut={true}
        hideModeSwitch={true}
        toolbarItems={[
          [ 'heading', 'bold', 'italic', 'strike' ],
          [ 'image', 'link' ],
          [ 'hr', 'quote' ],
        ]}
        {...props} />
    </div>
  );
};