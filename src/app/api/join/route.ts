import { addDoc, collection } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';
import { ulid } from 'ulid';

import { User } from '@/app/_data/users.interface';
import { getActiveUser } from '@/app/api/common/getActiveUser';
import { CustomError } from '@/utils/error';

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

    const newData: User = {
      id: ulid(),
      email,
      password,
      age,
      sex,
      region,
      status: 'ACTIVE',
      createdAt: now,
      updatedAt: now,
    };

    try {
      await addDoc(
        collection(firestore, 'users'),
        newData,
      );
    } catch (error) {
      console.error('Firestore에 저장 중 오류가 발생했습니다:', error);
      throw new CustomError(500, '회원가입 정보가 올바르지 않습니다.');
    }

    return NextResponse.json({ status: 200 });
  } catch (e: unknown) {
    // TODO 에러 핸들링 처리 디테일하게 하기
    console.log(e);

    if(e instanceof CustomError) {
      return NextResponse.json({
        message: e.message, 
        status: e.statusCode,
      });
    }

    return NextResponse.json(
      { message: '회원가입 중 오류가 발생했습니다.' }, 
      { status: 500 },
    );
  }
}