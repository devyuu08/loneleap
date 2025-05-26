import ReportButton from "components/Review/ReportButton";
import LikeButton from "components/review/LikeButton";

import ReviewHero from "components/review/ReviewHero";
import FloatingButtons from "components/common/FloatingButtons";
import CommentListContainer from "containers/review/CommentListContainer";

export default function ReviewDetail({
  reviewId,
  review,
  onDelete,
  isDeletePending,
  isOwner,
}) {
  const { content, likesCount } = review;

  return (
    <article className="pb-16">
      {/* Hero 섹션 */}
      <ReviewHero review={review} />

      <div className="px-4 mt-12">
        {/* 본문 내용 */}
        <div className="space-y-8">
          {review.type === "standard" ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <p className="text-base leading-relaxed text-gray-700 whitespace-pre-line">
                {content || "리뷰 내용이 없습니다."}
              </p>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-sm p-10 rounded-2xl shadow border border-gray-100 space-y-12">
              {review.interviewQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className={
                    index !== 0 ? "pt-10 border-t border-gray-300/30" : ""
                  }
                >
                  <h4 className="text-[18px] font-semibold text-gray-800 tracking-tight leading-snug">
                    Q. {q.text}
                  </h4>
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <p className="text-[16px] text-gray-700 leading-loose whitespace-pre-line tracking-wide">
                      {review.interviewAnswers?.[q.id] || "답변 없음"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 좋아요 / 신고 */}
        <div className="flex justify-end items-center mt-10 text-sm text-gray-600 gap-6">
          <div className="transition hover:scale-105">
            <LikeButton
              reviewId={reviewId}
              likesCount={likesCount}
              variant="detail"
            />
          </div>
          <div className="transition hover:scale-105">
            <ReportButton reviewId={reviewId} />
          </div>
        </div>

        {isOwner && (
          <FloatingButtons
            editPath={`/reviews/edit/${reviewId}`}
            onDelete={() => onDelete(reviewId)}
            isDeletePending={isDeletePending}
          />
        )}

        {/* 구분선 */}
        <div className="my-12 border-t border-gray-200" />

        {/* 댓글 */}
        <section className="max-w-6xl mx-auto px-4 mt-16 flex flex-col md:flex-row gap-8">
          {/* 댓글 작성 & 리스트 - 왼쪽 영역 */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                혼행자의 감상 한 줄
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                같은 장소, 다른 감정. 다른 여행자의 시선을 통해 더 깊이
                바라보세요.
              </p>
              <CommentListContainer reviewId={reviewId} />
            </div>
          </div>

          {/* 유의사항 카드 - 오른쪽 영역 */}
          <aside className="md:w-1/3">
            <div className="bg-gray-100/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-5 text-sm text-gray-700 leading-relaxed shadow-md">
              <p className="font-semibold text-gray-800 mb-2">
                댓글 작성 시 유의사항
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
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
