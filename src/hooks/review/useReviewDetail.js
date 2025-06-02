import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * 특정 리뷰의 상세 정보를 가져오는 커스텀 훅
 * @param {string} id - 조회할 리뷰의 ID
 * @returns {Object} - 리뷰 데이터와 로딩/에러 상태
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
