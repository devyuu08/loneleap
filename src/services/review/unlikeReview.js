import { db } from "@/services/firebase";
import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";

export async function unlikeReview(reviewId, userId) {
  await deleteDoc(doc(db, "reviews", reviewId, "likes", userId));
  await updateDoc(doc(db, "reviews", reviewId), {
    likesCount: increment(-1),
  });
}
