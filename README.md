![header](https://capsule-render.vercel.app/api?type=transparent&color=7a37ff&height=220&section=header&text=길%20가는%20사람들&fontSize=80&fontColor=7a37ff&desc=Passersby&descSize=30&descAlign=71&descAlignY=74)
<br/><br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: 길 가는 사람들
- 프로젝트 설명: 유저들끼지 자유롭게 고민과 답변을 올릴 수 있는 고민 공유 플랫폼
- 링크: https://passersby.vercel.app/
<br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/775884c3-7ff8-4bb1-a3a3-8cd13121a01f" width="300" />
</p>

<br/>

# 2. Team Members (팀원 및 팀 소개)
| 김영은 |
|:------:|
| <img src="https://github.com/user-attachments/assets/cc63306b-78a3-4d76-81c1-36d7f269d78d" alt="이동규" width="150"> |
| FE, BE |

<br/>

# 3. Key Features (주요 기능)
- **회원가입**:
  - 회원가입 시 이메일 본인 인증 기능
  - 회원가입
  - [[상세 정보](https://www.notion.so/16d5b31f3f5180948553d6515a583eb3?pvs=4#16d5b31f3f5180278555cd164a8950ba)]
  
- **로그인**:
  - 사용자 인증 정보를 통해 로그인
  - 로그아웃
  - Silient refresh
  - [[상세 정보](https://www.notion.so/16d5b31f3f5180948553d6515a583eb3?pvs=4#16d5b31f3f518079a6dccb2f501c68a1)]

- **게시글 리스트 조회**:
  - 제목 + 내용, 카테고리를 기반으로 한 게시글 검색
  - 게시글 리스트 조회
  - 체크박스를 통해 종료되거나 이미 수행한 일정을 표시할 수 있습니다.
  - [[상세 정보](https://www.notion.so/16d5b31f3f5180948553d6515a583eb3?pvs=4#16d5b31f3f518079a6dccb2f501c68a1)]

- **게시글 작성**:
  - 에디터를 활용해 게시글 작성
  - 게시글 수정/삭제

- **게시글 상세 조회**:
  - 상세 게시글 조회
  - 댓글/대댓글 작성
  - 응원하기(좋아요) 

<br/>

# 4. Technology Stack (기술 스택)
## 4.1 Language
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" width="100"> 

<br/>

## 4.2 Frotend
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="NextJS" width="100">
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" width="100">
<img src="https://img.shields.io/badge/StyleX-black?style=for-the-badge&logoColor=white" alt="TailwindCSS" width="100">
<img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" alt="Storybook" width="100">
<img src="https://img.shields.io/badge/Chromatic-FC521F?style=for-the-badge&logo=chromatic&logoColor=white" alt="Chromatic" width="100">

<br/>

## 4.3 Backend
<img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" width="100">
<img src="https://img.shields.io/badge/Algolia-003DFF?style=for-the-badge&logo=algolia&logoColor=white" alt="Algolia" width="100">

<br/>

## 4.4 Cooperation
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" width="100">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" width="100">
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white" alt="Jira" width="100">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Jira" width="100">

<br/>

# 5. Project Structure (프로젝트 구조)
```plaintext
project/
├── src/
│   ├── app/                 # 라우팅, 도메인 종속 컴포넌트
|   │   ├── _data            # Entity DTO
|   │   ├── api              # 도메인별 API
|   │   ├── board            # 게시글 리스트 페이지, 상세 페이지
|   │   ├── home             # 랜딩 페이지
|   │   ├── join             # 회원가입 페이지
|   │   ├── login            # 로그인 페이지
|   │   ├── user             # 마이페이지 페이지
|   │   ├── write            # 게시글 작성 페이지
|   │   ├── favicon.ico      # 파비콘
|   │   ├── globals.css      # 전역 CSS
|   │   ├── layout.tsx       # 페이지 공통 레이아웃, 전역 Context 적용하는 곳
|   │   └── page.tsx         # 엔트리 포인트 파일
│   ├── assets/              # 이미지, 폰트 등 정적 파일
│   ├── components/          # 공용 컴포넌트
│   ├── constants/           # 상수
│   ├── contexts/            # Context API
│   ├── hooks/               # 커스텀 훅 모음
│   ├── stories/             # 스토리북
│   ├── style/               # 스타일링 파일
│   └── utils/               # 공통 유틸리티
├── .babelrc.js              # 바벨 환결설정
├── .eslintrc.json           # eslint 설정
├── .gitignore               # Git 무시 파일 목록
├── algolia.ts               # Algolia 클라이언트 설정 파일
├── firebasedb.js            # Firebase 클라이언트 설정 파일
├── firestore.js             # Firestore 클라이언트 설정 파일
├── package-lock.json        # 정확한 종속성 버전이 기록된 파일로, 일관된 빌드를 보장
├── package.json             # 프로젝트 종속성 및 스크립트 정의
├── PULL_REQUEST_TEMPLATE.md # PR 템플릿
└── README.md                # 프로젝트 개요 및 사용법
```

<br/>

# 6. 커밋 컨벤션
## 기본 구조
```
type : subject

body 
```

<br/>

## type 종류
```
feat : 새로운 기능 추가
fix : 버그 수정
hotfix : 긴급한 버그 수정
refactor : 코드 리펙토링
trivial : 기타
```
