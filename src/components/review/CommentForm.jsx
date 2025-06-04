import React from "react";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

function CommentForm({ user, content, setContent, isPending, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10">
          <SkeletonImage
            src={user?.photoURL || "/images/default-profile.png"}
            alt="프로필"
            className="rounded-full border border-white/20"
            objectFit="cover"
          />
        </div>
        <textarea
          id="comment-textarea"
          rows={3}
          className="w-full resize-none border border-gray-300 rounded-md p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="이 여행지에서의 당신의 감정을 들려주세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">
          타인을 존중하는 따뜻한 댓글을 남겨주세요. 비방이나 무례한 표현은
          제재될 수 있어요.
        </p>
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="text-sm px-4 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50 min-w-[72px] flex items-center justify-center"
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
