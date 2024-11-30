'use client';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { SubmitHandler, UseFormSetError } from 'react-hook-form';

import { LoginRequestDTO, LoginResponseDTO } from '@/app/login/login.interface';
import { CustomError } from '@/utils/error';
import { generateAccessToken, generateRefreshToken, validateToken } from '@/utils/token';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '@/utils/webStorage';

// @ts-expect-error: known issue
const AuthContext = createContext<ReturnType<typeof useAuth>>(null);

interface LoginArgs extends LoginRequestDTO {
  setError: UseFormSetError<LoginRequestDTO>;
};

export const useAuth = () => {
  const router = useRouter();

  const [ loggedInUser, setLoggedInUser ] = useState<{
    isLoggedIn: boolean | null,
    userEmail: string | null,
   }>({
     isLoggedIn: null,
     userEmail: null,
   });
  const [ isLoading, setLoading ] = useState(false);

  const login: SubmitHandler<LoginArgs> = async ({ email, password, setError }: LoginArgs) => { 
    try {
      setLoading(true);

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
        refreshToken: response.data.refreshToken,
        userEmail: email,
      });

      setLoading(false);
      router.push('/');
    } catch (error) {
      console.error('Error fetching data:', error);

      setLoading(false);

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
    setLoggedInUser({
      isLoggedIn: false,
      userEmail: null,
    });
  };

  const extendSession = ({ 
    accessToken, 
    refreshToken, 
    userEmail 
  }: LoginResponseDTO & { userEmail: string }) => {
    setLocalStorageItem('accessToken', accessToken);
    setLocalStorageItem('refreshToken', refreshToken);
    setLoggedInUser({
      isLoggedIn: true,
      userEmail,
    });

    setTimeout(silentRefresh, (1800 - 30) * 1000); // 29.5분
  };

  const silentRefresh = async () => {
    try {
      const storedRefreshToken = getLocalStorageItem('refreshToken');

      if(!storedRefreshToken) {
        return logout();
      }

      const decodedRefreshToken = validateToken(storedRefreshToken);

      if(decodedRefreshToken) {
        const accessToken = generateAccessToken(decodedRefreshToken.userId);
        const refreshToken = generateRefreshToken(decodedRefreshToken.userId);

        extendSession({ 
          accessToken, 
          refreshToken, 
          userEmail: decodedRefreshToken.userId, 
        });
      }
    } catch (error) {
      console.log('error', error);
      logout();
    }
  };

  useEffect(() => {
    silentRefresh();
  }, []);

  return { 
    isLoading,
    isLoggedIn: loggedInUser.isLoggedIn,
    loggedInUser: loggedInUser.userEmail,
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