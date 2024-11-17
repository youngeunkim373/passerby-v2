'use client';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { SubmitHandler, UseFormSetError } from 'react-hook-form';

import { LoginRequestDTO, LoginResponseDTO } from '@/app/login/login.interface';
import { CustomError } from '@/utils/error';
import { removeLocalStorageItem, setLocalStorageItem } from '@/utils/webStorage';

// @ts-expect-error: known issue
const AuthContext = createContext<ReturnType<typeof useAuth>>(null);

interface LoginArgs extends LoginRequestDTO {
  setError: UseFormSetError<LoginRequestDTO>;
};

export const useAuth = () => {
  const router = useRouter();
  const [ isLoggedIn, setLoggedIn ] = useState(false);

  const login: SubmitHandler<LoginArgs> = async ({ email, password, setError }: LoginArgs) => { 
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const response = await res.json();

      if(response.status !== 200) {
        throw new CustomError(response.status, response.message);
      }

      extendSession({ 
        accessToken: response.data.accessToken, 
        refreshToken: response.data.refreshToken
      });

      router.push('/');
    } catch (error) {
      console.error('Error fetching data:', error);

      if(error instanceof CustomError) {
        return setError('password', {
          type: 'manual',
          message: error.message,
        });
      }

      setError('password', {
        type: 'manual',
        message: '잠시 후에 다시 시도해주세요',
      });
    }
  };

  const logout = () => {
    removeLocalStorageItem('accessToken');
    removeLocalStorageItem('refreshToken');
    setLoggedIn(false);
    router.push('/');
  };

  const extendSession = ({ accessToken, refreshToken }: LoginResponseDTO) => {
    setLocalStorageItem('accessToken', accessToken);
    setLocalStorageItem('refreshToken', refreshToken);
    setLoggedIn(true);
  };

  return { 
    isLoggedIn,
    login,
    logout,
  };
};

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }: PropsWithChildren) {
  const state = useAuth();

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
} 