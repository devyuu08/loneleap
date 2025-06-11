import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createReview } from "@/services/review/createReview";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";

/**
 * useAddReview
 * - 리뷰 등록을 위한 mutation 훅
 * - 인증된 사용자만 리뷰 등록 가능
 * - 등록 후 리뷰 목록 캐시 무효화 및 콜백 실행 가능
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
