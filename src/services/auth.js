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
    const user = result.user;

    // Firebase Auth 사용자 정보에 displayName 설정
    if (displayName && displayName.trim() !== "") {
      await updateProfile(user, { displayName });
    }

    // 공개 정보: users_public/{uid}
    const publicRef = doc(db, "users_public", user.uid);
    await setDoc(publicRef, {
      displayName: displayName || "",
      photoURL: user.photoURL || "",
      bio: "",
    });

    // 민감 정보: users_private/{uid}
    const privateRef = doc(db, "users_private", user.uid);
    await setDoc(privateRef, {
      uid: user.uid,
      email: user.email,
      status: "active",
      role: "user",
      itineraryCount: 0,
      reviewCount: 0,
      reportedCount: 0,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("회원가입 후 Firestore 저장 실패:", error);
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
