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

export const useMyReviews = (uid, options = {}) => {
  return useInfiniteQuery({
    queryKey: ["myReviews", uid],
    enabled: !!uid && options.enabled !== false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.lastDoc || undefined,
    onError: (error) => {
      console.error("내 리뷰 조회 중 오류:", error);
    },
    ...options,
    queryFn: async ({ pageParam = null }) => {
      const baseQuery = [
        collection(db, "reviews"),
        where("authorId", "==", uid),
        orderBy("createdAt", "desc"),
      ];

      const q = pageParam
        ? query(...baseQuery, startAfter(pageParam), limit(10))
        : query(...baseQuery, limit(10));

      const snapshot = await getDocs(q);
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];

      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));

      return { reviews, lastDoc };
    },
  });
};
