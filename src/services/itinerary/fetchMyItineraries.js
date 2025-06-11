import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 사용자가 생성한 일정 목록을 조회
 *
 * @param {string} uid - 사용자 UID
 * @returns {Promise<object[]>} - 일정 데이터 배열
 * @throws {Error} - UID가 없는 경우
 */

export async function fetchMyItineraries(uid) {
  if (!uid) throw new Error("사용자 정보가 없습니다.");

  const q = query(
    collection(db, "itineraries"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  });
}
