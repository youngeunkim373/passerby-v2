import { NextResponse } from 'next/server';

// TODO 에러 핸들링 처리 섬세하게 하기
export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleAPIError = (err: unknown) => {
  console.error('An error occurs: ', err);

  if(err instanceof CustomError) {
    throw new CustomError(err.statusCode, err.message);
  }

  throw err; 
};

export const handleServerError = (
  err: unknown, 
  messageFor500: string,
) => {
  // TODO 에러 핸들링 처리 디테일하게 하기
  console.log(err);

  // 잘못된 JSON 형식 오류 처리
  if (err instanceof SyntaxError) {
    return NextResponse.json({
      message: '잘못된 요청 형식입니다.',
      status: 400,
    });
  }

  if(err instanceof CustomError) {
    return NextResponse.json({
      message: err.message, 
      status: err.statusCode,
    });
  }

  return NextResponse.json(
    { message: messageFor500 }, 
    { status: 500 },
  );
};