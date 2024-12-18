import { searchClient } from 'algolia';
import { NextResponse } from 'next/server';

import { Comment } from '@/app/_data/comments.interface';
import { CustomError } from '@/utils/error';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const size = searchParams.get('size');
    const postId = searchParams.get('postId');
    
    if(!page || !size || !postId) {
      throw new CustomError(404, '잘못된 요청입니다');
    }

    const parsedPage = parseInt(page, 10);
    const parsedSize = parseInt(size, 10);

    const commentResults = await searchClient
      .initIndex('comments_createdAt_desc')
      .search('', {
        filters: `postId:"${postId}" AND depth:1`, 
        hitsPerPage: parsedSize,
        page: parsedPage - 1,
        typoTolerance: false,
      });

    const originalCommentIds = commentResults.hits.map((comment) => comment.objectID);

    const nestedCommentFilters = originalCommentIds.length > 0
      ? `(${originalCommentIds.map((id) => `originalCommentId:"${id}"`).join(' OR ')}) AND depth:2`
      : 'depth:2';

    const nestedCommentResults = await searchClient
      .initIndex('comments_createdAt_desc')
      .search('', {
        filters: nestedCommentFilters,
        typoTolerance: false,
      }) as { hits: Comment[] };

    const items = commentResults.hits.map((comment) => ({
      ...comment,
      nestedComments: nestedCommentResults.hits.filter((hit) => hit.originalCommentId === comment.objectID),
    }));

    return NextResponse.json({ 
      status: 200, 
      data: { items, totalCount: commentResults.nbHits },
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