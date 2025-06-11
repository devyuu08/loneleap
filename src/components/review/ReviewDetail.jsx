import ReviewHero from "@/components/review/ReviewHero";
import FloatingButtons from "@/components/common/button/FloatingButtons";
import CommentListContainer from "@/containers/review/CommentListContainer";
import LikeButtonContainer from "@/containers/review/LikeButtonContainer";
import ReportButtonContainer from "@/containers/review/ReportButtonContainer";
import QuestionAnswerBlock from "@/components/review/QuestionAnswerBlock";
import { useCallback } from "react";

/**
 * ReviewDetail
 * - 리뷰 상세 페이지 본문을 렌더링하는 컴포넌트
 * - 텍스트형/인터뷰형 리뷰 유형에 따라 본문을 조건부 렌더링
 * - 좋아요, 신고, 댓글 기능 포함
 * - 리뷰 작성자일 경우 수정/삭제 버튼 노출
 */

export default function ReviewDetail({
  reviewId,
  review,
  onDelete,
  isDeletePending,
  isOwner,
}) {
  const { content, likesCount, interviewQuestions, interviewAnswers, type } =
    review;

  const handleDelete = useCallback(() => {
    onDelete(reviewId);
  }, [onDelete, reviewId]);

  return (
    <article className="pb-16">
      {/* 리뷰 상단 Hero 영역 */}
      <ReviewHero review={review} />

      <div className="px-4 mt-12">
        {/* 리뷰 본문 내용 */}
        <section className="space-y-8">
          {type === "standard" ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <p className="text-base leading-relaxed text-gray-700 whitespace-pre-line">
                {content || "리뷰 내용이 없습니다."}
              </p>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-sm p-10 rounded-2xl shadow border border-gray-100 space-y-12">
              {interviewQuestions.map((q, index) => (
                <QuestionAnswerBlock
                  key={q.id}
                  question={q.text}
                  answer={interviewAnswers?.[q.id]}
                  isFirst={index === 0}
                />
              ))}
            </div>
          )}
        </section>

        {/* 좋아요 / 신고 버튼 */}
        <section className="flex justify-end items-center mt-10 text-sm text-gray-600 gap-6">
          <div className="transition hover:scale-105">
            <LikeButtonContainer
              reviewId={reviewId}
              likesCount={likesCount}
              variant="detail"
            />
          </div>
          <div className="transition hover:scale-105">
            <ReportButtonContainer reviewId={reviewId} />
          </div>
        </section>

        {/* 작성자일 경우: 수정/삭제 버튼 노출 */}
        {isOwner && (
          <FloatingButtons
            editPath={`/reviews/edit/${reviewId}`}
            onDelete={handleDelete}
            isDeletePending={isDeletePending}
          />
        )}

        {/* 구분선 */}
        <hr className="my-12 border-gray-200" />

        {/* 댓글 및 주의사항 */}
        <section className="max-w-6xl mx-auto px-4 mt-16 flex flex-col md:flex-row gap-8">
          {/* 댓글 작성 및 리스트 */}
          <div className="w-full md:w-2/3">
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <header>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  혼행자의 감상 한 줄
                </h2>
                <p className="text-sm text-gray-500 mb-6 hidden md:block">
                  같은 장소, 다른 감정. 다른 여행자의 시선을 통해 더 깊이
                  바라보세요.
                </p>
              </header>
              <CommentListContainer reviewId={reviewId} />
            </section>
          </div>

          {/* 댓글 유의사항 (PC 전용) */}
          <aside className="w-full md:w-1/3 hidden md:block">
            <section className="bg-gray-100/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-5 text-sm text-gray-700 leading-relaxed shadow-md">
              <p className="font-semibold text-gray-800 mb-2">
                댓글 작성 시 유의사항
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>비방, 욕설, 혐오 표현은 삭제될 수 있어요.</li>
                <li>개인 정보는 입력하지 말아주세요.</li>
                <li>여기 남긴 감정이 또 다른 여행의 시작이 됩니다.</li>
              </ul>
            </section>
          </aside>
        </section>
      </div>
    </article>
  );
}
