import { useUser } from "@/hooks/auth/useUser";
import {
  useReviewLikeStatus,
  useToggleReviewLike,
} from "@/hooks/review/useReviewLike";
import LikeButton from "@/components/review/LikeButton";

/**
 * LikeButtonContainer
 * - 리뷰에 대한 좋아요 상태를 조회하고, 좋아요 토글을 처리하는 컨테이너 컴포넌트
 * - 현재 사용자 ID 기반으로 좋아요 여부 조회 및 toggle mutation 처리
 * - 버튼 UI와 상태(활성/비활성)를 LikeButton 컴포넌트에 전달
 */

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
