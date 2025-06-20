import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/services/firebase";

/**
 * 이메일/비밀번호로 로그인 요청
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @returns {Promise<UserCredential>}
 */
export async function signIn(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("로그인 실패:", err.code, err.message);
    }

    if (err.code === "auth/network-request-failed") {
      await signOut(auth); // 꼬인 세션 초기화
    }

    throw err; // 클라이언트에서 에러 메시지를 핸들링하도록 위임
  }
}

/**
 * Google 계정으로 로그인 요청
 * @returns {Promise<UserCredential>}
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

/**
 * 현재 로그인된 사용자 로그아웃
 * @returns {Promise<void>}
 */
export async function logout() {
  return await signOut(auth);
}

/**
 * Firebase 인증 상태 변경 감지 (onAuthStateChanged wrapper)
 * @param {(user: import("firebase/auth").User | null) => void} callback - 사용자 정보 감지 콜백
 * @returns {() => void} - 언마운트 시 호출할 unsubscribe 함수
 */
export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
