import CommentItem from "@/components/review/CommentItem";
import { Send } from "lucide-react";

/**
 * CommentListSection
 * - 댓글 목록을 렌더링하는 영역 컴포넌트
 * - 로딩/빈 상태/목록 3가지 상태에 따라 UI 분기 처리
 * - CommentItem 컴포넌트를 반복 렌더링
 */

export default function CommentListSection({
  comments,
  isLoading,
  currentUserId,
  reviewId,
}) {
  if (isLoading) {
    return <p className="text-gray-500 text-sm">댓글을 불러오는 중...</p>;
  }

  // 댓글 없음
  if (!comments || comments.length === 0) {
    return (
      <section
        className="text-center text-gray-400 py-12"
        aria-labelledby="no-comments-heading"
      >
        <div className="flex justify-center mb-4">
          <Send className="w-10 h-10 opacity-30" />
        </div>

        <h3
          id="no-comments-heading"
          className="font-semibold text-sm mb-1 text-gray-500"
        >
          아직 남겨진 이야기가 없어요
        </h3>

        <p className="text-sm mb-4 text-gray-500">
          이 여행지에서의 <strong>특별한 순간</strong>을 나눠주세요.
          <br />
          당신의 이야기가 다른 혼행자들의 공감이 될 수 있어요.
        </p>

        <button
          onClick={() => document.getElementById("comment-textarea")?.focus()}
          className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-900 transition"
          aria-label="첫 번째 댓글 입력창으로 이동"
        >
          첫 번째 코멘트 남기기
        </button>
      </section>
    );
  }

  // 댓글 목록 렌더링
  return (
    <section className="space-y-4" aria-label="댓글 목록">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          reviewId={reviewId}
        />
      ))}
    </section>
  );
}
