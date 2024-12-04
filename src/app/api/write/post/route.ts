import { addDoc, collection } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { Post } from '@/app/_data/posts.interface';
import { CustomError } from '@/utils/error';

export async function POST(req: Request) {
  try {
    const { title, category, content, userEmail, imageUrl } = await req.json();

    const now = new Date().valueOf();

    const newPost: Omit<Post, 'objectID'> = {
      title,
      category,
      content,
      imageUrl: imageUrl ?? null,
      views: 0,
      hits: 0,
      postedAt: now,
      updatedAt: now,
      userEmail,
    };

    try {
      const postRef = await addDoc(
        collection(firestore, 'posts'),
        newPost,
      );

      return NextResponse.json({ 
        status: 200, 
        data: { objectID: postRef.id } 
      });
    } catch (error) {
      console.error('Firestore에 저장 중 오류가 발생했습니다:', error);
      throw new CustomError(500, '게시글 작성 정보가 올바르지 않습니다.');
    }
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
      { message: '게시글 작성 중 오류가 발생했습니다.' }, 
      { status: 500 },
    );
  }
}