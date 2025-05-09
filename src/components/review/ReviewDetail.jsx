import { useReviewDetail } from "services/queries/review/useReviewDetail";
import LoadingSpinner from "components/common/LoadingSpinner";
import NotFoundMessage from "components/common/NotFoundMessage";
import ReportButton from "components/Review/ReportButton";
import LikeButton from "components/review/LikeButton";
import CommentList from "components/review/CommentList";
import { useUser } from "hooks/useUser";
import ReviewHero from "components/review/ReviewHero";

export default function ReviewDetail({ reviewId }) {
  const { user } = useUser();
  const { data, isLoading, isError } = useReviewDetail(reviewId);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <NotFoundMessage message="리뷰를 찾을 수 없습니다." />;

  const { content, likesCount } = data;

  return (
    <article className="pb-16">
      {/* Hero 섹션 */}
      <ReviewHero review={data} />

      <div className="px-4 mt-12">
        {/* 본문 내용 */}
        <div className="relative pl-6 border-l-2 border-dashed border-gray-300 text-gray-800 bg-[#F4F4F5]/50 p-6 rounded-xl">
          <p className="text-sm text-gray-500 mb-2">기억하고 싶은 순간</p>
          <div className="text-[16px] leading-relaxed tracking-wide whitespace-pre-line">
            {content || "리뷰 내용이 없습니다."}
          </div>
        </div>

        {/* 좋아요 / 신고 */}
        <div className="flex justify-end items-center mt-10 text-sm text-gray-400">
          <div className="flex gap-4 items-center text-gray-500">
            <LikeButton
              reviewId={reviewId}
              likesCount={likesCount}
              variant="detail"
            />
            <ReportButton reviewId={reviewId} />
          </div>
        </div>

        {/* 댓글 */}
        <section className="max-w-4xl mx-auto px-4 mt-12">
          <h2 className="text-xl font-semibold mb-4">댓글</h2>
          <CommentList currentUserId={user?.uid} reviewId={reviewId} />
        </section>
      </div>
    </article>
  );
}
