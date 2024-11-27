interface MenuItem {
  title: string,
  path: string,
}

export const items: MenuItem[] = [
  // 추천수 많은 글
  {
    title: '인기 길거리',
    path: '/board/hits',
  },
  // 조회수 많은 글
  {
    title: '뜨는 길거리',
    path: '/board/views',
  },
  // 새로 올라온 글
  {
    title: '신규 길거리',
    path: '/board/latest',
  }
];