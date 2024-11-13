import { Meta, StoryFn } from '@storybook/react';
import { FieldValues, useForm } from 'react-hook-form';

import { Form } from '@/components/form/Form';
import { FormItem } from '@/components/form/FormItem';
import { Input } from '@/components/form/Input';
import { FormSelect } from '@/components/form/FormSelect';
import { options } from '@/stories/constants';

export default {
  component: FormItem,
  title: 'Components/Form/FormItem',
  argTypes: {
    name: { control: false },
    label: { control: false },
    isRequired: { control: false },
    error: { control: false },
    helper: { control: false },
  }
} as Meta<typeof FormItem>;

const errorOptions = {
  input: {
    required: 'Enter a value',
    pattern: {
      value: /^\d{5}$/,
      message: 'Enter only 5 digits',
    },
    minLength: { 
      value: 3, 
      message: 'Must be at least 3 characters long',
    },
    maxLength: { 
      value: 5, 
      message: 'Must be 5 characters or fewer',
    },
    min: { 
      value: 1, 
      message: 'The minimum value is 1',
    },
    max: { 
      value: 90000, 
      message: 'The maximum value is 90000',
    },
  },
  select: {
    required: 'Select a value',
  }
};

const Template: StoryFn<FieldValues> = () => {
  const { 
    control,
    formState: { errors, isValid },
    register,  
  } = useForm({ mode: 'all' });

  const hasError = Object.keys(errors).length > 0;

  const inputState = isValid 
    ? 'success'
    : hasError ? 'error' :'normal';

  const formItems = [
    {
      name: 'input',
      label: 'Example 1 - Input',
      children: (
        <Input 
          placeholder={'Enter any text'}
          state={inputState}
          {...register('input', errorOptions['input'])} />
      ),
      isRequired: true,
      helper: 'there are required, pattern, min/max length and min/max validations',
    },
    {
      name: 'select',
      label: 'Example 2 - Select',
      children: (
        <FormSelect 
          control={control}
          placeholder={'Select your country'}
          options={options}
          state={inputState}
          allowClear={true}
          {...register('select', errorOptions['select'])} />
      ),
      isRequired: true,
      helper: 'there are required, pattern, min/max length and min/max validations',
    },
    // TODO checkbox, radio 등 추가
  ];

  return (
    <Form
      items={formItems}
      className={'flex flex-col gap-8 w-[300px]'}
      onSubmit={() => console.log('submit')}
      errors={errors} />
  );
};

export const Default = Template.bind({});