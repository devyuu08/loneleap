import { db } from "@/services/firebase";
import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";

/**
 * 특정 리뷰의 좋아요를 취소
 * @param {string} reviewId - 리뷰 ID
 * @param {string} userId - 사용자 ID
 * @returns {Promise<void>}
 */

export async function unlikeReview(reviewId, userId) {
  await deleteDoc(doc(db, "reviews", reviewId, "likes", userId));
  await updateDoc(doc(db, "reviews", reviewId), {
    likesCount: increment(-1),
  });
}
