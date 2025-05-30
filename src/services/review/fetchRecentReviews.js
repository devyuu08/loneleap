import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import { normalizeReview } from "@/utils/normalizeReview";

export const fetchRecentReviews = async () => {
  const q = query(
    collection(db, "reviews"),
    orderBy("createdAt", "desc"),
    limit(5)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeReview);
};
