import { Post } from '@/app/_data/posts.interface';

export interface WritePostRequestDTO {
  title: Post['title'];
  category: Post['category'];
  content: Post['content'];
  imageUrl: Post['imageUrl'];
  userEmail: Post['userEmail'];
}

export interface WritePostResponseDTO {
  objectID: Post['objectID'];
}

export interface EditPostRequestDTO {
  postId: Post['objectID'];
  title: Post['title'];
  category: Post['category'];
  content: Post['content'];
  imageUrl: Post['imageUrl'];
}

export interface EditPostResponseDTO {
  objectID: Post['objectID'];
}