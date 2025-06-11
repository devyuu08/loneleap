import ReviewCard from "@/components/review/ReviewCard";
import EmptyState from "@/components/common/feedback/EmptyState";
import { MessageSquareWarning } from "lucide-react";

/**
 * ReviewList
 * - 리뷰 카드 리스트를 그리드 형태로 렌더링하는 컴포넌트
 * - 리뷰가 없을 경우 EmptyState 컴포넌트로 대체 표시
 * - 시멘틱 태그 <section>, <article> 사용하여 문서 구조 명확화
 */

export default function ReviewList({ reviews }) {
  return (
    <>
      <section
        className="max-w-7xl mx-auto px-6 md:px-12 py-16"
        aria-labelledby="review-list-heading"
      >
        {/* 섹션 제목 (시각적으로는 숨김) */}
        <h2 id="review-list-heading" className="sr-only">
          사용자 리뷰 목록
        </h2>

        {/* 리뷰 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <article key={review.id}>
                <ReviewCard review={review} />
              </article>
            ))
          ) : (
            // 리뷰 없음 상태 처리
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
