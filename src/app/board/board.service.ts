'use client';
import { BoardFilterDTO, GetBoardResponseDTO } from '@/app/board/board.interface';
import { Pagination } from '@/hooks/usePagination';
import { CustomError } from '@/utils/error';

// 게시글 조회
export const getPosts = async ({
  filter, 
  page, 
  size,
}: Pagination<BoardFilterDTO>) => {
  const params = new URLSearchParams({ 
    page: page.toString(),
    size: size.toString(),
    titleOrContent: filter?.titleOrContent ?? '',
    category: filter?.category ?? '',
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
