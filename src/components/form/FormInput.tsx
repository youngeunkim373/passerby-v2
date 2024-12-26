import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { Input, Props as InputProps } from '@/components/form/Input';

interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, 'defaultValue' | 'name'>, UseControllerProps<T> {
  control: Control<T>;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: FormInputProps<T>) {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  
  return (
    <Input
      {...props}
      {...field}
      defaultValue={defaultValue} />
  );
}