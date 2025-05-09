import { useNavigate } from "react-router-dom";
import { useReviewDetail } from "services/queries/review/useReviewDetail";
import LoadingSpinner from "components/common/LoadingSpinner";
import NotFoundMessage from "components/common/NotFoundMessage";
import ReportButton from "components/Review/ReportButton";
import LikeButton from "components/review/LikeButton";
import CommentList from "components/review/CommentList";
import { useUser } from "hooks/useUser";
import ReviewHero from "components/review/ReviewHero"; // 추가된 Hero 컴포넌트

export default function ReviewDetail({ reviewId }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useReviewDetail(reviewId);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <NotFoundMessage message="리뷰를 찾을 수 없습니다." />;

  const { content, likesCount } = data;

  return (
    <article className="pb-16">
      {/* Hero 섹션 */}
      <ReviewHero review={data} />

      <div className="max-w-3xl mx-auto px-4 mt-12">
        {/* 본문 내용 */}
        <div className="text-gray-800 leading-relaxed mb-8 whitespace-pre-line">
          {content || "리뷰 내용이 없습니다."}
        </div>

        {/* 좋아요 / 신고 */}
        <div className="flex justify-end items-center gap-4">
          <LikeButton reviewId={reviewId} likesCount={likesCount} />
          <ReportButton reviewId={reviewId} />
        </div>

        {/* 댓글 */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">댓글</h2>
          <CommentList currentUserId={user?.uid} reviewId={reviewId} />
        </section>
      </div>
    </article>
  );
}
