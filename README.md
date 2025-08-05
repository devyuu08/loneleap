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

## 3. 📁 폴더 구조(요약)

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

## **5. 🔍 핵심 기능**

### **1. 인증 & 사용자 관리**

- Firebase 기반 로그인 / 회원가입 (이메일 & 소셜 로그인)
- Redux를 통한 로그인 상태 전역 관리
- 사용자 정보 수정 (이름, 프로필 이미지, 소개글)
- 소셜 로그인 사용자의 탈퇴 제한 처리

### 2. 메인 페이지

- 메인 히어로 섹션 (감성적 문구 + 배경 이미지)
- 추천 여행지 미리보기 섹션 (카드형 UI)
- 사용자 리뷰 프리뷰 섹션 (최신 리뷰 일부)
- 오픈채팅 참여 유도 섹션
- 지도 기반 여행일정 안내 섹션
- 반응형 슬라이더, Skeleton UI 적용

### **3. 여행 일정 관리**

- 여행 일정 생성, 삭제, 조회 (Firestore 기반)
  - 일정 생성: 마이페이지 일정 탭 floating 버튼
- 날짜별로 자동 그룹화된 구조
- 날짜별 토글 방식 UI로 하루 단위 세부 일정 보기/숨기기 전환
- 각 날짜에 개별 일정 추가 가능 (장소, 시간, 메모 등)
- 공개 일정 공유 기능 (링크 복사 → 비회원도 조회 가능)
  - 마이페이지 일정 카드에서 공유 링크 생성

### **4. 리뷰 시스템**

- 리뷰 작성 및 별점 입력, 삭제, 조회 기능
  - 리뷰 작성: 마이페이지 리뷰 탭 floating 버튼
- 리뷰 좋아요 기능 (로컬 + 서버 상태 실시간 반영)
- 리뷰 신고 기능 (Firestore 기록 및 관리자 전달)

### **5. 오픈채팅**

- 여행자 간 채팅방 생성 및 참여
- 실시간 메시지 수신 (onSnapshot)
- 메시지 신고 기능 포함

### 6. 추천 여행지

- 추천 여행지 리스트 조회 (Firestore 연동)
- 지역 기반 필터링 기능
- 지도 연동 (카카오 지도 API 사용)
- 클릭 시 상세 여행지 정보 확인 가능
- 관리자 페이지에서 추천 장소 직접 등록/수정

### **7. 마이페이지**

- 내가 작성한 일정, 리뷰, 채팅방 리스트 확인
- 사용자 정보 수정 및 콘텐츠 동기화
- 프로필 수정(닉네임, 소개, 이미지) 기능
- 비밀번호 변경 및 계정 탈퇴 기능(이메일 계정 대상)

---

## **💡 설계 포인트**

| **항목**          | **내용**                                                                     |
| ----------------- | ---------------------------------------------------------------------------- |
| **상태 관리**     | Redux (user), React Query (서버 상태 전반)                                   |
| **컴포넌트 구조** | Container/Presentational 패턴 일부 도입                                      |
| **Firebase 구조** | users_public, reviews, itineraries, chatRooms, chatMessages 등 도메인별 분리 |
| **이미지 최적화** | SkeletonImage, lazy loading, decoding async                                  |
| **접근성 대응**   | 버튼 역할, ARIA 속성 일부 반영                                               |

---

## 🆕 최근 업데이트 (v3.0.0 – 2025.06.10)

- 전체 구조 리팩토링 및 역할별 폴더 재정비
- Firebase 인증/프로필/로그아웃 서비스 함수 분리
- 사용자 관련 커스텀 훅 분리 (`useLogin`, `useSignUp`, `useUpdateProfile` 등)
- 여행 일정 기능 개선 (날짜별 토글 UI, 공유 링크 기능 추가)
- 리뷰 좋아요 캐시 동기화 문제 해결 및 옵티미스틱 UI 적용
- SkeletonImage 컴포넌트 도입 및 이미지 로딩 최적화
- 모든 페이지 반응형 구조 통일
- 공통 UI 컴포넌트 (`FormInput`, `ModalFooterButtons`, etc.) 정비
- 전역 alert → toast 전환으로 사용자 경험 개선
- 네이버 소셜 로그인 연동 (Firebase Functions + Custom Token)
- Kakao 지도 연동 및 추천 여행지 지도 렌더링 구현
- 전체 Tailwind 스타일 통일 및 시멘틱 마크업 보강

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

---

## 📘 관련 문서

- 관리자 페이지: [](https://github.com/devyuu08/loneleap-admin.git)https://github.com/devyuu08/loneleap-admin.git
- 전체 구조 및 연동 흐름은 Notion 문서 참조 예정

---

## **🧑‍💻 개발자 정보**

- 정유진 | Frontend Developer
- GitHub: https://github.com/devyuu08
- 이메일: devyuu08@gmail.com
