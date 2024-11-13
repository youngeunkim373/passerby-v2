import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

type InputSize = 'small' | 'default' | 'large';
export type InputState = 'normal' | 'error' | 'success';

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: InputSize; // input height size
  state?: InputState;
  prefix?: ReactNode | string; 
  suffix?: ReactNode | string;
  width?: number | string; 
}

export const Input = forwardRef<HTMLInputElement, Props>(({ 
  size, 
  state, 
  prefix, 
  suffix, 
  width,
  disabled = false, 
  type = 'text', 
  ...inputProps 
}, ref) => {
  const style = getStyle({ disabled, size, state });

  const optionWidth = typeof width === 'number' 
    ? `${width}px` 
    : (width ?? '100%');

  return (
    <div className={style.wrapper} style={{ width: optionWidth }}>
      <div className={style.fixCommon + style.prefix}>{prefix}</div>
      <input
        className={style.input}
        disabled={disabled}
        type={type}
        ref={ref}
        {...inputProps} />
      <div className={style.fixCommon + style.suffix}>{suffix}</div>
    </div>
  );
});

Input.displayName = 'Input';

const inputConfig = {
  size: {
    small: 'h-[32px] text-sm',
    default: 'h-[44px] text-base',
    large: 'h-[56px] text-lg',
  },
  state: {
    normal: 'ring-gray-300 focus-within:ring-main focus-within:ring-1',
    error: 'ring-red',
    success: 'ring-blue',
  }
};

const getStyle = ({ 
  disabled,
  state = 'normal', 
  size = 'default' 
}: Pick<Props, 'disabled'| 'state' | 'size'>) => ({
  wrapper: `
    flex
    items-center
    px-4
    ring-1
    ring-inset 
    rounded-md 
    w-full 
    focus-within:ring-[1.3px]
    ${disabled && 'bg-gray-100'}
    ${inputConfig.size[size]}
    ${inputConfig.state[state]}
  `,
  input: `
    bg-transparent
    text-gray-900 
    w-full 
    placeholder:text-gray-400 
    read-only:cursor-not-allowed
  `,
  fixCommon: `
    flex
    items-center
    max-h-20
    pointer-events-none   
    text-gray-500 
  `,
  prefix: 'mr-1.5',
  suffix: 'ml-1.5',
});