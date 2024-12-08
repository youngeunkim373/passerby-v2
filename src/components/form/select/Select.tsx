'use client';
import { useEffect, useRef, useState } from 'react';

import { Close } from '@/assets/icons/Close';
import { Tag } from '@/components/common/Tag';
import { Dropdown } from '@/components/form/select/Dropdown';
import { Props as OptionProps } from '@/components/form/select/Option';

export type DropdownPosition = 'top' | 'bottom';
export type ModeType = 'single' | 'multiple';
export type SelectSize = 'small' | 'default' | 'large';
export type SelectState = 'normal' | 'error' | 'success';

export interface Props<Mode extends ModeType> {
  options: OptionProps[];
  allowClear?: boolean;
  defaultValue?: Mode extends 'single' 
    ? OptionProps['id'] 
    : OptionProps['id'][];
  mode?: Mode;
  placeholder?: string;
  size?: SelectSize;
  state?: SelectState;
  value?: Mode extends 'single' 
    ? OptionProps['id'] 
    : OptionProps['id'][];
  width?: string;
  onChange?: (
    value: (OptionProps['id'] | null), 
    list: OptionProps['id'][],
  ) => void;
  onClear?: () => void;
}

export function Select<Mode extends ModeType>({ 
  options, 
  allowClear = true,
  defaultValue, 
  mode = 'single' as Mode,
  placeholder = '',
  size = 'default', 
  state = 'normal',
  value,
  width = '',
  onChange,
  onClear,
}: Props<Mode>) {
  // 개발 환경에서 미리 잘못 설정된 옵션을 거부
  const singleInitialValue = mode === 'single' && !!defaultValue
    ? defaultValue as OptionProps['id'] 
    : null;

  const multipleInitialValue = (mode === 'multiple' && !!defaultValue) 
    ? defaultValue as OptionProps['id'][]
    : [];

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

    // Select mode별 defaultValue 검사
    const isSingleModeInvalid = mode === 'single' 
      && defaultValue && !singleInitialValue;

    const isMultipleModeInvalid = mode === 'multiple' 
      && (defaultValue || []).length !== multipleInitialValue.length;

    if (isSingleModeInvalid || isMultipleModeInvalid) {
      throw new Error('선택지에 없는 id는 초기값으로 설정할 수 없습니다');
    }
  }

  const selectRef = useRef<HTMLDivElement>(null);
    
  const [ isDropdownOpen, setDropdownOpen ] = useState(false);
  const [ dropdownPosition, setDropdownPosition ] = useState<DropdownPosition>('bottom');

  const [ singleSelectedId, setSingleSelectedId ] = useState<OptionProps['id'] | null>(singleInitialValue);
  const [ multipleSelectedIds, setMultipleSelectedIds ] = useState<OptionProps['id'][]>(multipleInitialValue);

  const singleSelectedOption = options.find((option) => option.id === singleSelectedId);
  const multipleSelectedOptions = options.filter((option) => (multipleSelectedIds || []).includes(option.id));

  const placeholderDisplayCondition = placeholder && (
    (placeholder && mode === 'single' && !singleSelectedId)
    || (placeholder && mode === 'multiple' && multipleSelectedIds.length === 0)
  );

  const handleClickOption = (optionId: OptionProps['id']) => {
    if (mode === 'single') {
      setSingleSelectedId(optionId);
      setDropdownOpen(false);
    }

    if (mode === 'multiple') {
      if(!multipleSelectedIds.includes(optionId)) {
        const newSelectedIds = [ ...multipleSelectedIds, optionId ];
        setMultipleSelectedIds(newSelectedIds);
      } else {
        const newSelectedIds = multipleSelectedIds.filter((id) => id !== optionId);
        setMultipleSelectedIds(newSelectedIds);
      }
    }

    if(onChange) {
      onChange(optionId, multipleSelectedIds);
    }
  };

  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (mode === 'single') setSingleSelectedId(null);
    else setMultipleSelectedIds([]);

    if(onChange) onChange(null, multipleSelectedIds);
    if(onClear) onClear();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const handleRemoveTag = (optionId: string) => {
    if(mode !== 'multiple') return;
    setMultipleSelectedIds((prev) => prev.filter((id) => id !== optionId));

    if(onChange) onChange(optionId, multipleSelectedIds);
  };

  // 바깥 영역 클릭 이벤트 적용
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // dropdown 열리는 방향 지정
  useEffect(() => {
    const handleResize = () => {
      if (selectRef.current) {
        const selectRect = selectRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - selectRect.bottom;
        const spaceAbove = selectRect.top;

        // select 아래에 dropdown보다 큰 공간이 있으면 아래로 내림
        setDropdownPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ isDropdownOpen ]);

  // 외부에서 value를 컨트롤 할 때
  useEffect(() => {
    if (!value) return;

    if (mode === 'single') {
      setSingleSelectedId(value as OptionProps['id']);
    } else  {
      setMultipleSelectedIds(value as OptionProps['id'][]);
    }
  }, [ value ]);

  return (
    <div 
      ref={selectRef} 
      style={{ width }}
      className={style.wrapper}>
      {/* ---------- Select area ----------- */}
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={`
          ${style.select.wrapper}    
          ${selectConfig.state[state]}
          ${selectConfig.size[size]}
        `}> 
        <div className={style.select.conent}>
          {placeholderDisplayCondition && (
            <div className={style.select.placeholder}>{placeholder}</div>
          )}

          {(mode === 'single' && singleSelectedOption) && (
            <div className={style.select.selectedOption}>
              {singleSelectedOption.title}
            </div>
          )}

          {(mode === 'multiple' && multipleSelectedOptions.length > 0) && (
          multipleSelectedOptions as OptionProps[]).map((option) => (
            <Tag 
              key={option.id} 
              color={'black'}
              onClose={() => handleRemoveTag(option.id)}>
              {option.title} 
            </Tag>
          ))}
        </div>

        {allowClear && (
          <div 
            className={style.select.clear.wrapper} 
            onClick={handleClear}>
            <Close className={style.select.clear.close} />
          </div>
        )}
      </div>

      {/* ---------- Dropdown area ----------- */}
      <Dropdown
        dropdownPosition={dropdownPosition}
        isDropdownOpen={isDropdownOpen}
        mode={mode}
        options={options}
        selectedIds={
          mode === 'single'
            ? (singleSelectedId ? [ singleSelectedId ] : [])
            : multipleSelectedIds
        }
        size={size}
        onChange={handleClickOption} />
    </div>
  );
}

const selectConfig = {
  size: {
    small: 'h-[32px]',
    default: 'h-[44px]',
    large: 'h-[56px]',
  },
  state: {
    normal: 'outline-gray-300',
    error: 'outline-red',
    success: 'outline-blue',
  }
};

const style = {
  wrapper: 'relative', // dropdown을 위한 relative
  select: {
    wrapper: `
      w-full
      relative
      flex items-center
      bg-white outline outline-1 rounded-md 
      px-2.5 
      cursor-pointer 
    `,
    conent: 'absolute w-[calc(100%-28px)] h-full flex items-center gap-1 overflow-x-auto z-0 scrollbar-hidden',
    placeholder: 'text-gray-400',
    selectedOption: 'absolute rounded-md relative flex justify-start items-center text-gray-900',
    clear: {
      wrapper: `
        w-[32px] h-full
        absolute right-0 z-10 
        flex items-center
        rounded-md bg-gradient-to-r from-transparent via-white to-white 
      `,
      close: '!size-5 text-gray-400 hover:text-gray-500 p-1',
    },
  },
};