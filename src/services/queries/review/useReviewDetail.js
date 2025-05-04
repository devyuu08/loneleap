import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

/**
 * 특정 리뷰의 상세 정보를 가져오는 커스텀 훅
 * @param {string} id - 조회할 리뷰의 ID
 * @returns {Object} - 리뷰 데이터와 로딩/에러 상태
 */
export const useReviewDetail = (id) => {
  return useQuery({
    queryKey: ["review-detail", id],
    queryFn: async () => {
      try {
        const docRef = doc(db, "reviews", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          throw new Error("리뷰가 존재하지 않습니다.");
        }

        return { id: snapshot.id, ...snapshot.data() };
      } catch (error) {
        if (error.message === "리뷰가 존재하지 않습니다.") {
          throw error;
        }
        throw new Error(`리뷰 조회 중 오류가 발생했습니다: ${error.message}`);
      }
    },
    enabled: !!id, // id가 있을 때만 실행
  });
};
