// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 필수 환경 변수 리스트
const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

// 누락된 변수 검사
let missingVars = [];
requiredEnvVars.forEach((varName) => {
  if (!import.meta.env[varName]) {
    console.error(`필수 환경 변수 ${varName}이(가) 누락되었습니다.`);
    missingVars.push(varName);
  }
});

// 누락된 변수가 있으면 개발 환경에서는 실행을 중단
if (missingVars.length > 0 && import.meta.env.DEV) {
  throw new Error(
    `Firebase 초기화를 위한 필수 환경 변수가 누락되었습니다: ${missingVars.join(
      ", "
    )}`
  );
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase (firebase 초기화 에러 처리)
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase가 정상적으로 초기화되었습니다.");
} catch (error) {
  console.error("Firebase 초기화 중 오류가 발생했습니다:", error);
  // 전역 에러 상태 설정 또는 오류 화면으로 리디렉션
  // 예: window.location.href = '/error?type=firebase_init';
  // 또는 Redux/상태 관리에 오류 상태 저장
}

export const auth = getAuth(app); // 인증 객체
export const db = getFirestore(app); // Firestore
export const storage = getStorage(app); // Storage
