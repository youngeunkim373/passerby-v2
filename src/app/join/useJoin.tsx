import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { JoinRequestDTO } from '@/app/join/join.interface';
import { InputState } from '@/components/form/Input';
import { SelectState } from '@/components/form/Select';
import { emailRegex, nicknameRegex, passwordRegex } from '@/utils/regex';

type JoinFormDTO = JoinRequestDTO & { passwordCheck: string };

export const useJoin = () => {
  const router = useRouter();
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
    router.push('/');
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
  };
};

