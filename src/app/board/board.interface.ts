import { Comment } from '@/app/_data/comments.interface';
import { Encouragement } from '@/app/_data/encouragement_history.interface';
import { Category, Post } from '@/app/_data/posts.interface';
import { Pagination } from '@/hooks/usePagination';

/* -------------------- 게시글 리스트 조회 -------------------- */
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

export interface GetPostsRequestDTO {
  pagination?: Pagination<BoardFilterDTO>;
  sortBy: BoardSortBy;
  userEmail?: Post['userEmail'] | null;
}

export interface GetPostsResponseDTO {
  items: Post[];
  totalCount: number;
}

/* -------------------- 상세 게시글 조회 -------------------- */
export type GetPostResponseDTO = Post;

/* -------------------- 게시글 > 댓글 조회 -------------------- */
export interface CommentFilterDTO {
  postId: Comment['postId'];
}

export interface GetCommentsRequestDTO {
  pagination?: Pagination<CommentFilterDTO>;
  postId: Comment['postId'];
}

export interface GetCommentsResponseDTO {
  items: Comment[];
  totalCount: number;
}

/* -------------------- 댓글 작성 -------------------- */
export type CommentFormDTO = Pick<Comment, 'comment' | 'originalCommentId'>;

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

/* -------------------- 조회수 업데이트 -------------------- */
export interface UpdateViewsRequestDTO {
  postId: Post['objectID'];
}

/* -------------------- 게시글 > 응원 조회 -------------------- */
export interface GetEncouragementRequestDTO {
  userEmail: Encouragement['userEmail'];
  postId: Encouragement['postId'];
}

export type GetEncouragementResponseDTO = Encouragement | null;

/* -------------------- 응원하기 -------------------- */
export interface EncourageRequestDTO {
  userEmail: Encouragement['userEmail'];
  postId: Encouragement['postId'];
}

export type EncourageResponseDTO = Encouragement['status'];