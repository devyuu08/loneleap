// components/review/CommentList.jsx
import { useState } from "react";
import { useComments } from "services/queries/review/useComments";
import CommentItem from "components/review/CommentItem";
import { useUser } from "hooks/useUser";
import { useAddComment } from "services/queries/review/useAddComment";

export default function CommentList({ currentUserId, reviewId }) {
  const [content, setContent] = useState("");
  const { user } = useUser();
  const { data: comments, isLoading } = useComments(reviewId);

  const { mutate, isPending } = useAddComment(reviewId);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    mutate({
      content,
      authorId: user.uid,
      authorName: user.displayName || "익명",
    });

    setContent("");
  };

  return (
    <div className="mt-8 space-y-4">
      {/* 댓글 작성 폼 */}
      <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
        <textarea
          className="border p-2 rounded resize-none"
          rows={3}
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="self-end bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isPending ? "작성 중..." : "댓글 작성"}
        </button>
      </form>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500 text-sm">댓글을 불러오는 중...</p>
        ) : comments?.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm">첫 댓글을 남겨보세요.</p>
        )}
      </div>
    </div>
  );
}
