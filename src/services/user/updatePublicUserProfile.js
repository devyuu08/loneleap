import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * Firestore 공개 사용자 프로필 업데이트
 * @param {Object} params
 * @param {string} params.uid - 사용자 UID
 * @param {string} params.displayName - 사용자 이름
 * @param {string} [params.photoURL] - 프로필 이미지 URL (선택)
 */
export async function updatePublicUserProfile({ uid, displayName, photoURL }) {
  const publicData = {
    displayName,
    updatedAt: serverTimestamp(),
  };

  if (photoURL !== undefined) {
    publicData.photoURL = photoURL;
  }

  await setDoc(doc(db, "users_public", uid), publicData, { merge: true });
}
