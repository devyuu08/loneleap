import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { orderBy } from "lodash";
import { db } from "services/firebase";

// 사용자 일정 목록 조회 함수
export async function fetchUserItineraries(uid, maxResults = 20) {
  try {
    const q = query(
      collection(db, "itineraries"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc"), // 최신 일정부터 정렬
      limit(maxResults) // 한 번에 가져올 최대 문서 수 제한
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("일정 목록 조회 중 오류 발생:", error);
    throw error;
  }
}
