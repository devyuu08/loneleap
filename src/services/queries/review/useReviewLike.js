// queries/review/useReviewLike.js

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
  const { data: hasLiked } = useReviewLikeStatus(reviewId, userId);

  const mutationFn = hasLiked ? unlikeReview : likeReview;

  return useMutation({
    mutationFn: () => mutationFn(reviewId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["review-like-status", reviewId, userId]);
    },
  });
};
