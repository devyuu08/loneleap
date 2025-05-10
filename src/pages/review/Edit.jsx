import { useParams } from "react-router-dom";
import { useReviewDetail } from "services/queries/review/useReviewDetail";
import ReviewForm from "components/review/ReviewForm";

export default function EditReviewPage() {
  const { id } = useParams();
  const { data, isLoading } = useReviewDetail(id);

  if (isLoading) return <div className="text-center py-20">로딩 중...</div>;
  if (!data) return <div>리뷰를 찾을 수 없습니다.</div>;

  return <ReviewForm initialData={data} isEditMode={true} />;
}
