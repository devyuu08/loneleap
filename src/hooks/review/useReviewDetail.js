import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * useReviewDetail
 * - 특정 리뷰의 상세 정보를 조회하는 query 훅
 * - reviewId 기반으로 Firestore에서 문서 fetch
 * - 존재하지 않을 경우 예외 처리 포함
 */

export const useReviewDetail = (reviewId) => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEW_DETAIL(reviewId),
    queryFn: async () => {
      const docRef = doc(db, "reviews", reviewId);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        throw new Error("리뷰가 존재하지 않습니다.");
      }

      return { id: snapshot.id, ...snapshot.data() };
    },
    enabled: !!reviewId,
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 30 * 60 * 1000, // 30분
    onError: (err) => {
      console.error("리뷰 상세 조회 오류:", err);
    },
  });
};
