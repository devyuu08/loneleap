import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * 사용자가 특정 리뷰를 좋아요했는지 확인
 * @param {string} reviewId - 리뷰 ID
 * @param {string} userId - 사용자 ID
 * @returns {Promise<boolean>}
 */

export async function hasUserLikedReview(reviewId, userId) {
  const ref = doc(db, "reviews", reviewId, "likes", userId);
  const snap = await getDoc(ref);
  return snap.exists();
}
