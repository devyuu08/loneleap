import { useParams } from "react-router-dom";
import { useRecommendationDetail } from "hooks/useRecommendationDetail";
import RecommendationDetail from "components/recommendation/RecommendationDetail";

export default function RecommendationDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useRecommendationDetail(id);

  if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>;
  if (isError || !data)
    return (
      <div className="p-10 text-center text-gray-500">
        해당 여행지를 찾을 수 없습니다.
      </div>
    );

  return <RecommendationDetail data={data} />;
}
