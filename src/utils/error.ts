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
