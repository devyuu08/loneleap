import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/services/firebase";

// 로그인
export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Google 로그인
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

// 로그아웃
export const logout = async () => {
  return await signOut(auth);
};

// 로그인 상태 감지
export const observeAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
