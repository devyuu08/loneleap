import { doc, updateDoc } from "firebase/firestore";
import { db } from "services/firebase";

/**
 * 공개 프로필 익명화 (닉네임, 프로필 이미지)
 * @param {string} uid - 사용자 UID
 */
export const anonymizePublicProfile = async (uid) => {
  const publicRef = doc(db, "users_public", uid);
  await updateDoc(publicRef, {
    displayName: "탈퇴한 사용자",
    photoURL: "/default_profile.png",
  });
};
