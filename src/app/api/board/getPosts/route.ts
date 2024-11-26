import { searchClient } from 'algolia';
import { NextResponse } from 'next/server';

import { CustomError } from '@/utils/error';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const size = searchParams.get('size');
    const titleOrContent = searchParams.get('titleOrContent');
    const category = searchParams.get('category');

    if(!page || !size) {
      throw new CustomError(404, '잘못된 요청입니다');
    }

    const parsedPage = parseInt(page, 10);
    const parsedSize = parseInt(size, 10);

    const filters = [
      ...(titleOrContent ? [ `(title:"${titleOrContent}" OR content:"${titleOrContent}")` ] : []),
      ...(category ? [ `category:"${category}"` ] : []),
    ].join(' AND ');

    const results = await searchClient
      .initIndex('posts_postedAt_desc')
      .search('', {
        filters,
        hitsPerPage: parsedSize,
        page: parsedPage - 1,
        typoTolerance: 'min',
      });

    return NextResponse.json({ 
      status: 200, 
      data: { items: results.hits, totalCount: results.nbHits }
    });
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
      { message: '게시글 로드 중 오류가 발생했습니다.' }, 
      { status: 500 },
    );
  }
}