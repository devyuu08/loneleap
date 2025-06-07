import { useQuery } from "@tanstack/react-query";
import { hasUserLikedReview } from "@/services/review/hasUserLikedReview";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";
import { toggleReviewLike } from "@/services/review/toggleReviewLike";

/**
 * useReviewLikeStatus
 * - 특정 유저가 해당 리뷰에 좋아요를 눌렀는지 여부 확인
 * - reviewId + userId 기반 쿼리키 구성
 * - enabled 조건을 통해 userId 또는 reviewId 없을 때 요청 방지
 */

export const useReviewLikeStatus = (reviewId, userId) =>
  useQuery({
    queryKey: QUERY_KEYS.REVIEW_LIKE_STATUS(reviewId, userId),
    queryFn: () => hasUserLikedReview(reviewId, userId),
    enabled: !!reviewId && !!userId,
  });

/**
 * useToggleReviewLike
 * - 리뷰 좋아요 상태를 토글하는 mutation 훅
 * - 처리 후 좋아요 상태 및 상세 정보 쿼리 무효화
 * - 메시지는 생략하고, 에러 메시지만 출력
 */

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
