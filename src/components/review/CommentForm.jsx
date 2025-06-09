import React from "react";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * CommentForm
 * - 댓글 입력 폼 컴포넌트
 * - 사용자 프로필 이미지 + 텍스트 입력창 + 등록 버튼으로 구성
 * - 비동기 처리 상태에 따라 버튼 로딩 UI 표시
 */

function CommentForm({ user, content, setContent, isPending, onSubmit }) {
  const textareaClass =
    "w-full resize-none border border-gray-300 rounded-md p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black";

  const submitBtnClass =
    "text-sm px-4 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50 min-w-[72px] flex items-center justify-center self-end";

  return (
    <form onSubmit={onSubmit} className="space-y-2" aria-label="댓글 작성 폼">
      {/* 프로필 이미지 + 텍스트 입력 */}
      <div className="flex items-start gap-3">
        <SkeletonImage
          src={user?.photoURL || "/images/default-profile.png"}
          alt="프로필"
          size="w-12 h-11"
          className="rounded-full border border-white/20"
        />
        <textarea
          id="comment-textarea"
          rows={3}
          className={textareaClass}
          placeholder="이 여행지에서의 당신의 감정을 들려주세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
          aria-label="댓글 입력창"
        />
      </div>

      {/* 하단 안내문 + 등록 버튼 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        {/* PC 전용 안내 문구 */}
        <p className="text-xs text-gray-400 hidden md:block">
          타인을 존중하는 따뜻한 댓글을 남겨주세요. 비방이나 무례한 표현은
          제재될 수 있어요.
        </p>

        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className={submitBtnClass}
          aria-disabled={isPending || !content.trim()}
          aria-label="댓글 등록"
        >
          {isPending ? (
            <span className="w-4 h-4 flex items-center justify-center">
              <ButtonSpinner size={16} color="white" />
            </span>
          ) : (
            <span>등록</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default React.memo(CommentForm);
