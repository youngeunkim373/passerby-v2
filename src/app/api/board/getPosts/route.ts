import { searchClient } from 'algolia';
import { NextResponse } from 'next/server';

import { BoardSortBy } from '@/app/board/board.interface';
import { CustomError, handleServerError } from '@/utils/error';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const size = searchParams.get('size');
    const titleOrContent = searchParams.get('titleOrContent');
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy');
    const userEmail = searchParams.get('userEmail');

    if(!page || !size) {
      throw new CustomError(404, '잘못된 요청입니다');
    }

    const parsedPage = parseInt(page, 10);
    const parsedSize = parseInt(size, 10);

    const filters = [
      ...(category ? [ `category:"${category}"` ] : []),
      ...(userEmail ? [ `userEmail:"${decodeURIComponent(userEmail)}"` ] : []),
    ].join(' AND ');

    const initIndex = (sortBy && Object.values(BoardSortBy).includes(sortBy  as BoardSortBy)) 
      ? sortBy 
      : BoardSortBy.POSTEDAT;

    const results = await searchClient
      .initIndex(initIndex)
      .search(titleOrContent ?? '', {
        filters,
        hitsPerPage: parsedSize,
        page: parsedPage - 1,
        typoTolerance: false,
      });

    return NextResponse.json({ 
      status: 200, 
      data: { items: results.hits, totalCount: results.nbHits }
    });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '게시글 목록 로드 중 오류가 발생했습니다.',
    );
  }
}