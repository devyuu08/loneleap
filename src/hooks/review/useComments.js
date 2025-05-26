import { useQuery } from "@tanstack/react-query";
import { db } from "services/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { QUERY_KEYS } from "constants/queryKeys";

export const useComments = (reviewId) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENTS(reviewId),
    queryFn: async () => {
      const commentsRef = collection(db, "reviews", reviewId, "comments");
      const q = query(commentsRef, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    enabled: !!reviewId,
  });
};
