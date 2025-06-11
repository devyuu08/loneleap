import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 일정 목록을 최신순으로 조회
 *
 * @param {number} limitCount - 가져올 일정 개수 제한
 * @returns {Promise<object[]>} - 일정 데이터 배열
 */

export async function fetchItineraries(limitCount = 20) {
  const q = query(
    collection(db, "itineraries"),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      createdBy: {
        uid: data.createdBy?.uid || "",
        displayName: data.createdBy?.displayName || "익명",
        photoURL: data.createdBy?.photoURL || "/images/default-profile.png",
      },
    };
  });
}
