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