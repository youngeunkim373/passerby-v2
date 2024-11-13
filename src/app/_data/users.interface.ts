import { Regions } from '@/constants/user';
import { AgeType, SexType } from '@/app/join/join.interface';

type UserStatus = 'ACTIVE' | 'DELETED';

export interface User {
  id: string;
  email: string;
  password: string;
  age: AgeType; 
  sex: SexType;
  region: Regions;
  status: UserStatus;
  createdAt: number;
  updatedAt: number;
}
