// src/services/queries/useReviews.js
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 최신으로 유지
    cacheTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
    queryFn: async () => {
      const q = query(
        collection(db, "reviews"),
        orderBy("createdAt", "desc"),
        limit(20) // 한 번에 가져올 리뷰 수 제한
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Firestore 타임스탬프를 JavaScript Date 객체로 변환
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    },
    onError: (error) => {
      console.error("리뷰를 불러오는 중 오류가 발생했습니다:", error);
      // 필요한 경우 추가 에러 처리 로직
    },
  });
};
