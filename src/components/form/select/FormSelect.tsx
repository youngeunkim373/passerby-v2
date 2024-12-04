import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { ModeType, Select, Props as SelectProps } from '@/components/form/select/Select';

interface FormSelectProps<T extends FieldValues, M extends ModeType>
  extends Omit<SelectProps<M>, 'onChange' | 'defaultValue'>, UseControllerProps<T> {
  control: Control<T>;
}

export function FormSelect<T extends FieldValues, M extends ModeType>({
  name,
  control,
  rules,
  defaultValue,
  mode = 'single' as M,
  ...props
}: FormSelectProps<T, M>) {
  const { field: { value, onChange } } = useController({
    name,
    control,
    rules,
    defaultValue,
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
      defaultValue={defaultValue}
      mode={mode}
      value={value} 
      onChange={handleChange} />
  );
}