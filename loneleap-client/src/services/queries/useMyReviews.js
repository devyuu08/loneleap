// src/services/queries/useMyReviews.js
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";

export const useMyReviews = (uid) => {
  return useInfiniteQuery({
    queryKey: ["myReviews", uid],
    enabled: !!uid,
    queryFn: async ({ pageParam = null }) => {
      let q;

      if (pageParam) {
        q = query(
          collection(db, "reviews"),
          where("authorId", "==", uid),
          orderBy("createdAt", "desc"),
          startAfter(pageParam),
          limit(10)
        );
      } else {
        q = query(
          collection(db, "reviews"),
          where("authorId", "==", uid),
          orderBy("createdAt", "desc"),
          limit(10)
        );
      }

      const snapshot = await getDocs(q);
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];

      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));

      return {
        reviews,
        lastDoc,
      };
    },
    getNextPageParam: (lastPage) => lastPage.lastDoc || undefined,
    onError: (error) => {
      console.error("내 리뷰 조회 중 오류:", error);
    },
  });
};
