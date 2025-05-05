import { useQuery } from "@tanstack/react-query";
import { db } from "services/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const useComments = (reviewId) => {
  return useQuery({
    queryKey: ["comments", reviewId],
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
