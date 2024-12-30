import { Close } from '@/assets/icons/Close';
import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';

type InputSize = 'small' | 'default' | 'large' | 'extraLarge';
export type InputState = 'normal' | 'error' | 'success';

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'| 'size'> {
  allowClear?: boolean;
  prefix?: ReactNode | string; 
  size?: InputSize; // input height size
  state?: InputState;
  suffix?: ReactNode | string;
  width?: number | string; 
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ 
  allowClear = true,
  defaultValue,
  disabled = false, 
  prefix, 
  size = 'default', 
  state = 'normal', 
  suffix, 
  type = 'text', 
  value: externalValue,
  width,
  onClear,
  ...inputProps
}, ref) => {
  const [ value, setValue ] = useState(externalValue ?? defaultValue ?? '');

  const optionWidth = typeof width === 'number' 
    ? `${width}px` 
    : (width ?? '100%');

  const handleClear = () => {
    setValue('');
    if(onClear) onClear();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if(inputProps.onChange) inputProps.onChange(e);
  };

  useEffect(() => {
    if (!externalValue) return;
    setValue(externalValue);
  }, [ externalValue ]);

  return (
    <div 
      className={`
        ${style.wrapper}
        ${disabled ? 'bg-gray-100' : ''}
        ${size ? inputConfig.size[size] : ''}
        ${state ? inputConfig.state[state] : ''}
      `} 
      style={{ width: optionWidth }}>
      {prefix && (
        <div className={`${style.fixCommon} ${style.prefix}`}>
          {prefix}
        </div>
      )}

      <input
        className={style.input}
        disabled={disabled}
        type={type}
        ref={ref}
        {...inputProps}
        value={value}
        onChange={handleChange} />

      <div className={style.backSide.wrapper}>
        {suffix && (
          <div className={`${style.fixCommon} ${style.backSide.suffix}`}>
            {suffix}
          </div>
        )}

        {allowClear && (
          <div 
            className={style.backSide.clear.wrapper} 
            onClick={handleClear}>
            <Close className={style.backSide.clear.close} />
          </div>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

const inputConfig = {
  size: {
    small: 'h-[32px] text-sm',
    default: 'h-[44px] text-base',
    large: 'h-[56px] text-lg',
    extraLarge: 'h-[64px] text-xl',
  },
  state: {
    normal: 'ring-gray-300 focus-within:ring-main focus-within:ring-1',
    error: 'ring-red',
    success: 'ring-blue',
  }
};

const style = {
  wrapper: `
    w-full 
    relative
    flex items-center
    bg-white
    ring-1 ring-inset rounded-md 
    px-4
    focus-within:ring-[1.3px]
  `,
  input: `
    bg-transparent
    text-gray-900 truncate
    w-full 
    font-light placeholder:text-gray-400
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
  backSide: {
    wrapper: 'flex gap-2 pl-1',
    suffix: 'ml-1.5',
    clear: {
      wrapper: 'relative left-[4px] p-1 my-auto cursor-pointer',
      close: 'size-3 text-gray-400 hover:text-gray-500',
    },
  },
};