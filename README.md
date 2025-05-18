# 🧳 LoneLeap – 사용자 웹앱(React)

> 혼자 여행을 즐기는 사람들을 위한 감성적인 일정 공유, 리뷰 작성, 오픈 채팅 기능을 제공하는 **React 기반 여행 플랫폼**입니다. 사용자는 여행 계획을 만들고, 후기를 공유하며, 자유롭게 채팅으로 여행 이야기를 나눌 수 있습니다.

---

## 1. 📌 프로젝트 소개

LoneLeap 사용자 웹앱은 혼자 떠나는 여행자들이 자신의 여행 일정을 만들고 공유하며, 여행 후기를 감성적으로 기록하고, 오픈 채팅을 통해 자유롭게 소통할 수 있도록 설계된 React 기반 여행 플랫폼입니다.

이 프로젝트는 신입 프론트엔드 개발자로서 실시간 데이터 처리, 사용자 중심 UI/UX 설계, Firebase 기반 백엔드 연동 등의 역량을 포트폴리오에 녹여낸 SPA(Single Page Application)입니다.

- React 18 + Firebase 기반 SPA로 구축된 클라이언트
- 여행 일정 관리 / 인터뷰형 리뷰 작성 / 오픈 채팅 / 신고 기능 제공
- 마이페이지에서 일정, 리뷰, 채팅방을 한눈에 관리
- Firebase Authentication을 통한 로그인/회원가입 및 사용자 정보 관리
- React Query + Redux로 서버/클라이언트 상태 분리 처리
- v2 버전에서는 전체 UI 리디자인과 기능 고도화가 진행됨

> ✅ 관리자 기능은 별도의 Next.js 기반 **관리자 페이지(Admin Dashboard)**에서 운영됩니다.

---

## 2. 🛠️ 기술 스택

- **React 18 + Vite**  
  → 최신 React 기능과 빠른 개발 환경을 위한 Vite 기반 설정

- **Firebase (Authentication, Firestore, Storage)**  
  → 사용자 인증, 실시간 데이터베이스, 이미지 업로드 전반에 활용

- **React Query**  
  → 일정/리뷰/채팅 등 서버 상태 관리를 위한 비동기 데이터 핸들링

- **Redux Toolkit**  
  → 사용자 정보 상태 및 인증 흐름 전역 관리

- **React Router DOM (v6)**  
  → 인증 보호 라우팅 및 중첩 구조 구현

- **Tailwind CSS**  
  → 디자인 호텔 스타일을 참고한 반응형 UI 구성 및 전역 스타일링

- **Lucide Icons + Framer Motion**  
  → 일관된 아이콘 구성과 인터랙션 연출로 감성적인 UI 구현 강화

---

## 3. 📁 폴더 구조

```bash
client/
├── public/
├── src/
│   ├── assets/              # 정적 이미지 및 배경 리소스
│   ├── components/          # 공통 UI 컴포넌트
│   ├── data/                # 지역/여행지 등 정적 JSON 데이터
│   ├── hooks/               # 커스텀 훅 모음 (React Query, 상태 관리 등)
│   ├── lib/                 # Firebase Admin 등 외부 라이브러리 유틸
│   ├── pages/               # 라우팅 기반 페이지 컴포넌트
│   │   ├── auth/            # 로그인 / 회원가입
│   │   ├── chat/            # 채팅 목록 / 채팅방
│   │   ├── home/            # 메인 페이지
│   │   ├── itinerary/       # 일정 목록 / 상세 / 작성
│   │   ├── mypage/          # 마이페이지 / 설정 / 통계
│   │   ├── recommendations/ # 추천 여행지 목록 / 상세
│   │   └── review/          # 리뷰 목록 / 상세 / 작성
│   ├── services/            # Firestore 통신 모듈 (도메인별 분리)
│   │   ├── queries/         # React Query 커스텀 훅 (CRUD 중심)
│   │   ├── auth.js
│   │   ├── firebase.js
│   │   ├── itineraryService.js
│   │   ├── reviewService.js
│   │   ├── reviewLikeService.js
│   │   └── userService.js
│   ├── store/               # Redux 상태 관리 (userSlice 등)
│   └── utils/               # 공통 유틸 함수, 날짜 포맷, 에러 처리 등
├── .env                     # Firebase 환경변수
└── index.html
```

## **4. 🔐 Firebase 연동 방식**

클라이언트는 Vite 기반이므로 .env 파일에서 다음과 같이 설정합니다:

```json
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

> VITE\_ 접두사를 반드시 포함해야 환경변수가 적용됩니다.

---

## **5. ✅ 제공 기능 요약**

| 기능                   | 설명                                    |
| ---------------------- | --------------------------------------- |
| 🔐 로그인/회원가입     | Firebase Auth (이메일/비밀번호, Google) |
| 📅 여행 일정 생성/조회 | 일정 등록/수정/삭제, 공개 여부 설정     |
| ✍️ 리뷰 작성/조회      | 후기 등록 (이미지 포함), 목록/상세 조회 |
| 🚨 리뷰 신고 기능      | 부적절한 리뷰를 Firestore에 신고        |
| 💬 오픈 채팅 기능      | 채팅방 생성, 메시지 실시간 전송         |
| 🚨 채팅 신고 기능      | 불쾌한 메시지 신고 기능                 |
| 👤 마이페이지          | 내 일정/후기/채팅방 목록 확인 및 관리   |
| 🔒 인증 기반 라우팅    | 비로그인 시 주요 페이지 접근 제한       |

---

## 📌 LoneLeap v2 업데이트 요약

LoneLeap v1을 기반으로 다음과 같은 기능 고도화 및 감성 UI 리디자인 작업이 v2에서 진행되었습니다.  
실제 사용자 중심의 흐름과 데이터 구조 안정화를 중점으로 포트폴리오 완성도를 높였습니다.

### 🎯 기능 개선

- 리뷰 좋아요 기능 도입 (likesCount + 유저별 toggle 처리)
- 댓글 기능 구현 (작성/삭제/리스트 조회, 실시간 반영)
- 일정/리뷰 등록 후 상세 페이지로 자동 이동 처리
- 삭제 후 목록 상태 즉시 반영 (React Query 캐시 무효화)
- 인터뷰형 리뷰 대응 → 리뷰 카드 본문 제거 및 구조 개편
- 추천 여행지 기능 구현 (지역 필터, 상세 페이지 포함)

### 🎨 UI/UX 리디자인

- 메인 페이지 섹션 전체 리디자인
  - Hero, 인기 여행지, 지역 지도, 리뷰 프리뷰, CTA 섹션 감성화
- 일정/리뷰 상세 페이지 공통 HeroSection 구성
- 마이페이지 개편: 카드형 콘텐츠 구성 + 통계 시각화
- 로그인/회원가입 페이지 감성 Hero + 공통 폼 디자인 적용
- 일정/리뷰 생성 카드 제거 → 마이페이지 플로팅 버튼으로 이동
- 전역 HeroSection 및 FloatingButtons 컴포넌트 도입

### ⚙️ 성능 및 구조 개선

- SkeletonImage 도입으로 이미지 로딩 시 딜레이 UX 개선
- 이미지 업로드 후 Redux + Firestore + Firebase Auth 상태 동기화
- Firebase Storage 캐시 문제 해결
- 리뷰/채팅 메시지 구조 개선 (sender → 객체 구조화)
- 댓글 구조 개선: `author` 내부 객체 외에 `authorUid` 평면 필드 추가
- 계정 삭제 시 좋아요/댓글은 유지, 주요 콘텐츠만 삭제하도록 개선

---

## **6. 🚀 실행 방법**

```bash
npm install
npm run dev
```

- 개발 서버 주소: http://localhost:5173
- .env 파일 설정 필수 (Firebase 프로젝트 키)

---

## **7. 🌍 배포 정보**

- **배포 플랫폼**: Firebase Hosting
- **배포 URL**: https://loneleap-client.web.app / https://loneleap-client.firebaseapp.com/

> 리뷰/채팅 신고 기능은 Firestore에 저장되며, 관리자 페이지에서 확인 및 처리됩니다.

---

## **8. 📎 참고 사항**

- 이 프로젝트는 신입 프론트엔드 개발자의 포트폴리오 용도로 제작되었습니다.
- Firebase 실시간 데이터 흐름, 상태 관리 구조, 사용자 경험 중심 UI/UX에 초점을 맞추어 개발되었습니다.
- 관리 기능은 별도 저장소(Next.js 기반 관리자 페이지)에서 운영됩니다.

## 📘 관련 문서

- 관리자 페이지: loneleap-client/README.md
- 전체 구조 및 연동 흐름은 Notion 문서 참조 예정
