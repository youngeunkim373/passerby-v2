import { PropsWithChildren, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

type MessageState = 'helper' | 'error' | 'success';

interface LabelProps {
  name: string;
  label?: string | ReactNode;
  isRequired?: boolean; // label 옆에 * 마크 추가
}

type ContentProps = PropsWithChildren;

export interface FormItemProps extends LabelProps, ContentProps {
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
  style,
}: FormItemProps) {

  let messageState: (MessageState | undefined);
  if(helper) messageState = 'helper';
  if(error) messageState = 'error';

  const defaultStyle = getStyle({ isRequired, messageState });

  return (
    <div>
      <FormLabel
        name={name} 
        label={label} 
        isRequired={isRequired}
        className={defaultStyle.label + (style?.label ?? '')} />
      <FormContent className={defaultStyle.content}>{children}</FormContent>
      {(error || helper) && (
        <FormMessage className={defaultStyle.message + (style?.message ?? '')}>
          {error?.message ?? helper}
        </FormMessage>
      )}
    </div>
  );
}

/* --------- components ---------- */ 
type PropsWithClass = { className: string };

type FormLabelProps = LabelProps & PropsWithClass;
const FormLabel = ({ label, name, className }: FormLabelProps) => {
  return (
    <label
      htmlFor={name}
      className={className}>
      {label}
    </label>
  );
};

type FormContentProps = ContentProps & PropsWithClass;
const FormContent = ({ children, className }: FormContentProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

type FormMessageProps = { children: FormItemProps['helper']} & PropsWithClass;
const FormMessage = ({ children, className }: FormMessageProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

/* --------- style ---------- */ 
const formItemConfig = {
  isRequired: 'before:content-["*"] before:text-red before:pr-1',
  messageState: {
    helper: 'text-gray-600',
    error: 'text-red',
    success: 'text-blue',
  }
};

type StyleProps = Pick<FormItemProps, 'isRequired'> & { messageState?: MessageState };

const getStyle = ({ isRequired, messageState }: StyleProps) => ({
  label: `
    block
    font-medium
    leading-6
    text-gray-900
    text-sm 
    ${isRequired && formItemConfig['isRequired']}
   `,
  content: 'mt-2',
  message: `
    font-medium text-xs break-all
    px-2 mt-1
    ${messageState && formItemConfig.messageState[messageState]}
  `,
});