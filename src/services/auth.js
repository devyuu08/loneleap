import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// 회원가입
export const signUp = async (email, password, displayName) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  try {
    // displayName 설정
    if (displayName && displayName.trim() !== "") {
      await updateProfile(result.user, { displayName });
    }

    // Firestore에 사용자 정보 추가
    const userRef = doc(db, "users", result.user.uid);
    await setDoc(userRef, {
      uid: result.user.uid,
      email: result.user.email,
      displayName: displayName || "",
      photoURL: result.user.photoURL || "",
      status: "active", // 기본 상태
      role: "user", // 기본 사용자 역할
      itineraryCount: 0, // 작성한 일정 수
      reviewCount: 0, // 작성한 리뷰 수
      reportedCount: 0, // 신고당한 횟수
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("회원가입 후 Firestore 저장 실패:", error);
    // 필요시 예외 처리
  }

  return result;
};

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
