import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * Firestore 비공개 사용자 정보 업데이트
 * @param {Object} params
 * @param {string} params.uid - 사용자 UID
 * @param {string} params.bio - 자기소개
 */
export async function updatePrivateUserProfile({ uid }) {
  const privateData = {
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, "users_private", uid), privateData, { merge: true });
}
