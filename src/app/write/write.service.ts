import { EditPostRequestDTO, EditPostResponseDTO, RemovePostRequestDTO, RemovePostResponseDTO, WritePostRequestDTO, WritePostResponseDTO } from '@/app/write/write.interface';
import { CustomError, handleAPIError } from '@/utils/error';

/* -------------------- 게시글 작성 -------------------- */ 
export const writePostAPI = async (body: WritePostRequestDTO): Promise<WritePostResponseDTO> => { 
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
    return handleAPIError(err);
  }
};

/* -------------------- 게시글 수정 -------------------- */ 
export const editPostAPI = async (body: EditPostRequestDTO): Promise<EditPostResponseDTO> => { 
  try {
    const res = await fetch('/api/write/post', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if(response.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    return response.data;
  } catch (err) {
    return handleAPIError(err);
  }
};

/* -------------------- 게시글 삭제 -------------------- */ 
export const removePostAPI = async (body: RemovePostRequestDTO): Promise<RemovePostResponseDTO> => { 
  try {
    const res = await fetch('/api/write/post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if(response.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    return response.data;
  } catch (err) {
    return handleAPIError(err);
  }
};

