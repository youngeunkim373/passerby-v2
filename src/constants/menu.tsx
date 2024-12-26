interface MenuItem {
  title: string,
  path: string,
}

export const items: MenuItem[] = [
  {
    title: '최다 응원 고민',
    path: '/board/hits',
  },
  {
    title: '최다 조회 고민',
    path: '/board/views',
  },
  {
    title: '신규 고민',
    path: '/board/latest',
  }
];