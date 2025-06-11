import React from "react";
import CommentForm from "@/components/review/CommentForm";
import CommentListSection from "@/components/review/CommentListSection";

/**
 * CommentList
 * - 리뷰 상세 페이지에서 댓글 입력과 댓글 목록 표시를 담당하는 컴포넌트
 * - CommentForm + CommentListSection 구성
 * - 현재 유저 ID, 작성 중 상태, 로딩 상태 등을 props로 받아 처리
 */

function CommentList({
  currentUserId,
  reviewId,
  user,
  content,
  setContent,
  comments,
  isLoading,
  isPending,
  handleSubmit,
}) {
  return (
    <section
      className="bg-white rounded-2xl shadow-sm px-6 py-8 space-y-8"
      aria-labelledby="comment-section-heading"
    >
      {/* 댓글 작성 영역 */}
      <div>
        <h3
          id="comment-section-heading"
          className="text-base font-semibold text-gray-900 mb-4"
        >
          이 여행지에서의 감정을 나눠보세요
        </h3>

        <CommentForm
          user={user}
          content={content}
          setContent={setContent}
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </div>

      {/* 댓글 목록 */}
      <div>
        <h4 className="text-sm text-gray-500 font-medium mb-4">
          여행자들의 감성 코멘트{" "}
          <span className="ml-1 text-gray-400 font-normal">
            ({comments?.length || 0})
          </span>
        </h4>

        <CommentListSection
          comments={comments}
          isLoading={isLoading}
          currentUserId={currentUserId}
          reviewId={reviewId}
        />
      </div>
    </section>
  );
}

export default React.memo(CommentList);
