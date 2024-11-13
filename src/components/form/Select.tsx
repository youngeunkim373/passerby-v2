'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { Close } from '@/assets/icons/Close';
import { Presence } from '@/components/common/Presence';

/* -------------------- Select --------------------- */ 
// common
type SelectSize = 'small' | 'default' | 'large';
type WidthType = string | number;

interface CommonProps {
  width?: WidthType;
  size?: SelectSize;
  placeholder?: string;
  allowClear?: boolean;
} 

// select
export type SelectState = 'normal' | 'error' | 'success';

export interface Props extends CommonProps {
  options: OptionProps[];
  initialOptionId?: OptionProps['id'];
  state?: SelectState;
  value?: string;
  onChange?: (value: OptionProps['id']) => void;
}

export function Select({ 
  options: externalOptions, 
  initialOptionId, 
  width = '100%', 
  size = 'default', 
  state = 'normal',
  value,
  placeholder = '',
  allowClear,
  onChange,
}: Props) {
  
  const options = [
    { id: null, title: placeholder },
    ...externalOptions,
  ];

  const initialOption = options
    .find((option) => option.id === initialOptionId)
    ?? options[0];

  if (process.env.NODE_ENV === 'development') {
    // 옵션 id 중복 체크
    const idSet = new Set<string>();
  
    const duplicates = options.filter((item) => {
      if(item.id) {
        if (idSet.has(item.id)) return true;
        idSet.add(item.id);
      }

      return false;
    });
    
    if (duplicates.length > 0) {
      throw new Error(`옵션에 중복된 id가 존재합니다: ${duplicates.map((item) => item.id).join(', ')}`);
    }

    // initialOptionId 체크
    if (!initialOption) {
      throw new Error(`선택지에 없는 id는 초기값으로 설정할 수 없습니다: ${initialOptionId}`);
    }
  }

  const selectRef = useRef<HTMLDivElement>(null);

  const [ selectedOption, setSelectedOption ] = useState<OptionProps>(initialOption);
  const [ isDropdownOpen, setDropdownOpen ] = useState(false);
  const [ dropdownPosition, setDropdownPosition ] = useState<'top' | 'bottom'>('bottom');

  const optionWidth = typeof width === 'number' 
    ? `${width}px` 
    : width;

  const handleClickOption = (option: OptionProps) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    if(onChange) onChange(option.id);
  };

  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleClickOption(options[0]);
    if(onChange) onChange(options[0].id);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const selectedOption = options.find((option) => option.id === value);
    
    if(selectedOption) {
      setSelectedOption(selectedOption);
    }
  }, [ value ]);

  useEffect(() => {
    const handleResize = () => {
      if (selectRef.current) {
        const selectRect = selectRef.current.getBoundingClientRect();
        const dropdownHeight = (selectRect.height * options.length);
        const spaceBelow = window.innerHeight - selectRect.bottom;

        // select 아래에 dropdown보다 큰 공간이 있으면 아래로 내림
        setDropdownPosition(spaceBelow > dropdownHeight ? 'bottom' : 'top');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ isDropdownOpen ]);

  return (
    <div ref={selectRef} className={style.wrapper}>
      {/* ---------- Select area ----------- */}
      <div
        className={`
          ${style.select}    
          ${selectConfig.state[state]}
        `} 
        style={{ width: optionWidth }}
        onClick={() => setDropdownOpen((prev) => !prev)}>
        <Option
          width={width}
          size={size}
          placeholder={placeholder}
          allowClear={allowClear}
          className={`
            ${style.selectedOption}
            ${selectedOption.id === null ? 'text-gray-400' : 'text-gray-900'}
          `}
          onClear={handleClear}
          {...selectedOption} />
      </div>

      {/* ---------- Dropdown area ----------- */}
      <Presence present={isDropdownOpen}>
        <div
          className={`
            ${style.dropdown}
            ${isDropdownOpen ? 'animate-fade-in' : 'animate-fade-out'}
            ${dropdownPosition === 'bottom' ? 'top-full mt-[1px]' : 'bottom-full mb-[1px]'}
          `}
          style={{ width: optionWidth }}>
          {externalOptions.map((option) => (
            <Option 
              key={option.id}
              width={width}
              size={size}
              onClick={() => handleClickOption(option)} 
              className={`
              ${dropdownPosition === 'bottom' 
              ? (isDropdownOpen ? 'animate-move-up-from-bottom' : 'animate-move-down-to-bottom')
              : (isDropdownOpen ? 'animate-move-down-from-top' : 'animate-move-up-to-top')}
              `}
              {...option} />
          ))}
        </div>
      </Presence>
    </div>
  );
}

const selectConfig = {
  state: {
    normal: 'outline-gray-300',
    error: 'outline-red',
    success: 'outline-blue',
  }
};

const style = {
  wrapper: 'relative',
  select: 'bg-white outline outline-1 rounded-lg',
  dropdown: 'absolute flex flex-col z-10 py-1.5 bg-white divide-y divide-gray-100 rounded-lg shadow mt-[1px] z-50',
  selectedOption: 'rounded-lg',
};

/* -------------------- Option --------------------- */ 
interface OptionProps extends CommonProps {
  id: string | null;
  title: string;
  prefix?: ReactNode;
  className?: string;
  onClick?: () => void;
  onClear?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Option({ 
  id, 
  title, 
  prefix, 
  width, 
  size = 'default', 
  placeholder,
  allowClear,
  className = '', 
  onClick,
  onClear,
}: OptionProps) {
  const style = getOptionStyle({ size });

  return (
    <button 
      data-value={id} 
      type={'button'} 
      onClick={onClick}
      style={{ width }}>
      <div className={`${style.wrapper} ${className}`}>
        {prefix && <div className={style.prefix}>{prefix}</div>}
        <span className={style.text}>{title ?? placeholder}</span>
        {(allowClear && onClear) && (
          <div className={style.clear.wrapper} onClick={onClear}>
            <Close className={style.clear.close} />
          </div>
        )}
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

const getOptionStyle = ({ size }: { size: SelectSize }) => ({
  wrapper: `
    relative
    flex justify-start items-center
    ${optionConfig.size[size]} px-4
    hover:bg-gray-100
  `,
  prefix: 'max-w-[16px] max-h-[16px] mr-1.5',
  text: 'truncate',
  clear: {
    wrapper: 'absolute right-[12px] p-1',
    close: 'size-3 text-gray-400 hover:text-gray-500',
  },
}) as const;