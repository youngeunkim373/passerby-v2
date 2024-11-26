interface MenuItem {
  title: string,
  path: string,
}

export const items: MenuItem[] = [
  // 추천수 많은 글
  {
    title: '추천 길거리',
    path: '/',
  },
  // 조회수 많은 글
  {
    title: '인기 길거리',
    path: '/',
  },
  // 새로 올라온 글
  {
    title: '신규 길거리',
    path: '/board/latest',
  }
];