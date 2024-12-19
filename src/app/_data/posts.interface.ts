export enum Category {
  JOB = 'JOB',
  LOVE = 'LOVE',
  FAMILY = 'FAMILY',
  PARENTING = 'PARENTING',
  RELATIONSHIP = 'RELATIONSHIP',
  SCHOOL = 'SCHOOL',
  CULTURE = 'CULTURE',
  ETC = 'ETC',
};

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