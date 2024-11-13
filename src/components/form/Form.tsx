import { FormHTMLAttributes, ReactNode } from 'react';
import { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

import { FormItem, FormItemProps } from '@/components/form/FormItem';

export interface Props<TFormValues extends FieldValues> extends FormHTMLAttributes<HTMLFormElement> {
  button?: ReactNode;
  errors: FieldErrors<TFormValues>;
  items: FormItemProps[];
  onSubmit: () => void;
}

export function Form<TFormValues extends FieldValues>({ button, errors, items, onSubmit, ...formProps }: Props<TFormValues>) {
  // 중복 name 체크
  if (process.env.NODE_ENV === 'development') {
    const nameSet = new Set<string>();

    const duplicateNames = items.filter((item) => {
      if (nameSet.has(item.name)) return true;
      nameSet.add(item.name);
      return false;
    });
    
    if (duplicateNames.length > 0) {
      throw new Error(`중복된 field name이 존재합니다: ${duplicateNames.map((item) => item.name).join(', ')}`);
    }
  }

  return (
    <form
      action={'#'}
      method={'POST'}
      onSubmit={onSubmit}
      {...formProps}>
      {items.map((item) => (
        <FormItem 
          key={item.name} 
          error={errors[item.name] as FieldError} 
          {...item}>
          {item.children}
        </FormItem>
      ))}
      {button && (
        <div className={'mt-4'}>{button}</div>
      )}
    </form>
  );
}