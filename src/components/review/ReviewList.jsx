import ReviewCard from "@/components/review/ReviewCard";
import EmptyState from "@/components/common/feedback/EmptyState";
import { MessageSquareWarning } from "lucide-react";

export default function ReviewList({ reviews }) {
  return (
    <>
      {/* 리뷰 카드 목록 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center h-60 text-center">
              <EmptyState
                icon={<MessageSquareWarning className="w-8 h-8" />}
                title="리뷰가 없습니다"
                description="다른 지역을 선택하거나 검색어를 바꿔보세요."
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
