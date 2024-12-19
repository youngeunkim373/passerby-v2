import { Ages, Regions, Sexes } from '@/app/_data/users.interface';

export interface JoinRequestDTO {
  email: string;
  password: string;
  nickname: string;
  age: Ages;
  sex: Sexes;
  region: Regions;
}

export interface SendVerificationEmailDTO extends JoinRequestDTO {
  passwordCheck: string;
}
