import { ageRange, Regions } from '@/constants/user';

export type AgeType = keyof typeof ageRange;
export type SexType = 'male' | 'female';

export interface JoinRequestDTO {
  email: string;
  password: string;
  nickname: string;
  age: AgeType;
  sex: SexType;
  region: Regions;
}
