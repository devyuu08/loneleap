import { useMemo, useState } from "react";
import { useRecommendationList } from "@/hooks/recommendation/useRecommendationList";
import RecommendationList from "@/components/recommendation/RecommendationList";

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
