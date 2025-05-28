import { useState, useMemo } from "react";
import { useReviews } from "@/hooks/review/useReviews";

import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import EmptyState from "@/components/common/feedback/EmptyState";
import ReviewList from "@/components/review/ReviewList";
import HeroSection from "@/components/common/layout/HeroSection";

import { AlertTriangle, Search } from "lucide-react";

export default function ReviewListContainer() {
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
    } else if (sort === "likes") {
      result.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
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
        icon={<AlertTriangle className="w-8 h-8 text-red-400" />}
        title="리뷰를 불러오는데 문제가 발생했습니다"
        description="잠시 후 다시 시도해주세요."
      />
    );

  return (
    <>
      <HeroSection imageSrc="/images/review-list-hero.jpg" align="center">
        {/* 헤드라인 */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-extrabold drop-shadow">
            LoneLeap 여행자들의 진짜 이야기
          </h2>
          <p className="text-sm text-white/90">
            다른 여행자들의 후기를 읽고, 나만의 여행 이야기도 남겨보세요!
          </p>
          <p className="text-xs text-white/60">
            총 {reviews?.length || 0}개의 리뷰
          </p>
        </div>

        {/* 정렬 & 검색 */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSort("latest")}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                sort === "latest"
                  ? "bg-white text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
              } transition`}
            >
              최신순
            </button>
            <button
              onClick={() => setSort("rating")}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                sort === "rating"
                  ? "bg-white text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
              } transition`}
            >
              별점순
            </button>
            <button
              onClick={() => setSort("likes")}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                sort === "likes"
                  ? "bg-white text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
              } transition`}
            >
              좋아요순
            </button>
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-4 h-4" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="여행지 이름으로 리뷰 검색"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/90 text-gray-800 text-sm border border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>
      </HeroSection>

      {/* 리뷰 리스트 UI 분리 */}
      <ReviewList reviews={filteredReviews} />
    </>
  );
}
