// src/pages/Reviews/Detail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useReviewDetail } from "services/queries/useReviewDetail";
import LoadingSpinner from "components/LoadingSpinner";
import NotFoundMessage from "components/NotFoundMessage";
import ReportButton from "components/Review/ReportButton";
import { formatDate } from "utils/formatDate";

export default function ReviewDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useReviewDetail(id);

  const navigate = useNavigate();

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
    <article className="max-w-3xl mx-auto py-10 px-4 bg-white rounded-lg shadow-sm">
      <header>
        <div className="mb-2">
          <button
            onClick={() => navigate("/reviews")}
            className="text-sm text-gray-500 mb-2 hover:underline"
            aria-label="리뷰 목록으로 돌아가기"
          >
            ← 목록으로 돌아가기
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500 text-sm mb-4">
          {destination} ·{" "}
          <span aria-label={`평점 ${rating}점`}>⭐ {rating}</span> ·{" "}
          {authorName}
        </p>
        <p className="text-gray-400 text-xs mb-6">{formatDate(createdAt)}</p>
      </header>

      <div className="mb-6">
        <img
          src={imageUrl || "/free-icon-no-pictures-3875148.png"}
          alt="리뷰 이미지"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/free-icon-no-pictures-3875148.png";
          }}
          className="w-full max-h-[400px] object-cover rounded-lg"
        />
      </div>

      <div className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
        {content || "리뷰 내용이 없습니다."}
      </div>

      <div className="flex justify-end">
        <ReportButton reviewId={id} />
      </div>
    </article>
  );
}
