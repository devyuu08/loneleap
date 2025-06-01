import { useUser } from "@/hooks/auth/useUser";
import {
  useReviewLikeStatus,
  useToggleReviewLike,
} from "@/hooks/review/useReviewLike";
import LikeButton from "@/components/review/LikeButton";

export default function LikeButtonContainer({
  reviewId,
  likesCount = 0,
  variant = "card",
}) {
  const { user, isLoading: isUserLoading } = useUser();
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
      disabled={isUserLoading || !user || isPending}
      onClick={handleClick}
    />
  );
}
