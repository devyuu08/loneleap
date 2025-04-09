// src/components/Review/ReviewList.jsx
import { useState } from "react";

import { useReviews } from "services/queries/useReviews";

import ReviewCard from "./ReviewCard";
import LoadingSpinner from "components/LoadingSpinner";
import EmptyState from "components/EmptyState";
import ReviewSortButtons from "./ReviewSortButtons";

export default function ReviewList() {
  const [sort, setSort] = useState("latest"); // 정렬 상태
  const { data: reviews, isLoading } = useReviews();

  if (isLoading) return <LoadingSpinner />;
  if (!reviews || reviews.length === 0)
    return (
      <EmptyState
        icon="📝"
        title="등록된 리뷰가 없습니다"
        description="다녀온 여행의 후기를 남겨보세요!"
      />
    );

  return (
    <div>
      {/* 정렬 버튼 UI (기능 없음) */}
      <ReviewSortButtons sort={sort} onChange={setSort} />

      {/* 리뷰 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
