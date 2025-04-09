// src/services/queries/useReviews.js
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });
};
