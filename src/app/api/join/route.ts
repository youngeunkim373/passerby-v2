import { addDoc, collection } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { User, UserStatus } from '@/app/_data/users.interface';
import { getActiveUser } from '@/app/api/common/getActiveUser';
import { CustomError, handleServerError } from '@/utils/error';

export async function POST(req: Request) {
  try {
    const { email, password, age, sex, region } = await req.json();

    // 기등록 유저 체크
    const activeUsers = await getActiveUser(email);

    if(activeUsers.length > 0) {
      throw new CustomError(409, '이미 등록된 이메일입니다');
    }

    // 신규 유저 등록
    const now = new Date().valueOf();

    const newData: Omit<User, 'objectID'> = {
      email,
      password,
      age,
      sex,
      region,
      status: UserStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    };

    await addDoc(
      collection(firestore, 'users'),
      newData,
    );

    return NextResponse.json({ status: 200 });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '회원가입 중 오류가 발생했습니다.',
    );
  }
}