import { Post } from '@/app/_data/posts.interface';
import { Category } from '@/constants/post';

export interface BoardFilterDTO {
  titleOrContent?: string;
  category?: Category;
}

export interface GetBoardResponseDTO {
  items: Post[];
  totalCount: number;
}