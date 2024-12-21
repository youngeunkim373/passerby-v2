export enum EmailTemplateIds {
  VERIFICATION = 'VERIFICATION',
}

export interface SentEmailHistory {
  objectID: string;
  templateId: EmailTemplateIds;
  from: string;
  to: string;
  result: 'SUCCESS' | 'FAIL';
  sentAt: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: Record<string, any> | null;
}