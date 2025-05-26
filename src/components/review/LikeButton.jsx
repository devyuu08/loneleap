import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUser } from "hooks/useUser";
import {
  useReviewLikeStatus,
  useToggleReviewLike,
} from "hooks/review/useReviewLike";
import { cn } from "utils/utils";

export default function LikeButton({
  reviewId,
  likesCount = 0,
  variant = "card",
}) {
  const { user } = useUser();
  const userId = user?.uid;

  const { data: hasLiked } = useReviewLikeStatus(reviewId, userId);
  const { mutate, isPending: isMutating } = useToggleReviewLike(
    reviewId,
    userId
  );

  const handleLikeBtnClick = (e) => {
    e.stopPropagation();
    if (!user || isMutating) return;
    mutate();
  };

  const baseClass = "flex items-center gap-1 transition-all";
  const disabledClass = isMutating ? "opacity-50 cursor-not-allowed" : "";
  const variantClass =
    variant === "detail"
      ? "px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white/60 text-gray-800 backdrop-blur-sm shadow-sm hover:bg-white/80 transition"
      : "text-sm text-gray-500 hover:text-red-500 transition";
  return (
    <button
      onClick={handleLikeBtnClick}
      disabled={!user || isMutating}
      className={cn(baseClass, disabledClass, variantClass)}
      aria-label={hasLiked ? "좋아요 취소" : "좋아요 누르기"}
    >
      {hasLiked ? (
        <AiFillHeart
          className={
            variant === "detail" ? "text-red-500 w-4 h-4" : "text-red-500"
          }
        />
      ) : (
        <AiOutlineHeart
          className={
            variant === "detail"
              ? "text-gray-400 hover:text-red-500 w-4 h-4"
              : "text-gray-400 hover:text-red-500"
          }
        />
      )}
      <span className="font-medium">{likesCount}</span>
    </button>
  );
}
