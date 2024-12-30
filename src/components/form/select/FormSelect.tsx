import { forwardRef } from 'react';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { ModeType, Select, Props as SelectProps } from '@/components/form/select/Select';

interface FormSelectProps<T extends FieldValues, M extends ModeType>
  extends Omit<SelectProps<M>, 'onChange' | 'value'>, Omit<UseControllerProps<T>, 'defaultValue'> {
  control: Control<T>;
}

function FormSelectComponent<T extends FieldValues, M extends ModeType>(
  {
    name,
    control,
    rules,
    mode = 'single' as M,
    ...props
  }: FormSelectProps<T, M>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { field: { value, onChange } } = useController({
    name,
    control,
    rules,
  });

  const handleChange = (currentValue: string | null, list: string[]) => {
    if (mode === 'single') {
      onChange(currentValue);
    }
    
    if (mode === 'multiple') {
      if(currentValue) {
        if (!list.includes(currentValue)) {
          onChange([ ...list, currentValue ]);
        } else {
          onChange(list.filter((ele) => ele !== currentValue));
        }
      } else {
        onChange([]);
      }
    }
  };

  return (
    <Select
      {...props}
      mode={mode}
      ref={ref}
      value={value}
      onChange={handleChange} />
  );
}

// 제네릭 타입 때문에 타입을 단언라기 위해 
// forwardRef 컴포넌트 래핑 처리를 따로 함
export const FormSelect = forwardRef(FormSelectComponent) as <T extends FieldValues, M extends ModeType>(
  props: FormSelectProps<T, M> & { ref?: React.Ref<HTMLDivElement> },
) => ReturnType<typeof FormSelectComponent>;