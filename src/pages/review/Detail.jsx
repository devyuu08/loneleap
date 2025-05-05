import { useParams, useNavigate } from "react-router-dom";
import { useReviewDetail } from "services/queries/review/useReviewDetail";
import LoadingSpinner from "components/common/LoadingSpinner";
import NotFoundMessage from "components/common/NotFoundMessage";
import ReportButton from "components/Review/ReportButton";

import { formatDate } from "utils/formatDate";
import { useUser } from "hooks/useUser";

import LikeButton from "components/review/LikeButton";
import CommentList from "components/review/CommentList";

export default function ReviewDetailPage() {
  const { id } = useParams();
  const { user } = useUser();
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
    likesCount,
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
          src={imageUrl || "/images/no_image.png"}
          alt="리뷰 이미지"
          onError={(e) => {
            // 무한 반복 방지
            if (e.target.src.includes("no_image.png")) return;
            e.target.onerror = null;
            e.target.src = "/images/no_image.png";
          }}
          className={`w-full rounded-lg bg-gray-100 ${
            imageUrl
              ? "object-cover aspect-[4/3]"
              : "object-contain max-h-[400px]"
          }`}
        />
      </div>

      <div className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
        {content || "리뷰 내용이 없습니다."}
      </div>

      <div className="flex justify-end items-center gap-4 mt-8">
        <LikeButton reviewId={id} likesCount={likesCount} />
        <ReportButton reviewId={id} />
      </div>

      {/* 🔽 댓글 섹션 추가 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">댓글</h2>
        <CommentList currentUserId={user?.uid} />
      </section>
    </article>
  );
}
