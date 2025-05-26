export const QUERY_KEYS = {
  REVIEWS: "reviews",
  REVIEW_DETAIL: (reviewId) => ["review-detail", reviewId],
  MY_REVIEWS: (uid) => ["myReviews", uid],
  RECENT_REVIEWS: "recentReviews",
  REVIEW_LIKE_STATUS: (reviewId, userId) => [
    "review-like-status",
    reviewId,
    userId,
  ],
  COMMENTS: (reviewId) => ["comments", reviewId],
  ITINERARIES: "itineraries",
  MY_ITINERARIES: (uid) => ["myItineraries", uid],
  ITINERARY_DETAIL: (id) => ["itineraryDetail", id],
  REGION_COUNTS: "regionCounts",
};
