import { Ages, Regions, Sexes } from '@/app/_data/users.interface';

export type JoinFormDTO = JoinRequestDTO & { passwordCheck: string };

export interface JoinRequestDTO {
  email: string;
  password: string;
  nickname: string;
  age: Ages;
  sex: Sexes;
  region: Regions;
}

export type SendVerificationEmailDTO = JoinFormDTO;
