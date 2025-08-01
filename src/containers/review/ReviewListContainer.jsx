import { useState, useMemo } from "react";
import { useReviews } from "@/hooks/review/useReviews";

import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import EmptyState from "@/components/common/feedback/EmptyState";
import ReviewList from "@/components/review/ReviewList";
import HeroWithFilterSearch from "@/components/common/layout/HeroWithFilterSearch";

import { AlertTriangle } from "lucide-react";

/**
 * ReviewListContainer
 * - 전체 리뷰 목록을 조회하고 정렬/검색 기능을 적용하는 컨테이너 컴포넌트
 * - 정렬 기준(최신순/별점순/좋아요순)과 키워드 검색을 통해 리뷰 데이터를 필터링
 * - 필터링된 결과를 ReviewList 컴포넌트에 전달하여 리스트 UI를 렌더링
 */

const FILTERS = ["최신순", "별점순", "좋아요순"];

export default function ReviewListContainer() {
  const [sort, setSort] = useState("최신순");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: reviews, isLoading, error } = useReviews();

  const filteredReviews = useMemo(() => {
    if (!reviews) return [];

    let result = [...reviews];

    // 정렬
    if (sort === "별점순") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "좋아요순") {
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
      <HeroWithFilterSearch
        imageSrc="/images/review-list-hero.jpg"
        title="LoneLeap 여행자들의 진짜 이야기"
        subtitle="다른 여행자들의 후기를 읽고, 나만의 여행 이야기도 남겨보세요!"
        countLabel="총"
        count={reviews?.length || 0}
        filters={FILTERS}
        activeFilter={sort}
        onFilterChange={setSort}
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        searchPlaceholder="여행지 뱃지로 리뷰 검색"
      />

      {/* 리뷰 리스트 UI 분리 */}
      <ReviewList reviews={filteredReviews} />
    </>
  );
}
