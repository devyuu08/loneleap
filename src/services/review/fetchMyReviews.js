import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/services/firebase";
import { normalizeReview } from "@/utils/normalizeReview";

/**
 * 특정 사용자가 작성한 리뷰 목록을 가져옴
 * @param {string} uid - 사용자 UID
 * @returns {Promise<Array>}
 */

export async function fetchMyReviews(uid) {
  const q = query(
    collection(db, "reviews"),
    where("createdBy.uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeReview);
}
