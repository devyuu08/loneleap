import { likeReview } from "@/services/review/likeReview";
import { unlikeReview } from "@/services/review/unlikeReview";
import { hasUserLikedReview } from "@/services/review/hasUserLikedReview";

export const toggleReviewLike = async (reviewId, userId) => {
  const hasLiked = await hasUserLikedReview(reviewId, userId);
  return hasLiked
    ? unlikeReview(reviewId, userId)
    : likeReview(reviewId, userId);
};
