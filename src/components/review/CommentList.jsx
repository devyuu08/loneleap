import CommentItem from "components/review/CommentItem";
import { Send } from "lucide-react";

export default function CommentList({
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
    <div className="bg-white rounded-2xl shadow-sm px-6 py-8 space-y-8">
      {/* 댓글 입력 박스 */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          이 여행지에서의 감정을 나눠보세요
        </h3>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-start gap-3">
            <img
              src={user?.photoURL || "/images/default-profile.png"}
              alt="프로필"
              className="w-10 h-10 rounded-full object-cover"
            />
            <textarea
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
              className="text-sm px-4 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isPending ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>

      {/* 댓글 목록 */}
      <div>
        <h4 className="text-sm text-gray-500 font-medium mb-4">
          여행자들의 감성 코멘트{" "}
          <span className="ml-1 text-gray-400 font-normal">
            ({comments?.length || 0})
          </span>
        </h4>

        {isLoading ? (
          <p className="text-gray-500 text-sm">댓글을 불러오는 중...</p>
        ) : comments?.length > 0 ? (
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
        ) : (
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
              onClick={() =>
                document.getElementById("comment-textarea")?.focus()
              }
              className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-900 transition"
            >
              첫 번째 코멘트 남기기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
