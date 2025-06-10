import { useUser } from "@/hooks/auth/useUser";
import {
  useReviewLikeStatus,
  useToggleReviewLike,
} from "@/hooks/review/useReviewLike";
import LikeButton from "@/components/review/LikeButton";
import { useEffect, useState } from "react";

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
  const userId = user?.uid ?? null;

  // 1. 서버에서 현재 좋아요 여부 가져오기
  const { data: hasLikedServer } = useReviewLikeStatus(reviewId, userId);

  // 2. 서버 상태 → 로컬 상태로 반영
  const [hasLiked, setHasLiked] = useState(false);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  useEffect(() => {
    if (hasLikedServer !== undefined) {
      setHasLiked(hasLikedServer);
    }
  }, [hasLikedServer]);

  const { mutate, isPending } = useToggleReviewLike(reviewId, userId);

  // 3. 클릭 시 UI 먼저 반영 → 서버 호출
  const handleClick = (e) => {
    e.stopPropagation();
    if (!user || isPending) return;

    // 로컬 상태 먼저 업데이트
    setHasLiked((prev) => !prev);
    setLocalLikesCount((prev) => prev + (hasLiked ? -1 : 1));

    // 서버 요청
    mutate();
  };

  if (!user) return null;

  return (
    <LikeButton
      hasLiked={hasLiked}
      likesCount={localLikesCount}
      variant={variant}
      disabled={isUserLoading || isPending}
      onClick={handleClick}
    />
  );
}
