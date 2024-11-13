export enum EmailTemplateIds {
  VERIFICATION = 'VERIFICATION',
}

export interface SentEmail {
  id: string;
  templateId: EmailTemplateIds;
  from: string;
  to: string;
  result: 'SUCCESS' | 'FAIL';
  sentAt: number;
  content?: Record<string, any>;
}