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
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  const message = `필수 환경 변수 누락: ${missingVars.join(", ")}`;

  if (import.meta.env.MODE === "development") {
    console.warn(message);
  } else {
    throw new Error(message);
  }
}

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

  if (import.meta.env.DEV) {
    // 개발 환경에서만 로그 출력
    console.info("Firebase 초기화 성공");
  }
} catch (error) {
  const isDev = import.meta.env.DEV;

  // 개발 환경일 때만 콘솔 출력
  if (isDev) {
    console.warn("Firebase 초기화 중 오류 발생:", error);
  }

  // 프로덕션 fallback 처리
  if (!isDev) {
    const fallbackElement = document.getElementById("firebase-error-fallback");
    if (fallbackElement) {
      fallbackElement.style.display = "block";
    }
  }
}

export const auth = getAuth(app); // 인증 객체
export const db = getFirestore(app); // Firestore
export const storage = getStorage(app); // Storage
export { app };
