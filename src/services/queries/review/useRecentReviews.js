import { useQuery } from "@tanstack/react-query";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { app } from "services/firebase";

const db = getFirestore(app);

export const useRecentReviews = () => {
  return useQuery({
    queryKey: ["recentReviews"],
    queryFn: async () => {
      const ref = collection(db, "reviews");
      const q = query(ref, orderBy("createdAt", "desc"), limit(5));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });
};
