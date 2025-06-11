import { db } from "@/services/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

/**
 * 특정 리뷰에 좋아요를 추가
 * @param {string} reviewId - 리뷰 ID
 * @param {string} userId - 사용자 ID
 * @returns {Promise<void>}
 */

export async function likeReview(reviewId, userId) {
  try {
    await setDoc(
      doc(db, "reviews", reviewId, "likes", userId),
      { likedAt: serverTimestamp() },
      { merge: true } // 중복 방지
    );
    await updateDoc(doc(db, "reviews", reviewId), {
      likesCount: increment(1),
    });
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error("좋아요 처리 실패:", err);
    }
    throw new Error("좋아요 처리 중 오류가 발생했습니다.");
  }
}
