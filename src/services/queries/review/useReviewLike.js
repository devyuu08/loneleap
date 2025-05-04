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
    onSuccess: () => {
      queryClient.invalidateQueries(["review-like-status", reviewId, userId]);
      // queryClient.invalidateQueries(["review-list"]); // 좋아요 수 포함 리스트라면 함께 무효화
    },
  });
};
