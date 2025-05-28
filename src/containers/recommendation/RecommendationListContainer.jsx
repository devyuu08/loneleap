import { useState } from "react";
import { useRecommendationList } from "@/hooks/recommendation/useRecommendationList";
import RecommendationList from "@/components/recommendation/RecommendationList";

export default function RecommendationListContainer() {
  const { data: recommendations, isLoading, isError } = useRecommendationList();
  const [activeFilter, setActiveFilter] = useState("전체 지역");

  const filtered =
    activeFilter === "전체 지역"
      ? recommendations
      : recommendations?.filter((item) => item.location === activeFilter);

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
