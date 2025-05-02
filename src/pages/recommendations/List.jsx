import { useRecommendationList } from "hooks/useRecommendationList";
import RecommendationCard from "components/recommendation/RecommendationCard";

export default function RecommendationListPage() {
  const { data: recommendations, isLoading, isError } = useRecommendationList();

  if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>;
  if (isError) return <div className="p-10 text-center">오류 발생</div>;
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="py-32 text-center text-gray-500">
        추천 여행지가 없습니다
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((place) => (
        <RecommendationCard key={place.id} recommendation={place} />
      ))}
    </div>
  );
}
