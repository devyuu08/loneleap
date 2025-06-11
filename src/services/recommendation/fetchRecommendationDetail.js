import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 특정 추천 장소의 상세 정보를 Firestore에서 가져옴
 *
 * @param {string} id - 추천 장소 문서 ID
 * @returns {Promise<object>} 추천 장소 데이터 객체
 * @throws {Error} 문서가 존재하지 않을 경우 오류 발생
 */

export async function fetchRecommendationDetail(id) {
  const docRef = doc(db, "recommended_places", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) throw new Error("데이터 없음");
  return { id: snapshot.id, ...snapshot.data() };
}
