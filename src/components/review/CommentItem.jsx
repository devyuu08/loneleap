import React, { useCallback } from "react";
import { useDeleteComment } from "@/hooks/review/useDeleteComment";
import { Trash2 } from "lucide-react";
import { cn } from "@/utils/utils";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * CommentItem
 * - 댓글 한 개의 정보를 보여주는 컴포넌트
 * - 작성자 프로필 + 닉네임 + 작성일 + 내용 + 삭제 버튼으로 구성
 * - 현재 로그인한 사용자가 작성자일 경우 삭제 버튼 표시
 */

function CommentItem({ comment, currentUserId, reviewId }) {
  const { id, content, createdAt, author } = comment;
  const isAuthor = currentUserId === author?.uid;
  const { mutate, isPending } = useDeleteComment(reviewId);

  const handleCommentDelete = useCallback(() => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    mutate(id);
  }, [mutate, id]);

  return (
    <article
      className="relative bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-5 shadow-sm"
      aria-label="댓글 항목"
    >
      {/* 작성자 정보 */}
      <header className="flex items-center gap-3 mb-2 text-sm text-gray-600">
        <SkeletonImage
          src={author?.photoURL || "/images/default-profile.png"}
          alt="작성자 프로필"
          size="w-6 h-6"
          className="rounded-full border border-white/20"
        />
        <strong className="font-semibold text-gray-800">
          {author?.displayName || "익명"}
        </strong>
        <time
          className="text-gray-400 text-xs"
          dateTime={
            createdAt?.toDate?.() ? createdAt.toDate().toISOString() : undefined
          }
        >
          {createdAt?.toDate?.()
            ? new Date(createdAt.toDate()).toLocaleString()
            : "날짜 없음"}
        </time>
      </header>

      {/* 댓글 내용 */}
      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
        {content}
      </p>

      {/* 삭제 버튼 (본인인 경우에만) */}
      {isAuthor && (
        <button
          onClick={handleCommentDelete}
          disabled={isPending}
          aria-label="댓글 삭제"
          className={cn(
            "absolute top-3 right-3 text-gray-400 hover:text-red-500 transition",
            isPending && "opacity-50 cursor-not-allowed"
          )}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </article>
  );
}

export default React.memo(CommentItem);
