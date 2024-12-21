import { addDoc, collection } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { Comment, CommentStatus } from '@/app/_data/comments.interface';
import { handleServerError } from '@/utils/error';

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
  } catch (err: unknown) {
    return handleServerError(
      err,
      '댓글 작성 중 오류가 발생했습니다.',
    );
  }
}