import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { CustomError } from '@/utils/error';

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

export interface DecodedToken {
  exp: number;
  iat: number;
  userId: string;
}

export const validateToken = (token: string) => {
  if (!secretKey) {
    throw new Error('토큰 인증에 실패했습니다.');
  }

  try {
    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    return decodedToken;
  } catch (error) {
    console.log('An error occurs while validating the token: ', error);

    if (error instanceof TokenExpiredError) {
      if (error.name === 'TokenExpiredError') {
        throw new CustomError(403, '토큰이 만료되었습니다.');
      } else {
        console.error('토큰 검증 중 오류 발생:', error.message);
        throw new CustomError(401, '인증되지 않았습니다.');
      }
    }
  }
};

export function generateAccessToken(userId: string): string {
  const randomUserId = new Date().getTime().toString();
  const token = jwt.sign({ userId }, randomUserId, { expiresIn: '30m' });
  return token;
}

export function generateRefreshToken(userId: string): string {
  if (!secretKey) {
    throw new Error('JWT secret is not defined in the environment variables');
  }

  const refreshToken = jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
  return refreshToken;
}
