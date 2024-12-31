import { mergeRefs } from '@/utils/common';
import { ChangeEvent, forwardRef, TextareaHTMLAttributes, useRef, useState } from 'react';

type TextareaSize = 'small' | 'default' | 'large';
export type TextareaState = 'normal' | 'error' | 'success';

export interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'defaultValue' | 'maxLength'> {
  defaultValue?: string;
  maxLength?: number;
  size?: TextareaSize;
  state?: TextareaState;
  width?: string; 
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(({ 
  defaultValue,
  disabled = false,
  maxLength,
  size = 'default',
  state = 'normal',
  width,
  ...textareaProps
}, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [ value, setValue ] = useState(defaultValue ?? '');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if(textareaProps.onChange) textareaProps.onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // 커서 위치를 기준으로 \n 추가
        const newValue = value.substring(0, start) + '\n' + value.substring(end);
        setValue(newValue);

        setTimeout(() => {
          // 커서 위치를 줄바꿈 위치로 변경
          textarea.value = newValue;
          textarea.selectionStart = textarea.selectionEnd = start + 1;
  
          // textarea 높이 변경
          textarea.style.height = textarea.scrollHeight + 'px';
        }, 0);
      }
    }
  };

  return (
    <div 
      className={`
        ${style.wrapper}
        ${disabled ? 'bg-gray-100' : ''}
        ${size ? textareaConfig.size[size] : ''}
        ${state ? textareaConfig.state[state] : ''}
      `} 
      style={{ width }}>
      <textarea
        className={style.textarea}
        disabled={disabled}
        maxLength={maxLength}
        ref={mergeRefs(textareaRef, ref)}
        {...textareaProps}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown} />

      {maxLength && (
        <div className={style.max}>
          {value.toString().length}/{maxLength}
        </div>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

const textareaConfig = {
  size: {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  },
  state: {
    normal: 'ring-gray-300 focus-within:ring-main focus-within:ring-1',
    error: 'ring-red',
    success: 'ring-blue',
  },
};

const style = {
  wrapper: `
    w-full 
    relative
    flex flex-col items-end
    bg-white ring-1 ring-inset rounded-md 
    p-4
    focus-within:ring-[1.3px]
  `,
  textarea: `
    w-full 
    bg-transparent
    text-gray-900
    outline-none
    whitespace-pre-wrap break-words
    placeholder:text-gray-400 
    read-only:cursor-not-allowed
  `,
  max: 'text-gray-600 text-sm pt-2',
};