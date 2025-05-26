import { useUser } from "hooks/useUser";
import {
  useReviewLikeStatus,
  useToggleReviewLike,
} from "hooks/review/useReviewLike";
import LikeButton from "components/review/LikeButton";

export default function LikeButtonContainer({
  reviewId,
  likesCount = 0,
  variant = "card",
}) {
  const { user } = useUser();
  const userId = user?.uid;

  const { data: hasLiked } = useReviewLikeStatus(reviewId, userId);
  const { mutate, isPending } = useToggleReviewLike(reviewId, userId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!user || isPending) return;
    mutate();
  };

  return (
    <LikeButton
      hasLiked={hasLiked}
      likesCount={likesCount}
      variant={variant}
      disabled={!user || isPending}
      onClick={handleClick}
    />
  );
}
