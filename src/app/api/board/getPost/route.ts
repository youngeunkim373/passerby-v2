import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { CustomError } from '@/utils/error';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if(!postId) {
      throw new CustomError(404, '잘못된 요청입니다');
    }
    
    const postRef = doc(firestore, 'posts', postId);

    // 조회수 업데이트
    updateDoc(postRef, { views: increment(1) });

    const postSnapshot = await getDoc(postRef);
  
    if (!postSnapshot.exists) {
      throw new CustomError(404, '잘못된 요청입니다');
    }
  
    return NextResponse.json({ 
      status: 200, 
      data: postSnapshot.data(),
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