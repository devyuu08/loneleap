import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/services/firebase";
import { normalizeReview } from "@/utils/normalizeReview";

export const fetchMyReviews = async (uid) => {
  const q = query(
    collection(db, "reviews"),
    where("createdBy.uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeReview);
};
