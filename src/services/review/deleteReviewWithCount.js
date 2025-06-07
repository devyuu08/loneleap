import { deleteReview } from "@/services/review/deleteReview";
import { doc, updateDoc, increment } from "firebase/firestore";
import { auth, db } from "@/services/firebase";

/**
 * 리뷰 삭제 후 사용자 리뷰 수를 감소
 * @param {string} reviewId - 리뷰 ID
 * @returns {Promise<void>}
 */

export async function deleteReviewWithCount(reviewId) {
  await deleteReview(reviewId);

  const uid = auth.currentUser?.uid;
  if (uid) {
    try {
      await updateDoc(doc(db, "users_private", uid), {
        reviewCount: increment(-1),
      });
    } catch (err) {
      console.warn("reviewCount 감소 실패:", err);
    }
  }
}
