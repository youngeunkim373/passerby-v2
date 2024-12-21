import { addDoc, collection, doc, getDocs, increment, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import firestore from 'firestore';
import { NextResponse } from 'next/server';

import { Encouragement, EncouragementStatus } from '@/app/_data/encouragement_history.interface';
import { CustomError, handleServerError } from '@/utils/error';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const userEmail = searchParams.get('userEmail');

    if(!postId || !userEmail) {
      throw new CustomError(404, '잘못된 요청입니다');
    }

    const encouragementRef = collection(firestore, 'encouragement_history');

    const q = query(
      encouragementRef,
      where('postId', '==', postId),
      where('userEmail', '==', userEmail),
      orderBy('createdAt', 'desc'),
      limit(1),
    );

    const encouragementSnapshot = await getDocs(q);

    return NextResponse.json({ 
      status: 200, 
      data: encouragementSnapshot.docs[0]?.data() ?? null,
    });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '게시글 응원 정보 로드 중 오류가 발생했습니다.',
    );
  }
}

export async function POST(req: Request) {
  try {
    const { postId, userEmail } = await req.json();

    // 최신 응원 이력 조회
    const encouragementRef = collection(firestore, 'encouragement_history');

    const q = query(
      encouragementRef,
      where('postId', '==', postId),
      where('userEmail', '==', userEmail),
      orderBy('createdAt', 'desc'),
      limit(1),
    );

    const encouragementSnapshot = await getDocs(q);
    const encouragementStatus: EncouragementStatus = encouragementSnapshot.docs[0]?.data().status;

    const newStatus = encouragementStatus !== EncouragementStatus.AGREE 
      ? EncouragementStatus.AGREE 
      : EncouragementStatus.CANCEL;

    // 응원 이력 남기기
    const now = new Date().valueOf();

    const newEncouragement: Omit<Encouragement, 'objectID'> = {
      userEmail,
      postId,
      status: newStatus,
      createdAt: now,
      updatedAt: now,
    };

    await addDoc(
      collection(firestore, 'encouragement_history'),
      newEncouragement,
    );

    // 게시글 응원수 +1 하기
    const postRef = doc(firestore, 'posts', postId);

    await updateDoc(postRef, { 
      hits: encouragementStatus === EncouragementStatus.AGREE 
        ? increment(-1)
        : increment(1)
    });

    return NextResponse.json({ 
      status: 200,
      data: newStatus,
    });
  } catch (err: unknown) {
    return handleServerError(
      err,
      '게시글 응원하기 중 오류가 발생했습니다.',
    );
  }
}