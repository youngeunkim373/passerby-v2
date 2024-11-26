import { Post } from '@/app/_data/posts.interface';

export interface BoardFilterDTO {
  titleOrContent: string;
}

export interface GetBoardResponseDTO {
  items: Post[];
  totalCount: number;
}