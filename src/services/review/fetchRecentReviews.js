import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import { normalizeReview } from "@/utils/normalizeReview";

/**
 * 최근 작성된 리뷰 5개를 가져옴
 * @returns {Promise<Array>}
 */

export const fetchRecentReviews = async () => {
  const q = query(
    collection(db, "reviews"),
    orderBy("createdAt", "desc"),
    limit(5)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeReview);
};
