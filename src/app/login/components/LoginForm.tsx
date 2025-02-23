'use client';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { LoginRequestDTO } from '@/app/login/login.interface';
import { SpinLoading } from '@/assets/icons/Loading';
import { Locker } from '@/assets/icons/Locker';
import { User } from '@/assets/icons/User';
import { Button } from '@/components/buttons/Button';
import { Form } from '@/components/form/Form';
import { FormItemProps } from '@/components/form/FormItem';
import { Input } from '@/components/form/input/Input';
import { useAuthContext } from '@/contexts/AuthContext';
import { emailRegex } from '@/utils/regex';

export function LoginForm() {
  const { 
    formState: { errors },
    handleSubmit,
    register, 
    setError,
  } = useForm<LoginRequestDTO>({ mode: 'onSubmit' });

  const { isLoading, login } = useAuthContext();

  const formValidation = {
    email: {
      required: '이메일을 입력해주세요',
      pattern: {
        value: emailRegex,
        message: '이메일 형식을 확인해주세요',
      },
    },
    password: {
      required: '비밀번호를 입력해주세요',
    },
  };

  const formItems: FormItemProps[] = [
    {
      name: 'email',
      label: '이메일',
      children: (
        <Input
          prefix={<User />}
          placeholder={'이메일을 입력해주세요'} 
          {...register('email', formValidation.email)} />
      ),
    },
    {
      name: 'password',
      label: '비밀번호',
      children: (
        <Input
          type={'password'}
          prefix={<Locker />}
          placeholder={'비밀번호를 입력해주세요'}
          {...register('password', formValidation.password)} />
      ),
    },
  ];

  return (
    <div className={style.wrapper}>
      <Image 
        src={'/images/bubble-logo.svg'} 
        alt={'logo'} 
        width={110}
        height={97.2} />
      <Form
        items={formItems}
        onSubmit={handleSubmit((data) => login({ ...data, setError }))}
        button={(
          <Button 
            type={'submit'} 
            variant={'solid'}
            className={'w-full relative'}>
            로그인
            {isLoading && (
              <SpinLoading fill={'white'} className={'absolute size-5 right-[100px]'} />
            )}
          </Button>
        )}
        errors={errors}
        className={style.form} />
    </div>
  );
}

const style = {
  wrapper: 'w-full flex flex-col justify-center items-center gap-8 pt-12 pb-16',
  form: 'w-[300px] flex flex-col gap-4',
};