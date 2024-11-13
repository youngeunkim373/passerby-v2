import { writeFile } from 'fs';
import path from 'path';
import { ulid } from 'ulid';

import { SentEmail } from '@/app/_data/sent_emails.interface';
import sentEmails from '@/app/_data/sent_emails.json';
import { CustomError } from '@/utils/error';

type SaveSendEmailHistoryProps = Pick<SentEmail, 'templateId' | 'to' | 'result' | 'content'>;

export const saveSendEmailHistory = async ({ 
  templateId,
  to, 
  result, 
  content,
}: SaveSendEmailHistoryProps) => {
  const filePath = path.join(process.cwd() + '/src/app/_data', 'sent_emails.json');
  const now = new Date().valueOf();

  const newSentEmails = sentEmails as SentEmail[];

  const newData: SentEmail = {
    id: ulid(),
    templateId,
    from: 'youngeunkim373@gmail.com',
    to,
    result,
    sentAt: now,
    content,
  };

  newSentEmails.push(newData);

  writeFile(filePath, JSON.stringify(newSentEmails), 'utf8', (err) => {
    if (err) {
      throw new CustomError(500, '메일 전송 이력 저장 중 오류가 발생했습니다.');
    }
  });
};
