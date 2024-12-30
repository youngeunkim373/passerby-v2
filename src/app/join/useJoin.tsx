import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { JoinFormDTO } from '@/app/join/join.interface';
import { joinAPI, sendVerificationEmailAPI } from '@/app/join/join.service';
import { ExclamationMarkSolidCircle } from '@/assets/icons/ExclamationMark';
import { GradationLoading } from '@/assets/icons/Loading';
import { Button } from '@/components/buttons/Button';
import { InputState } from '@/components/form/input/Input';
import { SelectState } from '@/components/form/select/Select';
import { Modal } from '@/components/layout/Modal';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { SuccessModal } from '@/components/modals/SuccessModal';
import { useModalContext } from '@/contexts/ModalContext';
import { CustomError } from '@/utils/error';
import { emailRegex, nicknameRegex, passwordRegex } from '@/utils/regex';
import { validateToken } from '@/utils/token';
import { decryptUrlToObject } from '@/utils/url';

type EmailVerificationState = 'unsent' | 'isSending' | 'sent' | 'confirmed';

export const useJoin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { content, token } = Object.fromEntries(searchParams.entries()) as {
    content?: string;
    token?: string;
  };

  const { show, hide } = useModalContext();

  const [ emailVerification, setEmailVerification ] = useState<EmailVerificationState>('unsent');

  const {
    clearErrors,
    getValues,
    handleSubmit,
    register,
    reset,
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

  const emailHelper = 
  emailVerification === 'isSending' ? <GradationLoading className={'size-4'} /> :
    emailVerification === 'sent' ? '이메일을 전송했습니다':
      emailVerification === 'confirmed' ? <span className={'text-blue'}>이메일 본인 인증을 완료했습니다</span> :
        '이메일 본인 인증을 진행해주세요';

  const joinUser = async () => {
    try {
      const { email, password, age, sex, region } = getValues();
      
      await joinAPI({ email, password, age, sex, region  });
      
      show(
        <SuccessModal 
          message={'회원가입을 완료하였습니다!'} 
          button={'로그인하기'} 
          duration={5000} 
          onConfirm={() => router.push('/login')} />
      );
    } catch (err) {
      console.error(err);

      if(err instanceof CustomError) {
        return show(
          <ErrorModal 
            statusCode={err.statusCode}
            message={err.message} />
        );
      }

      show(
        <ErrorModal 
          message={
            <>
              회원가입 도중 알 수 없는 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </>
          } />
      );
    }
  };

  const sendVerificationEmail = async () => {
    try {
      const values = getValues();

      setEmailVerification('isSending');
      sendVerificationEmailAPI(values);
      setEmailVerification('sent');
    } catch(err) {
      setEmailVerification('unsent');

      if(err instanceof CustomError) {
        if(err.statusCode === 409) {
          return show(
            <Modal>
              <div>
                <ExclamationMarkSolidCircle className={'size-10 text-main mx-auto mb-4'} />
                <p className={'text-center'}>이미 회원가입이 완료된 이메일입니다.</p>
                <p className={'text-center'}>로그인 창으로 이동하시겠습니까?</p>
                <div className={'flex justify-center gap-4 mt-8'}>
                  <Button onClick={hide}>취소</Button>
                  <Button 
                    className={'w-full'} 
                    variant={'solid'}
                    onClick={() => router.push('/login')}>로그인하러 가기</Button>
                </div>
              </div>
            </Modal>
          );
        }

        return show(
          <ErrorModal 
            statusCode={err.statusCode}
            message={err.message} />
        );
      }

      show(
        <ErrorModal 
          message={
            <>
              본인 인증 메일 전송 중 알 수 없는 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </>
          } />
      );
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

  useEffect(() => {
    // 유저가 입력했던 값 다시 입력
    if(content) {
      const decryptedUserInfo = decryptUrlToObject(content) as JoinFormDTO;
      reset(decryptedUserInfo);
    }
    
    // token 유효시간 체크
    const checkTokenExpiration = async () =>  {
      if(!token) return;

      try {
        validateToken(token);
        setEmailVerification('confirmed');
      } catch(e) {
        console.log('An error occurs while checking verification token: '+ e);
  
        if(e instanceof CustomError) {
          const throwFormError = (message: string) => {
            setError('email', { type: 'manual', message });
          };
  
          if(e.statusCode === 403) {
            return throwFormError('이메일 본인 인증 유효시간이 지났습니다. 다시 본인 인증을 진행해주세요');
          }
  
          throwFormError(e.message);
        }
      }
    };

    checkTokenExpiration();
  }, []);

  return {
    control,
    emailHelper,
    errors,
    formValidation,
    formValues: { email, password, nickname, age, sex, region, passwordCheck },
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

