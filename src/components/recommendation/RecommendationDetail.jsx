import { useParams } from "react-router-dom";
import { useRecommendationDetail } from "hooks/useRecommendationDetail";

export default function RecommendationDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useRecommendationDetail(id);

  if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>;
  if (isError || !data)
    return (
      <div className="p-10 text-center text-gray-500">
        오류 또는 데이터 없음
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
      {/* 이후 상세 내용 렌더링할 자리 */}
    </div>
  );
}
