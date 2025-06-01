import { useQuery } from "@tanstack/react-query";
import { hasUserLikedReview } from "@/services/review/hasUserLikedReview";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";
import { toggleReviewLike } from "@/services/review/toggleReviewLike";

export const useReviewLikeStatus = (reviewId, userId) =>
  useQuery({
    queryKey: QUERY_KEYS.REVIEW_LIKE_STATUS(reviewId, userId),
    queryFn: () => hasUserLikedReview(reviewId, userId),
    enabled: !!reviewId && !!userId,
  });

export const useToggleReviewLike = (reviewId, userId) => {
  return useMutationWithFeedback({
    mutationFn: () => toggleReviewLike(reviewId, userId),
    successMessage: "", // 메시지 생략
    errorMessage: "좋아요 처리 중 오류가 발생했습니다.",
    queryKeysToInvalidate: [
      QUERY_KEYS.REVIEW_LIKE_STATUS(reviewId, userId),
      QUERY_KEYS.REVIEW_DETAIL(reviewId),
    ],
  });
};
