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

export const CategoryLabelRecord: Record<Category, string> ={
  JOB: '직장/일',
  LOVE: '연애',
  FAMILY: '가족',
  PARENTING: '임신/육아',
  RELATIONSHIP: '인간관계',
  SCHOOL: '학교생활',
  CULTURE: '문화생활',
  ETC: '시시콜콜',
};