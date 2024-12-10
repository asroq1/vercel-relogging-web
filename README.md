# 리로깅 Frontend

## 프로젝트 소개
리로깅 프론트엔드는 Next.js 14를 기반으로 한 플로깅 커뮤니티 플랫폼입니다.


<h2>Front-end 기술 스택</h2>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">


<br>

<h2>프로젝트 사이트 주소</h2>

 [리로깅]([https://42gg.kr](https://www.re-logging.com/))

<br>


## 주요 기능
- **플로깅 모임**: 모임 생성, 참여, 관리
- **지자체 플로깅**: 지역별 플로깅 정보 제공 및 신청
- **환경 뉴스**: 환경 관련 뉴스 제공
- **소셜 로그인**: Google, Kakao 로그인 지원

## 기술 스택
- **Framework**: Next.js 14
- **Language**: TypeScript
- **State Management**: 
  - Zustand 
  - React Query 
- **Styling**: 
  - TailwindCSS
  - Shadcn/ui
- **Testing**: -
- **Code Quality**:
  - ESLint
  - Prettier
  - Husky

## 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/Re-logging/front-web.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

```

## 프로젝트 구조
```
src/
├── app/              # Next.js 14 App Router
├── components/       # 공통 컴포넌트
├── hooks/           # 커스텀 훅
├── store/           # Zustand 스토어
├── types/           # TypeScript 타입 정의
├── utils/           # 유틸리티 함수
└── styles/          # 글로벌 스타일
```

## Git Flow
- **main**: 프로덕션 배포
- **develop**: 개발 서버 배포
- **feature/**: 기능 개발
- **hotfix/**: 긴급 버그 수정

## 배포 프로세스
1. feature 브랜치에서 개발
2. develop 브랜치로 PR
3. 코드 리뷰 후 머지
4. 개발 서버 자동 배포
5. QA 후 main 브랜치 배포

## 코드 품질 관리
- ESLint 규칙 준수
- Prettier 포맷팅
- 커밋 전 Husky로 자동 검사
- PR시 자동 빌드 테스트

## 컨벤션
### 커밋 메시지
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
chore: 빌드 업무 수정
```

### 브랜치 네이밍
```
feature/login
feature/main-page
hotfix/auth-error
```

## CI/CD
GitHub Actions를 통한 자동화:
- PR시 빌드 테스트
- develop 브랜치 자동 배포
- main 브랜치 프로덕션 배포

## 문의
- Issue 생성
- PR 요청
- Discussions 참여

