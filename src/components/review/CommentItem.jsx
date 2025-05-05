import { useDeleteComment } from "services/queries/review/useDeleteComment";

export default function CommentItem({ comment, currentUserId, reviewId }) {
  const { id, content, createdAt, authorId, authorName } = comment;
  const isAuthor = currentUserId === authorId;
  const { mutate, isPending } = useDeleteComment(reviewId);

  const handleCommentDelete = () => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    mutate(id);
  };

  return (
    <div className="border p-4 rounded">
      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">{authorName}</span> ·{" "}
        <span>
          {createdAt?.toDate?.()
            ? new Date(createdAt.toDate()).toLocaleString()
            : "날짜 없음"}
        </span>
      </div>
      <p className="text-gray-800">{content}</p>
      {isAuthor && (
        <button
          onClick={handleCommentDelete}
          disabled={isPending}
          className="text-sm text-red-500 mt-2 hover:underline"
        >
          {isPending ? "삭제 중..." : "삭제"}
        </button>
      )}
    </div>
  );
}
