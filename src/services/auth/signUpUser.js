import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/services/firebase";

/**
 * Firebase 이메일/비밀번호 회원가입 후 사용자 정보를 Firestore에 초기화하는 함수
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @param {string} displayName - 사용자 닉네임
 * @returns {Promise<UserCredential>} - Firebase 인증 결과
 */
export const signUpUser = async (email, password, displayName) => {
  // 1. Firebase Authentication에 사용자 생성
  const result = await createUserWithEmailAndPassword(auth, email, password);

  try {
    const user = result.user;

    // 2. 사용자 프로필에 displayName 설정
    if (displayName && displayName.trim() !== "") {
      await updateProfile(user, { displayName });
    }

    // 3. 공개 프로필 정보 저장 (users_public 컬렉션)
    const publicRef = doc(db, "users_public", user.uid);
    await setDoc(publicRef, {
      displayName: displayName || "",
      photoURL: user.photoURL || "",
      bio: "", // 초기 상태는 빈 소개글
    });

    // 4. 민감 정보 저장 (users_private 컬렉션)
    const privateRef = doc(db, "users_private", user.uid);
    await setDoc(privateRef, {
      uid: user.uid,
      email: user.email,
      status: "active", // 계정 활성 상태
      role: "user", // 기본 권한
      itineraryCount: 0,
      reviewCount: 0,
      reportedCount: 0,
      createdAt: serverTimestamp(), // 서버 기준 생성 시각
    });
  } catch (error) {
    // Firestore 저장 중 오류 발생 시 로그 출력
    console.error("회원가입 후 Firestore 저장 실패:", error);
  }

  return result;
};
