import { likeReview } from "@/services/review/likeReview";
import { unlikeReview } from "@/services/review/unlikeReview";
import { hasUserLikedReview } from "@/services/review/hasUserLikedReview";

/**
 * 리뷰 좋아요 상태를 토글
 * @param {string} reviewId - 리뷰 ID
 * @param {string} userId - 사용자 ID
 * @returns {Promise<void>}
 */

export async function toggleReviewLike(reviewId, userId) {
  const hasLiked = await hasUserLikedReview(reviewId, userId);
  return hasLiked
    ? unlikeReview(reviewId, userId)
    : likeReview(reviewId, userId);
}
