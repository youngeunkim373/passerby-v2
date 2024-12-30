import { forwardRef } from 'react';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { Select, Props as SelectProps } from '@/components/form/select/Select';

interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'onChange' | 'value'>, Omit<UseControllerProps<T>, 'defaultValue'> {
  control: Control<T>;
}

function FormSelectComponent<T extends FieldValues>(
  {
    name,
    control,
    rules,
    mode = 'single',
    ...props
  }: FormSelectProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <Select
      {...props}
      {...field}
      mode={mode}
      ref={ref} />
  );
}

// 제네릭 타입 때문에 타입을 단언라기 위해 
// forwardRef 컴포넌트 래핑 처리를 따로 함
export const FormSelect = forwardRef(FormSelectComponent) as <T extends FieldValues>(
  props: FormSelectProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => ReturnType<typeof FormSelectComponent>;