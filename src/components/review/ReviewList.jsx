import ReviewCard from "@/components/review/ReviewCard";

export default function ReviewList({ reviews }) {
  return (
    <>
      {/* 헤더 + 필터 */}

      {/* 리뷰 카드 목록 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-32">
              <p className="text-lg font-semibold mb-2">리뷰가 없습니다</p>
              <p className="text-sm">
                다른 지역을 선택하거나 검색어를 바꿔보세요.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
