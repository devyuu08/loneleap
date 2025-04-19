# **🧳** LoneLeap – 사용자 웹앱(React)

> 혼자 여행을 즐기는 사람들을 위한 감성적인 일정 공유, 리뷰 작성, 오픈 채팅 기능을 제공하는 **React 기반 여행 플랫폼**입니다. 사용자는 여행 계획을 만들고, 후기를 공유하며, 자유롭게 채팅으로 여행 이야기를 나눌 수 있습니다.

---

## **1. 📌 프로젝트 소개**

**LoneLeap 사용자 웹앱**은 혼자 떠나는 여행자들이 자신의 여행 일정을 만들고 공유하며, 후기를 작성하고, 실시간 채팅방에서 자유롭게 소통할 수 있는 감성 기반의 여행 플랫폼입니다.

- React + Firebase 기반의 SPA 구조
- 여행 일정 관리 / 리뷰 작성 / 오픈 채팅 / 신고 기능 포함
- 마이페이지 기능을 통해 개인 콘텐츠 관리 가능
- Firebase Authentication으로 로그인/회원가입 처리

> 관리자 기능은 별도의 Next.js 기반 관리자 페이지에서 운영됩니다.

---

## **2. 🛠️ 기술 스택**

- **React 18 + Vite** – 빠른 개발 환경 구성
- **Firebase (Auth, Firestore, Storage)** – 인증 / 데이터 / 이미지 업로드
- **Redux Toolkit** – 로그인 상태 전역 관리
- **React Query** – 일정/리뷰/채팅 등 비동기 처리
- **React Router DOM** – 중첩 라우팅 구성
- **Tailwind CSS** – 반응형 UI 디자인

---

## **3. 📁 폴더 구조**

```jsx
client/
├── public/
├── src/
│   ├── components/         # 공통 UI 컴포넌트
│   ├── pages/              # 라우트 구성
│   │   ├── Auth/           # 로그인, 회원가입
│   │   ├── Itinerary/      # 일정
│   │   ├── Reviews/        # 리뷰
│   │   ├── Chat/           # 채팅
│   │   └── mypage/         # 마이페이지
│   ├── services/
│   │   ├── firebase.js     # Firebase 초기화
│   │   ├── auth.js         # 인증 관련 로직
│   │   ├── firestore.js    # Firestore 읽기/쓰기 모듈
│   │   └── queries/        # React Query 커스텀 훅 모음
│   ├── store/              # Redux userSlice 등
│   └── utils/              # 유틸 함수
├── .env
└── index.html
```

---

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

## **6. 🚀 실행 방법**

```bash
cd loneleap-client
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
