import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { deleteReviewWithCount } from "@/services/review/deleteReviewWithCount";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";

export const useDeleteReview = () => {
  return useMutationWithFeedback({
    mutationFn: deleteReviewWithCount,
    successMessage: "리뷰가 삭제되었습니다.",
    errorMessage: "리뷰 삭제 중 오류가 발생했습니다.",
    queryKeysToInvalidate: [
      [QUERY_KEYS.REVIEWS],
      QUERY_KEYS.MY_REVIEWS(auth.currentUser?.uid),
    ],
    redirectTo: "/reviews",
  });
};
