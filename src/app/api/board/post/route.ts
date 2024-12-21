import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { CustomError, handleServerError } from '@/utils/error';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if(!postId) {
      throw new CustomError(404, '잘못된 요청입니다');
    }
    
    const postRef = doc(firestore, 'posts', postId);
    const postSnapshot = await getDoc(postRef);
  
    if (!postSnapshot.exists) {
      throw new CustomError(404, '잘못된 요청입니다');
    }
  
    return NextResponse.json({ 
      status: 200, 
      data: postSnapshot.data(),
    });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '게시글 로드 중 오류가 발생했습니다.',
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { postId } = await req.json();

    if(!postId) {
      throw new CustomError(404, '잘못된 요청입니다');
    }
    
    const postRef = doc(firestore, 'posts', postId);

    updateDoc(postRef, { views: increment(1) });
  
    return NextResponse.json({ status: 200 });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '게시글 조회수 업데이트 중 오류가 발생했습니다.',
    );
  }
}