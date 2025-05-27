import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "services/firebase";

/**
 * 이메일/비밀번호로 Firebase 회원가입 + Firestore 유저 초기화
 * @param {string} email
 * @param {string} password
 * @param {string} displayName
 * @returns {Promise<UserCredential>}
 */
export const signUpUser = async (email, password, displayName) => {
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
