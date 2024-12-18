import { addDoc, collection } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { Comment, CommentStatus } from '@/app/_data/comments.interface';
import { CustomError } from '@/utils/error';

export async function POST(req: Request) {
  try {
    const { 
      userEmail, 
      postId, 
      comment, 
      originalCommentId, 
      depth, 
    } = await req.json();

    const now = new Date().valueOf();

    const newComment: Omit<Comment, 'objectID'> = {
      userEmail,
      postId,
      comment,
      originalCommentId,
      depth,
      status: CommentStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    };

    const commentsRef = await addDoc(
      collection(firestore, 'comments'),
      newComment,
    );

    return NextResponse.json({ 
      status: 200, 
      data: { objectID: commentsRef.id },
    });
  } catch (e: unknown) {
    // TODO 에러 핸들링 처리 디테일하게 하기
    console.log(e);

    if (e instanceof SyntaxError) {
      // 잘못된 JSON 형식 오류 처리
      return NextResponse.json({
        message: '잘못된 요청 형식입니다.',
        status: 400,
      });
    }

    if(e instanceof CustomError) {
      return NextResponse.json({
        message: e.message, 
        status: e.statusCode,
      });
    }

    return NextResponse.json(
      { message: '댓글 작성 중 오류가 발생했습니다.' }, 
      { status: 500 },
    );
  }
}