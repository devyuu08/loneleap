import { db } from "@/services/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

/**
 * 특정 리뷰에 달린 모든 댓글을 가져옴
 * @param {string} reviewId - 리뷰 ID
 * @returns {Promise<Array>} 댓글 목록
 */

export const fetchComments = async (reviewId) => {
  const commentsRef = collection(db, "reviews", reviewId, "comments");
  const q = query(commentsRef, orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
