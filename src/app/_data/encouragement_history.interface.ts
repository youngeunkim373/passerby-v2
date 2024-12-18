import { Post } from '@/app/_data/posts.interface';
import { User } from '@/app/_data/users.interface';

export enum EncouragementStatus {
  AGREE = 'AGREE',
  CANCEL = 'CANCEL',
};

export interface Encouragement {
  objectID: string;
  userEmail: User['email'];
  postId: Post['objectID'];
  status: EncouragementStatus;
  createdAt: number;
  updatedAt: number;
}
