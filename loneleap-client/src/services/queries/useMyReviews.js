// src/services/queries/useMyReviews.js
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

export const useMyReviews = (uid) => {
  return useQuery({
    queryKey: ["myReviews", uid],
    enabled: !!uid,
    queryFn: async () => {
      const q = query(
        collection(db, "reviews"),
        where("authorId", "==", uid),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    },
    onError: (error) => {
      console.error("내 리뷰 조회 중 오류:", error);
    },
  });
};
