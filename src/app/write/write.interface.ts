import { Post } from '@/app/_data/posts.interface';
import { Category } from '@/constants/post';

export interface WritePostRequestDTO {
  title: string;
  category: Category[];
  content: string;
  imageUrl?: string;
}

export interface WritePostResponseDTO {
  objectID: Post['objectID'];
}
