import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 특정 리뷰의 댓글을 삭제
 * @param {Object} params
 * @param {string} params.reviewId - 리뷰 ID
 * @param {string} params.commentId - 댓글 ID
 * @returns {Promise<void>}
 */

export async function deleteComment({ reviewId, commentId }) {
  const commentDoc = doc(db, "reviews", reviewId, "comments", commentId);
  await deleteDoc(commentDoc);
}
