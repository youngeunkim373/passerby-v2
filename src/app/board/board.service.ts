'use client';
import { Post } from '@/app/_data/posts.interface';
import { BoardFilterDTO, BoardSortBy, GetBoardResponseDTO, GetPostResponseDTO, WriteCommentRequestDTO, WriteCommentResponseDTO } from '@/app/board/board.interface';
import { Pagination } from '@/hooks/usePagination';
import { CustomError } from '@/utils/error';

interface Props {
  pagination?: Pagination<BoardFilterDTO>;
  sortBy: BoardSortBy;
  userEmail?: Post['userEmail'] | null;
}

/* -------------------- 게시글 리스트 조회 -------------------- */ 
export const getPosts = async ({ pagination, sortBy, userEmail }: Props) => {
  const params = new URLSearchParams({ 
    page: (pagination?.page ?? '').toString(),
    size: (pagination?.size ?? '').toString(),
    titleOrContent: pagination?.filter?.titleOrContent ?? '',
    category: pagination?.filter?.category ?? '',
    sortBy,
    userEmail: userEmail ?? '',
  });

  const url = `/api/board/getPosts?${params.toString()}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await res.json();

    if(res.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    return response.data as GetBoardResponseDTO;
  } catch (err) {
    console.error('An error occurs: ', err);

    if(err instanceof CustomError) {
      throw new CustomError(err.statusCode, err.message);
    }

    throw err; 
  }
};

/* -------------------- 게시글 상세 조회 -------------------- */ 
export const getPost = async (postId: string) => {
  const params = new URLSearchParams({ postId: postId.toString() });

  try {
    const res = await fetch(`/api/board/getPost?${params.toString()}`, {
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

    return response.data as GetPostResponseDTO;
  } catch (err) {
    console.error('An error occurs: ', err);

    if(err instanceof CustomError) {
      throw new CustomError(err.statusCode, err.message);
    }

    throw err; 
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
    console.error('An error occurs: ', err);

    if(err instanceof CustomError) {
      throw new CustomError(err.statusCode, err.message);
    }

    throw err; 
  }
};