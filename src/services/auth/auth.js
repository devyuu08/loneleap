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
export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Google 계정으로 로그인 요청
 * @returns {Promise<UserCredential>}
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

/**
 * 현재 로그인된 사용자 로그아웃
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return await signOut(auth);
};

/**
 * Firebase 인증 상태 변경 감지 (onAuthStateChanged wrapper)
 * @param {(user: import("firebase/auth").User | null) => void} callback - 사용자 정보 감지 콜백
 * @returns {() => void} - 언마운트 시 호출할 unsubscribe 함수
 */
export const observeAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
