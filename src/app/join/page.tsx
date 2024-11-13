'use client';
import Image from 'next/image';

import { useJoin } from '@/app/join/useJoin';
import { Locker } from '@/assets/icons/Locker';
import { User } from '@/assets/icons/User';
import BubbleLogo from '@/assets/images/bubble-logo.svg';
import { Button } from '@/components/buttons/Button';
import { Form } from '@/components/form/Form';
import { FormItemProps } from '@/components/form/FormItem';
import { FormSelect } from '@/components/form/FormSelect';
import { Input } from '@/components/form/Input';
import { ageRange, Regions } from '@/constants/user';
import { Suspense } from 'react';

export default function Join() {
  const { 
    control,
    emailVerification,
    errors, 
    formValues,
    register, 
    valueStates, 
    join, 
    sendVerificationEmail,
  } = useJoin();

  const formItems: FormItemProps[] = [
    {
      name: 'email',
      label: '이메일',
      isRequired: true,
      helper: emailVerification === 'sent' && '이메일을 전송하였습니다',
      children: (
        <div className={style.item.email.wrapper}>
          <Input
            prefix={<User />}
            placeholder={'이메일을 입력해주세요'} 
            state={valueStates.email}
            {...register.email} />
          <Button 
            type={'button'}
            size={'small'} 
            disabled={!formValues.email || !!errors.email}
            className={style.item.email.button}
            onClick={sendVerificationEmail}>
             본인 인증
          </Button>
        </div>
      ),
    },
    {
      name: 'password',
      label: '비밀번호',
      isRequired: true,
      children: (
        <Input
          type={'password'}
          prefix={<Locker />}
          placeholder={'비밀번호를 입력해주세요'}
          state={valueStates.password}
          {...register.password} />
      ),
    },
    {
      name: 'passwordCheck',
      label: '비밀번호 확인',
      isRequired: true,
      children: (
        <Input
          type={'password'}
          prefix={<Locker />}
          placeholder={'비밀번호를 한 번 더 입력해주세요'}
          state={valueStates.passwordCheck}
          {...register.passwordCheck}
        />
      ),
    },
    {
      name: 'nickname',
      label: '닉네임',
      isRequired: true,
      children: (
        <Input
          placeholder={'사용할 닉네임을 입력해주세요'}
          state={valueStates.nickname}
          {...register.nickname} />
      ),
    },
    {
      name: 'age',
      label: '연령대',
      isRequired: true,
      children: (
        <FormSelect
          control={control}
          placeholder={'연령대를 선택해주세요'}
          allowClear={true}
          state={valueStates.age}
          options={
            Object
              .entries(ageRange)
              .map(([ key, value ]) => ({ id: key, title: value.name }))
          }
          {...register.age} />
      ),
    },
    {
      name: 'sex',
      label: '성별',
      isRequired: true,
      children: (
        <FormSelect
          control={control}
          placeholder={'성별을 선택해주세요'}
          allowClear={true}
          state={valueStates.sex}
          options={[
            { id: 'female', title: '여성' },
            { id: 'male', title: '남성' },
          ]}
          {...register.sex} />
      ),
    },
    {
      name: 'region',
      label: '거주지',
      isRequired: true,
      children: (
        <FormSelect
          control={control}
          placeholder={'거주하는 시/도를 선택해주세요'}
          allowClear={true}
          state={valueStates.region}
          options={
            Object
              .entries(Regions)
              .map(([ key, value ]) => ({ id: key, title: value }))
          }
          {...register.region} />
      ),
    },
  ];

  return (
    <Suspense>
      <div className={style.wrapper}>
        <Image 
          src={BubbleLogo} 
          alt={'logo'} 
          width={110} />
        <Form
          items={formItems}
          onSubmit={join}
          button={(
            <Button 
              type={'submit'} 
              variant={'solid'}
              disabled={emailVerification !== 'confirmed'}
              className={'w-full'}>
              {emailVerification === 'confirmed' ? '회원가입' : '본인 인증 필요'}
            </Button>
          )}
          errors={errors}
          className={style.form} />
      </div>
    </Suspense>

  );
}

const style = {
  wrapper: 'w-full flex flex-col justify-center items-center gap-8 pt-12 pb-16',
  form: 'w-[300px] flex flex-col gap-4',
  item: {
    email: {
      wrapper: 'flex gap-2',
      button: 'px-[8px] h-[44px]',
    }
  }
};