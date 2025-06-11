import { useMemo, useState } from "react";
import { useRecommendationList } from "@/hooks/recommendation/useRecommendationList";
import RecommendationList from "@/components/recommendation/RecommendationList";

/**
 * RecommendationListContainer
 * - 추천 여행지 리스트 필터링 로직 및 상태 관리
 * - 전체/지역별 필터링 처리 후 추천 리스트 컴포넌트에 전달
 */

const FILTER_ALL = "전체 지역";

export default function RecommendationListContainer() {
  const { data: recommendations, isLoading, isError } = useRecommendationList();
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);

  const filtered = useMemo(() => {
    if (!recommendations) return [];
    if (activeFilter === FILTER_ALL) return recommendations;
    return recommendations.filter((item) => item.location === activeFilter);
  }, [recommendations, activeFilter]);

  return (
    <RecommendationList
      recommendations={filtered}
      originalData={recommendations}
      isLoading={isLoading}
      isError={isError}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
    />
  );
}
