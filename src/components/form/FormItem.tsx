import { PropsWithChildren, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

/* ------------------ FormItem ------------------- */ 
export interface FormItemProps extends LabelProps, PropsWithChildren {
  error?: FieldError;
  helper?: string | ReactNode;
  style?: {
    label?: string;
    message?: string;
  }
};

export function FormItem({ 
  name, 
  label, 
  children, 
  error,
  helper,
  isRequired = false,
}: FormItemProps) {

  return (
    <div>
      {label && (
        <FormLabel
          name={name} 
          label={label} 
          isRequired={isRequired} />
      )}
      <FormContent>{children}</FormContent>
      {(error || helper) && (
        <FormMessage 
          helper={helper} 
          error={error} />
      )}
    </div>
  );
}

/* ------------------ FormLabel ------------------- */ 
interface LabelProps {
  name: string;
  label?: string | ReactNode;
  isRequired?: boolean; // label 옆에 * 마크 추가
}

const FormLabel = ({ label, name, isRequired }: LabelProps) => {
  return (
    <label
      htmlFor={name}
      className={`
        block
        font-medium leading-6 text-gray-900 text-sm 
        mb-2
        ${isRequired && 'before:content-["*"] before:text-red before:pr-1'}
      `}>
      {label}
    </label>
  );
};

/* ------------------ FormContent ------------------- */ 
const FormContent = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

/* ------------------ FormMessage ------------------- */ 
type MessageState = 'helper' | 'error' | 'success';
type FormMessageProps = Pick<FormItemProps, 'helper' | 'error'>;

const FormMessage = ({ error, helper }: FormMessageProps) => {
  let messageState: (MessageState | undefined);

  if(helper) messageState = 'helper';
  if(error) messageState = 'error';

  return (
    <div
      className={`
        font-medium text-xs break-all
        px-2 mt-1
        ${messageState && messageStateConfig[messageState]}
      `}>
      {error?.message ?? helper}
    </div>
  );
};

const messageStateConfig = {
  helper: 'text-gray-600',
  error: 'text-red',
  success: 'text-blue',
};