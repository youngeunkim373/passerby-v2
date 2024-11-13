import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { ulid } from 'ulid';

import users from '@/app/_data/users.json';
import { User } from '@/app/_data/users.interface';
import { CustomError } from '@/utils/error';

export async function POST(req: Request) {
  try {
    const { email, password, age, sex, region } = await req.json();

    const isExisting = (users as User[]).find((user) => {
      return user.email === email && user.status === 'ACTIVE';
    });

    if(isExisting) {
      throw new CustomError(409, '이미 등록된 이메일입니다');
    }

    const filePath = path.join(process.cwd() + '/src/app/_data', 'users.json');
    const now = new Date().valueOf();

    const newUsers: User[] = users as User[];

    const newUser: User = {
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

    newUsers.push(newUser);

    fs.writeFile(filePath, JSON.stringify(newUsers), 'utf8', (err) => {
      if (err) {
        throw new CustomError(500, '회원가입 정보가 올바르지 않습니다.');
      }
    });

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