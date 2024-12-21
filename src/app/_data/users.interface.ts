export enum Ages {
  TEENS = 'TEENS',
  TWENTIES = 'TWENTIES',
  THIRTIES = 'THIRTIES',
  FORTIES = 'FORTIES',
  FIFTIES = 'FIFTIES',
  SIXTIES_OVER = 'SIXTIES_OVER',
};

export enum Sexes {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
};

export enum Regions {
  SEOUL = 'SEOUL',
  GYEONGGI = 'GYEONGGI',
  GWANGJU = 'GWANGJU',
  DAEGU = 'DAEGU',
  DAEJEON = 'DAEJEON',
  BUSAN = 'BUSAN',
  INCHEON = 'INCHEON',
  ULSAN = 'ULSAN',
  SEJONG = 'SEJONG',
  JEJU = 'JEJU',
  GANGWON = 'GANGWON',
  GYEONGSANG = 'GYEONGSANG',
  JEOLLA = 'JEOLLA',
  CHUNGCHEONG = 'CHUNGCHEONG',
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
};

export interface User {
  objectID: string;
  email: string;
  password: string;
  age: Ages; 
  sex: Sexes;
  region: Regions;
  status: UserStatus;
  createdAt: number;
  updatedAt: number;
}
