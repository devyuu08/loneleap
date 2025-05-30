import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createReview } from "@/services/review/createReview";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";

/**
 * 리뷰 추가 기능을 제공하는 커스텀 훅
 * @param {Object} options - 훅 옵션
 * @param {Function} options.onSuccessCallback - 성공 시 콜백
 * @param {Function} options.onErrorCallback - 실패 시 콜백
 * @returns {Object} 리뷰 추가 관련 함수와 상태
 */
export default function useAddReview({
  onSuccessCallback,
  onErrorCallback,
} = {}) {
  const user = useSelector((state) => state.user.user);

  const checkAuth = () => {
    if (!user) {
      throw new Error("로그인이 필요한 서비스입니다.");
    }
  };

  return useMutationWithFeedback({
    mutationFn: async (review) => {
      checkAuth();
      return await createReview(review, user);
    },
    successMessage: "리뷰가 성공적으로 등록되었습니다!",
    errorMessage: "리뷰 등록 중 오류가 발생했습니다.",
    queryKeysToInvalidate: [[QUERY_KEYS.REVIEWS]],
    redirectTo: "",
    onSuccessCallback,
    onErrorCallback,
  });
}
