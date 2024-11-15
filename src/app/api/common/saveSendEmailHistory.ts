import { addDoc, collection } from 'firebase/firestore';
import firestore from 'firestore';
import { ulid } from 'ulid';

import { SentEmailHistory } from '@/app/_data/sent_email_history.interface';
import { CustomError } from '@/utils/error';

type SaveSendEmailHistoryProps = Pick<SentEmailHistory, 'templateId' | 'to' | 'result' | 'content'>;

export const saveSendEmailHistory = async ({ 
  templateId,
  to, 
  result, 
  content,
}: SaveSendEmailHistoryProps) => {
  const now = new Date().valueOf();

  const newData: SentEmailHistory = {
    id: ulid(),
    templateId,
    from: 'youngeunkim373@gmail.com',
    to,
    result,
    sentAt: now,
    content: content ?? null,
  };

  try {
    await addDoc(
      collection(firestore, 'sent_email_history'),
      newData,
    );
  } catch (error) {
    console.error('Firestore에 저장 중 오류가 발생했습니다:', error);
    throw new CustomError(500, '메일 전송 이력 저장 중 오류가 발생했습니다.');
  }
};
