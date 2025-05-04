import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  likeReview,
  unlikeReview,
  hasUserLikedReview,
} from "services/reviewLikeService";

export const useReviewLikeStatus = (reviewId, userId) =>
  useQuery({
    queryKey: ["review-like-status", reviewId, userId],
    queryFn: () => hasUserLikedReview(reviewId, userId),
    enabled: !!reviewId && !!userId,
  });

export const useToggleReviewLike = (reviewId, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const hasLiked = await hasUserLikedReview(reviewId, userId);
      return hasLiked
        ? unlikeReview(reviewId, userId)
        : likeReview(reviewId, userId);
    },
    onSuccess: async () => {
      // 좋아요 상태 캐시 무효화
      await queryClient.invalidateQueries([
        "review-like-status",
        reviewId,
        userId,
      ]);

      queryClient.invalidateQueries(["review-detail", reviewId]);
    },
  });
};
