import { db } from "services/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function hasUserLikedReview(reviewId, userId) {
  const ref = doc(db, "reviews", reviewId, "likes", userId);
  const snap = await getDoc(ref);
  return snap.exists();
}
