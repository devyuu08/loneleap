// src/services/queries/useRecentReviews.js

import { useQuery } from "@tanstack/react-query";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase"; // 기존 firebase.js 경로에 따라 조정

const db = getFirestore(app);

export const useRecentReviews = () => {
  return useQuery({
    queryKey: ["recentReviews"],
    queryFn: async () => {
      const ref = collection(db, "reviews");
      const q = query(ref, orderBy("createdAt", "desc"), limit(3));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });
};
