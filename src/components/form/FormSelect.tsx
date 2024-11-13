import { useController, UseControllerProps, FieldValues, Control } from 'react-hook-form';

import { Select, Props as SelectProps } from '@/components/form/Select';

interface FormSelectProps<T extends FieldValues> extends Omit<SelectProps, 'onChange'>, UseControllerProps<T> {
  control: Control<T>;
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: FormSelectProps<T>) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <Select
      {...props}
      initialOptionId={defaultValue}
      value={value}
      onChange={(selectedId) => onChange(selectedId)} />
  );
}
