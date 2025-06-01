import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 주어진 userIds 배열에 해당하는 공개 유저 정보 목록을 반환
 * @param {string[]} userIds
 * @returns {Promise<Array<{ uid: string, ...userData }>>}
 */
export async function getUsersByIds(userIds = []) {
  const userDocs = await Promise.all(
    userIds.map(async (uid) => {
      const docRef = doc(db, "users_public", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { uid: docSnap.id, ...docSnap.data() } : null;
    })
  );

  return userDocs.filter(Boolean);
}
