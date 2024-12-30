import { Ages, Regions, Sexes } from '@/app/_data/users.interface';

export type JoinFormDTO = JoinRequestDTO & { passwordCheck: string };

export interface JoinRequestDTO {
  email: string;
  password: string;
  // TODO 마이페이지 기능 개발할 때 활성화
  // nickname: string;
  age: Ages;
  sex: Sexes;
  region: Regions;
}

export type SendVerificationEmailDTO = JoinFormDTO;
