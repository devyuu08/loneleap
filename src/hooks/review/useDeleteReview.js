import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { deleteReviewWithCount } from "@/services/review/deleteReviewWithCount";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";
import { useAuthState } from "react-firebase-hooks/auth";

export const useDeleteReview = () => {
  const [user] = useAuthState(auth);

  return useMutationWithFeedback({
    mutationFn: deleteReviewWithCount,
    successMessage: "리뷰가 삭제되었습니다.",
    errorMessage: "리뷰 삭제 중 오류가 발생했습니다.",
    queryKeysToInvalidate: [
      [QUERY_KEYS.REVIEWS],
      QUERY_KEYS.MY_REVIEWS(user?.uid),
    ],
    redirectTo: "/reviews",
  });
};
