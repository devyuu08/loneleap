// components/review/CommentList.jsx
import { useState } from "react";
import CommentItem from "./CommentItem";

const mockComments = [
  {
    id: "c1",
    content: "정말 좋은 정보 감사합니다!",
    createdAt: new Date().toISOString(),
    authorId: "u1",
    authorName: "유지니",
  },
  {
    id: "c2",
    content: "덕분에 많은 도움이 됐어요.",
    createdAt: new Date().toISOString(),
    authorId: "u2",
    authorName: "하람",
  },
];

export default function CommentList({ currentUserId }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    // TODO: 댓글 등록 mutation 연결
    setContent("");
  };

  return (
    <div className="mt-8 space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          className="border p-2 rounded resize-none"
          rows={3}
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="self-end bg-black text-white px-4 py-2 rounded"
        >
          댓글 작성
        </button>
      </form>

      <div className="space-y-4">
        {mockComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
}
