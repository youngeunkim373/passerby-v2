import { addDoc, collection, getDocs, limit, query, where } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { LoginHistory } from '@/app/_data/login_history.interface';
import { CustomError, handleServerError } from '@/utils/error';
import { generateAccessToken, generateRefreshToken } from '@/utils/token';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 로그인 시도한 유저 정보 찾기
    const usersRef = collection(firestore, 'users');

    const q = query(
      usersRef,
      where('email', '==', email),
      where('password', '==', password),
      where('status', '==', 'ACTIVE'),
      limit(1),
    );
  
    const activeUserSnapshot = await getDocs(q);
  
    if (activeUserSnapshot.empty) {
      throw new CustomError(401, '로그인 정보가 올바르지 않습니다');
    }

    // accessToken, refreshToken 생성
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);

    // 유저 로그인 이력 저장
    const now = new Date().valueOf();

    const newLoginHistory: LoginHistory = {
      userEmail: email,
      accessToken,
      refreshToken,
      accessExpiresAt: new Date(Date.now() + 1800 * 1000).valueOf(), // 30분 후
      refreshExpiresAt: new Date(Date.now() + 24 * 3600 * 1000).valueOf(), // 1일 후
      createdAt: now,
      updatedAt: now,
    };

    await addDoc(
      collection(firestore, 'login_history'),
      newLoginHistory,
    );

    return NextResponse.json({ 
      status: 200,
      data: { accessToken, refreshToken },
    });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '로그인 중 오류가 발생했습니다.',
    );
  }
}