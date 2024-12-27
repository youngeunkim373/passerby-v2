import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { EmailTemplateIds } from '@/app/_data/sent_email_history.interface';
import { getActiveUser } from '@/app/api/common/getActiveUser';
import { saveSendEmailHistory } from '@/app/api/common/saveSendEmailHistory';
import { joinEmailVerificationTemplate } from '@/constants/emailTemplate';
import { sendEmail } from '@/utils/email';
import { CustomError } from '@/utils/error';
import { encryptObjectToUrl } from '@/utils/url';

const jwtSecretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(req: Request) {
  let email = '';

  try {
    if(!jwtSecretKey) {
      throw new CustomError(500, '이메일 본인인증 메일 전송 중 오류가 발생했습니다.');
    }

    const { email: reqEmail, ...otherValues } = await req.json();
    email = reqEmail;

    // 기등록 유저 체크
    const activeUsers = await getActiveUser(email);

    if(activeUsers.length > 0) {
      throw new CustomError(409, '이미 등록된 이메일입니다');
    }

    // 본인인증 url 생성
    const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: '3m' });

    // 암호화
    const encryptedUserInfoUrl = encryptObjectToUrl({ email, ...otherValues });
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/join?token=${token}&content=${encryptedUserInfoUrl}`;

    // 본인인증 이메일 전송
    const emailTemplate = joinEmailVerificationTemplate({ verificationUrl });
    await sendEmail({ to: [ email ],  ...emailTemplate });

    // 메일 전송 성공 이력 데이터 저장
    await saveSendEmailHistory({
      templateId: EmailTemplateIds.VERIFICATION,
      to: email,
      result: 'SUCCESS',
      content: { email, ...otherValues },
    });

    return NextResponse.json({ status: 200 });
  } catch (e: unknown) {
    // TODO 에러 핸들링 처리 디테일하게 하기
    console.log(e);

    // 메일 전송 실패 이력 데이터 저장
    await saveSendEmailHistory({
      templateId: EmailTemplateIds.VERIFICATION,
      to: email,
      result: 'FAIL',
    });

    if(e instanceof CustomError) {
      return NextResponse.json({
        message: e.message, 
        status: e.statusCode,
      });
    }

    return NextResponse.json(
      { message: '이메일 본인인증 메일 전송 중 오류가 발생했습니다.' }, 
      { status: 500 },
    );
  }
}