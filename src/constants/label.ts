import { Category } from '@/app/_data/posts.interface';
import { Ages, Regions, Sexes } from '@/app/_data/users.interface';

export const CategoryLabelRecord: Record<Category, string> = {
  JOB: '직장/일',
  LOVE: '연애',
  FAMILY: '가족',
  PARENTING: '임신/육아',
  RELATIONSHIP: '인간관계',
  SCHOOL: '학교생활',
  CULTURE: '문화생활',
  ETC: '시시콜콜',
};

export const AgeRange: Record<Ages, { name: string, from: number, to: number }>  =  {
  TEENS: { name: '10대', from: 13, to: 19 },
  TWENTIES: { name: '20대', from: 20, to: 29 },
  THIRTIES: { name: '30대', from: 30, to: 39 },
  FORTIES: { name: '40대', from: 40, to: 49 },
  FIFTIES: { name: '50대', from: 50, to: 59 },
  SIXTIES_OVER: { name: '60대 이상', from: 60, to: 200 },
};

export const SexLabelRecord: Record<Sexes, string> = {
  FEMALE: '여성',
  MALE: '남성',
};

export const RegionLabelRecord: Record<Regions, string> = {
  SEOUL: '서울특별시',
  GYEONGGI: '경기도',
  GWANGJU: '광주광역시',
  DAEGU: '대구광역시',
  DAEJEON: '대전광역시',
  BUSAN: '부산광역시',
  INCHEON: '인천광역시',
  ULSAN: '울산광역시',
  SEJONG: '세종특별자치시',
  JEJU: '제주특별자치도',
  GANGWON: '강원도',
  GYEONGSANG: '경상도',
  JEOLLA: '전라도',
  CHUNGCHEONG: '충청도',
};