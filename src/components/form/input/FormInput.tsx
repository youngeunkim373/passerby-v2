import React, { forwardRef } from 'react';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { Input, Props as InputProps } from '@/components/form/input/Input';

interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, 'defaultValue' | 'name'>, UseControllerProps<T> {
  control: Control<T>;
}

function FormInputComponent<T extends FieldValues>(
  { name, control, rules, defaultValue, ...props }: FormInputProps<T>,
  ref: React.Ref<HTMLInputElement>,
) {
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
      ref={ref}
      defaultValue={defaultValue} />
  );
}

// 제네릭 타입 때문에 타입을 단언라기 위해 
// forwardRef 컴포넌트 래핑 처리를 따로 함
export const FormInput = forwardRef(FormInputComponent) as <T extends FieldValues>(
  props: FormInputProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => ReturnType<typeof FormInputComponent>;
