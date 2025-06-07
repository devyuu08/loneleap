import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/services/firebase";
import { normalizeReview } from "@/utils/normalizeReview";

/**
 * 전체 리뷰 목록 중 최대 20개를 최신순으로 가져옴
 * @returns {Promise<Array>}
 */

export const fetchReviews = async () => {
  const q = query(
    collection(db, "reviews"),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeReview);
};
