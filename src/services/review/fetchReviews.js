import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/services/firebase";
import { normalizeReview } from "@/utils/normalizeReview";

export const fetchReviews = async () => {
  const q = query(
    collection(db, "reviews"),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeReview);
};
