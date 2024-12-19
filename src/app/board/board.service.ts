'use client';
import { EncourageRequestDTO, EncourageResponseDTO, GetCommentsRequestDTO, GetCommentsResponseDTO, GetEncouragementRequestDTO, GetEncouragementResponseDTO, GetPostResponseDTO, GetPostsRequestDTO, GetPostsResponseDTO, UpdateViewsRequestDTO, WriteCommentRequestDTO, WriteCommentResponseDTO } from '@/app/board/board.interface';
import { CustomError, handleAPIError } from '@/utils/error';

/* -------------------- 게시글 리스트 조회 -------------------- */ 
export const getPostsAPI = async ({ 
  pagination, 
  sortBy, 
  userEmail, 
}: GetPostsRequestDTO): Promise<GetPostsResponseDTO> => {
  try {
    const params = new URLSearchParams({ 
      page: (pagination?.page ?? '').toString(),
      size: (pagination?.size ?? '').toString(),
      titleOrContent: pagination?.filter?.titleOrContent ?? '',
      category: pagination?.filter?.category ?? '',
      sortBy,
      userEmail: userEmail ?? '',
    });
  
    const url = `/api/board/getPosts?${params.toString()}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await res.json();

    if(res.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    return response.data;
  } catch (err) {
    return handleAPIError(err);
  }
};

/* -------------------- 게시글 상세 조회 -------------------- */ 
export const getPostAPI = async (postId: string): Promise<GetPostResponseDTO> => {
  try {
    const params = new URLSearchParams({ postId: postId.toString() });

    const res = await fetch(`/api/board/post?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await res.json();

    if(res.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    if(!response.data) {
      throw new CustomError(404, '요청하신 게시글 정보가 없습니다.');
    }

    return response.data;
  } catch (err) {
    return handleAPIError(err);
  }
};

/* -------------------- 댓글 조회 -------------------- */ 
export const getCommentsAPI = async ({ 
  pagination, 
  postId,
}: GetCommentsRequestDTO): Promise<GetCommentsResponseDTO> => {
  try {
    const params = new URLSearchParams({ 
      page: (pagination?.page ?? '').toString(),
      size: (pagination?.size ?? '').toString(),
      postId: postId.toString(),
    });
    
    const res = await fetch(`/api/board/getComments?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await res.json();

    if(res.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    if(!response.data) {
      throw new CustomError(404, '요청하신 게시글 댓글 정보가 없습니다.');
    }

    return response.data;
  } catch (err) {
    return handleAPIError(err);
  }
};

/* -------------------- 댓글 작성 -------------------- */ 
export const writeCommentAPI = async (body: WriteCommentRequestDTO): Promise<WriteCommentResponseDTO> => { 
  try {
    const res = await fetch('/api/write/comment', {
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

/* -------------------- 조회수 업데이트 -------------------- */ 
export const updateViewsAPI = async (body: UpdateViewsRequestDTO) => { 
  try {
    const res = await fetch('/api/board/post', {
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

/* -------------------- 게시글 > 응원 조회 -------------------- */ 
export const getEncouragementAPI = async ({ 
  userEmail, 
  postId, 
}: GetEncouragementRequestDTO): Promise<GetEncouragementResponseDTO> => {
  try {
    const params = new URLSearchParams({ userEmail, postId });

    const res = await fetch(`/api/board/encouragement?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await res.json();

    if(res.status !== 200) {
      throw new CustomError(response.status, response.message);
    }
    
    return response.data as GetEncouragementResponseDTO;
  } catch (err) {
    return handleAPIError(err);
  }
};

/* -------------------- 응원하기 -------------------- */ 
export const encourageAPI = async (body: EncourageRequestDTO): Promise<EncourageResponseDTO> => { 
  try {
    const res = await fetch('/api/board/encouragement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if(response.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    return response.data as EncourageResponseDTO;
  } catch (err) {
    return handleAPIError(err);
  }
};