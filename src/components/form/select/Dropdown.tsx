import { Presence } from '@/components/common/Presence';
import { Option, Props as OptionProps } from '@/components/form/select/Option';
import { DropdownPosition, ModeType, SelectSize } from '@/components/form/select/Select';

interface Props {
  dropdownPosition: DropdownPosition;
  isDropdownOpen: boolean;
  mode: ModeType;
  options: OptionProps[];
  selectedIds: string[];
  size: SelectSize;
  className?: string;
  onChange?: (optionId: OptionProps['id']) => void;
}

export function Dropdown({
  dropdownPosition,
  isDropdownOpen,
  mode,
  options,
  selectedIds,
  size,
  className,
  onChange,
}: Props) {
  
  return (
    <Presence present={isDropdownOpen}>
      <div
        className={`
        ${style.wrapper}
        ${isDropdownOpen ? 'animate-fade-in' : 'animate-fade-out'}
        ${dropdownPosition === 'bottom' ? 'top-full mt-[1px]' : 'bottom-full mb-[1px]'}
        ${className}
      `}>
        {options.map((option) => (
          <Option 
            key={option.id}
            size={size}
            onClick={() => onChange && onChange(option.id)}
            className={`
            ${dropdownPosition === 'bottom' 
            ? (isDropdownOpen ? 'animate-move-up-from-bottom' : 'animate-move-down-to-bottom')
            : (isDropdownOpen ? 'animate-move-down-from-top' : 'animate-move-up-to-top')}
            `}
            {...option} 
            isSelected={mode === 'multiple' && selectedIds.includes(option.id)} />
        ))}
      </div>
    </Presence>
  );
}

const style = {
  wrapper: 'w-full absolute flex flex-col z-10 py-1.5 bg-white divide-y divide-gray-100 rounded-md shadow mt-[1px] z-50',
};