import { ReactNode } from 'react';

import { Check } from '@/assets/icons/Chevron';
import { SelectSize } from '@/components/form/select/Select';

export interface Props {
  id: string;
  title: string;
  isSelected?: boolean;
  className?: string;
  prefix?: ReactNode;
  size?: SelectSize;
  suffix?: ReactNode;
  onClick?: () => void;
}

export function Option({ 
  id, 
  isSelected = false,
  title, 
  className = '', 
  prefix, 
  size = 'default', 
  suffix,
  onClick,
}: Props) {
  return (
    <button 
      data-value={id} 
      type={'button'} 
      onClick={onClick}>
      <div 
        className={`
          ${style.wrapper} 
          ${optionConfig.size[size]}
          ${className}
        `}>
        {prefix && (
          <div 
            className={`${style.fix.common} ${style.fix.prefix}`}>
            {prefix}
          </div>
        )}

        <span className={style.text}>{title}</span>

        {suffix && (
          <div 
            className={`${style.fix.common} ${style.fix.suffix}`}>
            {suffix}
          </div>
        )}

        {isSelected && <Check />}
      </div>
    </button>
  );
}

const optionConfig = {
  size: {
    small: 'h-[32px] text-sm',
    default: 'h-[44px] text-base',
    large: 'h-[56px] text-lg',
  },
};

const style = {
  wrapper: `
    relative
    flex justify-start items-center
    px-4
    hover:bg-gray-100 rounded-md
  `,
  fix: {
    common: 'max-w-[16px] max-h-[16px]',
    prefix: 'mr-2',
    suffix: 'ml-2 bg-main-pale',
  },
  text: 'w-full text-start truncate',
};