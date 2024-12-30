'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { Close } from '@/assets/icons/Close';
import { Tag } from '@/components/common/Tag';
import { Dropdown } from '@/components/form/select/Dropdown';
import { Props as OptionProps } from '@/components/form/select/Option';
import { mergeRefs } from '@/utils/common';

export type DropdownPosition = 'top' | 'bottom';
export type ModeType = 'single' | 'multiple';
export type SelectSize = 'small' | 'default' | 'large';
export type SelectState = 'normal' | 'error' | 'success';

export interface Props {
  options: OptionProps[];
  allowClear?: boolean;
  defaultValue?: OptionProps['id'] | OptionProps['id'][];
  mode?: ModeType;
  placeholder?: string;
  size?: SelectSize;
  state?: SelectState;
  value?: OptionProps['id'] | OptionProps['id'][];
  width?: string;
  onChange?: (value: OptionProps['id'][]) => void;
  onClear?: (value: OptionProps['id'][]) => void;
}

const convertValueToArray = (value?: OptionProps['id'] | OptionProps['id'][]) => {
  const array = !value 
    ? [] 
    : (Array.isArray(value)) ? value : [ value ];

  return array;
};

export const Select = forwardRef((
  { 
    options, 
    allowClear = true,
    defaultValue, 
    mode = 'single',
    placeholder = '',
    size = 'default', 
    state = 'normal',
    value,
    width = '',
    onChange,
    onClear,
  }: Props, 
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  // 잘못 설정된 defaultValue, value 거부
  if (process.env.NODE_ENV === 'development') {
    const isAllValueInOptions = convertValueToArray(value).length > 0
      && !convertValueToArray(value)
        .every((ele) => options.some((option) => option.id === ele));

    const isAllDefaultValueInOptions = convertValueToArray(defaultValue).length > 0
      && !convertValueToArray(defaultValue)
        .every((ele) => options.some((option) => option.id === ele));

    if(isAllValueInOptions || isAllDefaultValueInOptions) {
      throw new Error('options에 없는 값을 value나 defaultValue로 설정할 수 없습니다.');
    }

    // single mode defaultValue, value 개수 관리
    const singleModeLengthLimit = (convertValueToArray(value).length > 1) 
      || (convertValueToArray(defaultValue).length > 1);

    if(mode === 'single' && singleModeLengthLimit) {
      throw new Error('single select에선 value나 defaultValue를 1개 초과로 설정할 수 없습니다.');
    }

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
  }

  const selectRef = useRef<HTMLDivElement>(null);
    
  const [ isDropdownOpen, setDropdownOpen ] = useState(false);
  const [ dropdownPosition, setDropdownPosition ] = useState<DropdownPosition>('bottom');

  const valueArray = convertValueToArray(value);
  const defaultValueArray = convertValueToArray(defaultValue);

  const initialSelectedIds = (valueArray?.length ?? 0) > 0 
    ? valueArray 
    : (defaultValueArray?.length ?? 0) > 0 
      ? defaultValueArray 
      : [];

  const [ selectedIds, setSelectedIds ] = useState<OptionProps['id'][]>(initialSelectedIds);
  const selectedOptions = options.filter((option) => selectedIds.includes(option.id));

  const placeholderDisplayCondition = placeholder && (selectedIds.length === 0);

  const handleClickOption = (optionId: OptionProps['id']) => {
    if (mode === 'single') {
      const newSelectedId = [ optionId ];
      setSelectedIds(newSelectedId);
      setDropdownOpen(false);

      if(onChange) {
        onChange(newSelectedId);
      }
    }

    if (mode === 'multiple') {
      let newSelectedIds;

      if(!selectedIds.includes(optionId)) {
        newSelectedIds = [ ...selectedIds, optionId ];
        setSelectedIds(newSelectedIds);
      } else {
        newSelectedIds = selectedIds.filter((id) => id !== optionId);
        setSelectedIds(newSelectedIds);
      }

      if(onChange) {
        onChange(newSelectedIds);
      }
    }
  };

  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedIds([]);

    if(onChange) onChange([]);
    if(onClear) onClear([]);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const handleRemoveTag = (optionId: string) => {
    if(mode !== 'multiple') return;

    const newSelectedIds = selectedIds.filter((id) => id !== optionId);
    setSelectedIds(newSelectedIds);

    if(onChange) onChange(newSelectedIds);
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

    const valueArray = convertValueToArray(value);
    setSelectedIds(valueArray);
  }, [ value ]);

  return (
    <div 
      ref={mergeRefs(selectRef, ref)} 
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

          {(mode === 'single') && (
            <div className={style.select.selectedOption}>
              {selectedOptions[0]?.title ?? ''}
            </div>
          )}

          {(mode === 'multiple') && (
            selectedOptions.map((option) => (
              <Tag 
                key={option.id} 
                color={'black'}
                onClose={() => handleRemoveTag(option.id)}>
                {option.title} 
              </Tag>
            ))
          )}
          
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
        selectedIds={selectedIds}
        size={size}
        onChange={handleClickOption} />
    </div>
  );
});

Select.displayName = 'Select';

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