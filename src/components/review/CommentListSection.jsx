import CommentItem from "@/components/review/CommentItem";
import { Send } from "lucide-react";

export default function CommentListSection({
  comments,
  isLoading,
  currentUserId,
  reviewId,
}) {
  if (isLoading) {
    return <p className="text-gray-500 text-sm">댓글을 불러오는 중...</p>;
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <div className="flex justify-center mb-4">
          <Send className="w-10 h-10 opacity-30" />
        </div>
        <p className="font-semibold text-sm mb-1">
          아직 남겨진 이야기가 없어요
        </p>
        <p className="text-sm mb-4 text-gray-500">
          이 여행지에서의 <strong>특별한 순간</strong>을 나눠주세요.
          <br />
          당신의 이야기가 다른 혼행자들의 공감이 될 수 있어요.
        </p>
        <button
          onClick={() => document.getElementById("comment-textarea")?.focus()}
          className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-900 transition"
        >
          첫 번째 코멘트 남기기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          reviewId={reviewId}
        />
      ))}
    </div>
  );
}
