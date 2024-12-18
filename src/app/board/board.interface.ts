import { Comment } from '@/app/_data/comments.interface';
import { Encouragement } from '@/app/_data/encouragement_history.interface';
import { Post } from '@/app/_data/posts.interface';
import { Category } from '@/constants/post';

export interface BoardFilterDTO {
  titleOrContent?: string;
  category?: Category | null;
  userEmail?: Post['userEmail'];
}

export enum BoardSortBy {
  POSTEDAT = 'posts_postedAt_desc',
  VIEWS = 'posts_views_desc',
  HITS = 'posts_hits_desc',
}

export interface GetBoardResponseDTO {
  items: Post[];
  totalCount: number;
}

export type GetPostResponseDTO = Post;

export interface WriteCommentRequestDTO {
  userEmail: Comment['userEmail'];
  postId: Comment['postId']
  comment: Comment['comment'];
  originalCommentId: Comment['originalCommentId'];
  depth: Comment['depth'];
}

export interface WriteCommentResponseDTO {
  objectID: Comment['objectID'];
}

export interface CommentFilterDTO {
  postId: Comment['postId'];
}

export interface GetCommentsResponseDTO {
  items: Comment[];
  totalCount: number;
}

export type CommentFormDTO = Pick<Comment, 'comment' | 'originalCommentId'>;

export interface UpdateViewsRequestDTO {
  postId: Post['objectID'];
}

export interface GetEncouragementRequestDTO {
  userEmail: Encouragement['userEmail'];
  postId: Encouragement['postId'];
}

export type GetEncouragementResponseDTO = Encouragement | null;

export interface EncourageRequestDTO {
  userEmail: Encouragement['userEmail'];
  postId: Encouragement['postId'];
}

export type EncourageResponseDTO = Encouragement['status'];