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

        {/* 구분선 */}
        <div className="my-12 border-t border-gray-200" />

        {/* 댓글 */}
        <section className="max-w-6xl mx-auto px-4 mt-16 flex flex-col md:flex-row gap-8">
          {/* 댓글 작성 & 리스트 - 왼쪽 영역 */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              혼행자의 감상 한 줄
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              같은 장소, 다른 감정. 다른 여행자의 시선을 통해 더 깊이
              바라보세요.
            </p>
            <CommentList currentUserId={user?.uid} reviewId={reviewId} />
          </div>

          {/* 유의사항 카드 - 오른쪽 영역 */}
          <aside className="md:w-1/3">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm leading-relaxed text-gray-600 shadow-sm">
              <p className="font-semibold text-gray-800 mb-2">
                댓글 작성 시 유의사항
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>비방, 욕설, 혐오 표현은 삭제될 수 있어요.</li>
                <li>개인 정보는 입력하지 말아주세요.</li>
                <li>여기 남긴 감정이 또 다른 여행의 시작이 됩니다.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </article>
  );
}
