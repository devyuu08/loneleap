import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 사용자가 볼 수 있는 추천 장소 리스트를 Firestore에서 불러옴
 * - visible 필드가 true인 문서만 조회
 * - 생성일 기준 내림차순 정렬
 *
 * @returns {Promise<object[]>} 추천 장소 목록 배열
 */

export async function fetchRecommendationList() {
  const q = query(
    collection(db, "recommended_places"),
    where("visible", "==", true),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
