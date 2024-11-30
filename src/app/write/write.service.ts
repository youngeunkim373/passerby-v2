import { WritePostRequestDTO, WritePostResponseDTO } from '@/app/write/write.interface';
import { CustomError } from '@/utils/error';

/* -------------------- 게시글 작성 -------------------- */ 
export const writePost = async (body: WritePostRequestDTO): Promise<WritePostResponseDTO> => { 
  try {
    const res = await fetch('/api/write/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if(response.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    return response.data;
  } catch (err) {
    console.error('An error occurs: ', err);

    if(err instanceof CustomError) {
      throw new CustomError(err.statusCode, err.message);
    }

    throw err; 
  }
};