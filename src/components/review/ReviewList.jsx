import { useState, useMemo } from "react";
import { useReviews } from "services/queries/review/useReviews";

import ReviewCard from "components/review/ReviewCard";
import LoadingSpinner from "components/common/LoadingSpinner";
import EmptyState from "components/common/EmptyState";
import { Search } from "lucide-react";
import CreateCard from "components/common/CreateCard";

export default function ReviewList() {
  const [sort, setSort] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: reviews, isLoading, error } = useReviews();

  const filteredReviews = useMemo(() => {
    if (!reviews) return [];

    let result = [...reviews];

    // 정렬
    if (sort === "latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    // 검색
    if (searchKeyword.trim()) {
      result = result.filter((r) =>
        r.destination
          ?.toLowerCase()
          .includes(searchKeyword.trim().toLowerCase())
      );
    }

    return result;
  }, [reviews, sort, searchKeyword]);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <EmptyState
        icon="⚠️"
        title="리뷰를 불러오는데 문제가 발생했습니다"
        description="잠시 후 다시 시도해주세요."
      />
    );

  return (
    <>
      {/* 헤더 + 필터 */}
      <section className="bg-[#F9FAFB] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
          {/* 제목 */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">여행 리뷰 목록</h2>
            <p className="text-sm text-gray-500 py-1">
              다른 여행자들의 후기를 읽고, 나만의 여행 이야기도 남겨보세요!
            </p>
            <p className="text-xs text-gray-400">
              총 {reviews?.length || 0}개의 리뷰
            </p>
          </div>

          {/* 정렬 버튼 + 검색창 */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* 정렬 필터 */}
            <div className="flex gap-2">
              <button
                onClick={() => setSort("latest")}
                className={`px-4 py-1.5 rounded-full text-sm border transition ${
                  sort === "latest"
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSort("rating")}
                className={`px-4 py-1.5 rounded-full text-sm border transition ${
                  sort === "rating"
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                별점순
              </button>
            </div>

            {/* 검색창 */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="여행지 이름으로 리뷰 검색"
                className="w-full pl-10 pr-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 리뷰 카드 목록 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 항상 표시되는 리뷰 생성 카드 */}
          <CreateCard
            to="/reviews/new"
            title="여행 후기 작성하기"
            description="여행의 감동을 나누고, 다음 여행자를 도와주세요"
            buttonLabel="리뷰 작성하기"
          />

          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
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
