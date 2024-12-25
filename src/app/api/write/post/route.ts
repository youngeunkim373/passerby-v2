import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { Post } from '@/app/_data/posts.interface';
import { handleServerError } from '@/utils/error';
import { formatDate } from '@/utils/time';

export async function POST(req: Request) {
  try {
    const { title, category, content, userEmail, imageUrl } = await req.json();

    const date = new Date();
    const now = date.valueOf();

    const newPost: Omit<Post, 'objectID'> = {
      title,
      category,
      content,
      imageUrl: imageUrl ?? null,
      views: 0,
      hits: 0,
      postedAt: now,
      postedDate: formatDate(date),
      updatedAt: now,
      userEmail,
    };

    const postRef = await addDoc(
      collection(firestore, 'posts'),
      newPost,
    );

    return NextResponse.json({ 
      status: 200, 
      data: { objectID: postRef.id } 
    });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '게시글 작성 중 오류가 발생했습니다.',
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { postId, title, category, content, imageUrl } = await req.json();

    const editedPost: Pick<Post, 'title' | 'category' | 'content' | 'imageUrl' | 'updatedAt'> = {
      title,
      category,
      content,
      imageUrl: imageUrl ?? null,
      updatedAt: new Date().valueOf(),
    };

    const postRef = doc(firestore, 'posts', postId);

    // 문서 업데이트
    updateDoc(postRef, editedPost);

    return NextResponse.json({ 
      status: 200, 
      data: { objectID: postRef.id } 
    });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '게시글 수정 중 오류가 발생했습니다.',
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { postId } = await req.json();

    const postRef = doc(firestore, 'posts', postId);

    await deleteDoc(postRef);

    return NextResponse.json({ 
      status: 200, 
      data: { objectID: postRef.id } 
    });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '게시글 삭제 중 오류가 발생했습니다.',
    );
  }
}