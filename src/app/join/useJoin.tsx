import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { JoinRequestDTO } from '@/app/join/join.interface';
import { join, sendVerificationEmail as sendVerificationEmailApi } from '@/app/join/join.service';
import { ExclamationMarkSolidCircle } from '@/assets/icons/ExclamationMark';
import { Button } from '@/components/buttons/Button';
import { InputState } from '@/components/form/Input';
import { SelectState } from '@/components/form/Select';
import { Modal } from '@/components/layout/Modal';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';
import { emailRegex, nicknameRegex, passwordRegex } from '@/utils/regex';
import { useState } from 'react';

type JoinFormDTO = JoinRequestDTO & { passwordCheck: string };
type EmailVerificationState = 'unsent' | 'sent' | 'confirmed';

export const useJoin = () => {
  const router = useRouter();
  const { show, hide } = useModalContext();

  const [ emailVerification, setEmailVerification ] = useState<EmailVerificationState>('unsent');

  const {
    clearErrors,
    handleSubmit,
    register,
    setError,
    watch,
    control,
    formState: { errors },
  } = useForm<JoinFormDTO>({ mode: 'all' });

  const [
    email, 
    password, 
    passwordCheck, 
    nickname, 
    age, 
    sex, 
    region 
  ] = watch([ 'email','password', 'passwordCheck', 'nickname', 'age', 'sex', 'region' ]);

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
      pattern: {
        value: passwordRegex,
        message: '비밀번호는 영문 대소문자, 숫자, 특수문자(@$!%*#?&)를 포함하여 8자 이상으로 작성해야 합니다',
      },
    },
    passwordCheck: {
      required: '비밀번호 확인을 입력해주세요',
      validate: (value: JoinFormDTO['passwordCheck']) => {
        if(value !== password) {
          return '비밀번호와 똑같이 입력해주세요';
        }
      }
    },
    nickname: {
      required: '닉네임을 입력해주세요',
      pattern: {
        value: nicknameRegex,
        message: '닉네임은 한글, 영문 대소문자, 숫자, 특수문자(₩~!@#$%^&*-_=+)를 포함하여 2 ~ 20자로 작성해야 합니다',
      },
    },
    age: { required: '연령을 선택해주세요' },
    sex: { required: '성별을 선택해주세요' },
    region: { required: '거주하는 시/도를 선택해주세요' },
  };

  const joinUser = async () => {
    try {
      await join({ email, password, nickname, age, sex, region });
      // TODO 가입 완료 알림 UI 필요 -> SetTimeout으로 로그인 페이지로 이동
      router.push('/');
    } catch (error) {
      console.error(error);
      // TODO 에러 처리 UI 필요
    }
  };

  const sendVerificationEmail = async () => {
    try {
      await sendVerificationEmailApi({ email, password, passwordCheck, nickname, age, sex, region });
      setEmailVerification('sent');
    } catch(err) {
      // TODO 에러 처리 UI 필요 
      if(err instanceof CustomError && err.statusCode === 409) {
        show(
          <Modal>
            <div>
              <ExclamationMarkSolidCircle className={'size-10 text-red mx-auto mb-4'} />
              <p className={'text-center'}>이미 회원가입이 완료된 이메일입니다.</p>
              <p className={'text-center'}>로그인 창으로 이동하시겠습니까?</p>
              <div className={'flex justify-center gap-4 mt-8'}>
                <Button onClick={hide}>취소</Button>
                <Button className={'w-full'} variant={'solid'}>로그인하러 가기</Button>
              </div>
            </div>
          </Modal>
        );
      }
    }
  };

  const watchPassword = (password: JoinFormDTO['password']) => {
    if(password !== passwordCheck) {
      return setError('passwordCheck', { 
        type: 'manual', 
        message: '비밀번호와 똑같이 입력해주세요'
      });
    } 

    clearErrors([ 'passwordCheck' ]);
  };

  const getValidState = (
    fieldName: keyof JoinFormDTO, 
    fieldValue: string
  ): (InputState | SelectState) => {
    return errors[fieldName] 
      ? 'error' 
      : (fieldValue ? 'success' : 'normal');
  };

  return {
    control,
    errors,
    formValidation,
    formValues: { email, password, nickname, age, sex, region,passwordCheck },
    emailVerification,
    valueStates: {
      email: getValidState('email', email),
      password: getValidState('password', password), 
      passwordCheck: getValidState('passwordCheck', passwordCheck),
      nickname: getValidState('nickname', nickname), 
      age: getValidState('age', age),
      sex: getValidState('sex', sex),
      region: getValidState('region', region),
    },
    register: {
      email: register('email', formValidation.email),
      password: register('password', {
        onChange: (e) => watchPassword(e.target.value),
        ...formValidation.password,
      }),
      passwordCheck: register('passwordCheck', formValidation.passwordCheck),
      nickname: register('nickname', formValidation.nickname),
      age: register('age', formValidation.age),
      sex: register('sex', formValidation.sex),
      region: register('region', formValidation.region),
    },
    join: handleSubmit(joinUser),
    sendVerificationEmail,
  };
};

