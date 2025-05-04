import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUser } from "hooks/useUser";
import {
  useReviewLikeStatus,
  useToggleReviewLike,
} from "services/queries/review/useReviewLike";
import { cn } from "utils/utils";
import { useReviewDetail } from "services/queries/review/useReviewDetail";

export default function LikeButton({ reviewId }) {
  const { user } = useUser();
  const userId = user?.uid;

  const { data: hasLiked, isLoading: isChecking } = useReviewLikeStatus(
    reviewId,
    userId
  );
  const { mutate, isPending: isMutating } = useToggleReviewLike(
    reviewId,
    userId
  );
  const { data: review } = useReviewDetail(reviewId);

  const handleLikeBtnClick = (e) => {
    e.stopPropagation();
    if (!user || isMutating) return;
    mutate();
  };

  return (
    <button
      onClick={handleLikeBtnClick}
      disabled={!user || isMutating}
      className={cn(
        "flex items-center gap-1 transition-all",
        isMutating && "opacity-50 cursor-not-allowed"
      )}
      aria-label={hasLiked ? "좋아요 취소" : "좋아요 누르기"}
    >
      {hasLiked ? (
        <AiFillHeart className="text-red-500" size={18} />
      ) : (
        <AiOutlineHeart
          className="text-gray-400 hover:text-red-500"
          size={18}
        />
      )}
      <span className="text-sm text-gray-600">{review?.likesCount ?? 0}</span>
    </button>
  );
}
