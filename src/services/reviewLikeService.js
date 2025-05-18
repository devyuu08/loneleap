import { db } from "./firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

export const likeReview = async (reviewId, userId) => {
  await setDoc(
    doc(db, "reviews", reviewId, "likes", userId),
    { likedAt: serverTimestamp() },
    { merge: true } // 중복 방지
  );
  await updateDoc(doc(db, "reviews", reviewId), {
    likesCount: increment(1),
  });
};

export const unlikeReview = async (reviewId, userId) => {
  await deleteDoc(doc(db, "reviews", reviewId, "likes", userId));
  await updateDoc(doc(db, "reviews", reviewId), {
    likesCount: increment(-1),
  });
};

export const hasUserLikedReview = async (reviewId, userId) => {
  const ref = doc(db, "reviews", reviewId, "likes", userId);
  const snap = await getDoc(ref);
  return snap.exists();
};
