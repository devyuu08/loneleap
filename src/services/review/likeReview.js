import { db } from "@/services/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

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
    console.error("좋아요 처리 실패:", err);
    throw new Error("좋아요 처리 중 오류가 발생했습니다.");
  }
}
