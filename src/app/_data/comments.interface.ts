import { Post } from '@/app/_data/posts.interface';
import { User } from '@/app/_data/users.interface';

export enum CommentStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
};

export interface Comment {
  objectID: string;
  userEmail: User['email'];
  postId: Post['objectID'];
  comment: string;
  originalCommentId: string | null;
  depth: number;
  status: CommentStatus;
  createdAt: number;
  updatedAt: number;
  nestedComments?: Comment[];
}
