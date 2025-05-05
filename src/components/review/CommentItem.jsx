// components/review/CommentItem.jsx
export default function CommentItem({ comment, currentUserId }) {
  const { id, content, createdAt, authorId, authorName } = comment;

  const isAuthor = currentUserId === authorId;

  const handleDelete = () => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    // TODO: 댓글 삭제 mutation 연결
  };

  return (
    <div className="border p-4 rounded">
      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">{authorName}</span> ·{" "}
        <span>{new Date(createdAt).toLocaleString()}</span>
      </div>
      <p className="text-gray-800">{content}</p>
      {isAuthor && (
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 mt-2 hover:underline"
        >
          삭제
        </button>
      )}
    </div>
  );
}
