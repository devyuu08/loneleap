// src/pages/Reviews/Detail.jsx
import { useParams } from "react-router-dom";
import { useReviewDetail } from "services/queries/useReviewDetail";
import LoadingSpinner from "components/LoadingSpinner";
import NotFoundMessage from "components/NotFoundMessage";
import ReportButton from "components/Review/ReportButton";

export default function ReviewDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useReviewDetail(id);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <NotFoundMessage message="리뷰를 찾을 수 없습니다." />;

  const {
    title,
    destination,
    content,
    rating,
    authorName,
    createdAt,
    imageUrl,
  } = data;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        {destination} · ⭐ {rating} · {authorName}
      </p>
      <p className="text-gray-400 text-xs mb-6">
        {createdAt?.toDate?.().toLocaleString() || "날짜 없음"}
      </p>

      {imageUrl && (
        <div className="mb-6">
          <img
            src={imageUrl}
            alt="리뷰 이미지"
            className="w-full max-h-[400px] object-cover rounded-lg"
          />
        </div>
      )}

      <div className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
        {content}
      </div>

      <div className="flex justify-end">
        <ReportButton reviewId={id} />
      </div>
    </div>
  );
}
