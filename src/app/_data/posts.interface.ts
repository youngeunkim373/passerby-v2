import { Category } from '@/constants/post';

export interface Post {
  objectID: string;
  imageUrl?: string;
  title: string;
  category: Category[];
  content: string;
  views: number;
  hits: number;
  postedAt: number;
  updatedAt: number;
  userEmail: string;
}