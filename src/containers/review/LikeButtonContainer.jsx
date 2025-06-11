import { useUser } from "@/hooks/auth/useUser";
import {
  useReviewLikeStatus,
  useToggleReviewLike,
} from "@/hooks/review/useReviewLike";
import LikeButton from "@/components/review/LikeButton";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * LikeButtonContainer
 *
 * - 리뷰에 대한 좋아요 상태를 캐시 기반으로 렌더링하는 컨테이너 컴포넌트
 * - 서버에서 가져온 좋아요 여부(useReviewLikeStatus)를 기반으로 UI를 렌더링
 * - 좋아요 수는 React Query 캐시(reviewDetail 또는 reviews)에서 조회
 * - 클릭 시 옵티미스틱 UI 방식으로 캐시 데이터를 먼저 갱신한 후 서버에 반영
 * - LikeButton 컴포넌트에 좋아요 여부, 개수, 스타일, 로딩 상태를 전달
 * - 로컬 상태(useState)는 사용하지 않으며, 캐시를 단일 상태로 활용
 */

export default function LikeButtonContainer({
  reviewId,
  likesCount = 0,
  variant = "card",
}) {
  const queryClient = useQueryClient();
  const { user, isLoading: isUserLoading } = useUser();
  const userId = user?.uid ?? null;

  const { data: hasLikedServer } = useReviewLikeStatus(reviewId, userId);

  const hasLiked = hasLikedServer ?? false;

  // 캐시에서 likesCount 가져오기
  const reviewDetail = queryClient.getQueryData([
    QUERY_KEYS.REVIEW_DETAIL(reviewId),
  ]);
  const reviews = queryClient.getQueryData([QUERY_KEYS.REVIEWS]);

  const displayLikesCount =
    reviewDetail?.likesCount ??
    reviews?.find((r) => r.id === reviewId)?.likesCount ??
    likesCount;

  const { mutate, isPending } = useToggleReviewLike(reviewId, userId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!user || isPending) return;

    const nextHasLiked = !hasLiked;
    const nextLikesCount = displayLikesCount + (nextHasLiked ? 1 : -1);

    // 캐시 업데이트 - 상세 페이지
    queryClient.setQueryData(
      [QUERY_KEYS.REVIEW_DETAIL(reviewId)],
      (prev) => prev && { ...prev, likesCount: nextLikesCount }
    );

    // 캐시 업데이트 - 리뷰 목록
    queryClient.setQueryData([QUERY_KEYS.REVIEWS], (prev) => {
      if (!Array.isArray(prev)) return prev;
      return prev.map((r) =>
        r.id === reviewId ? { ...r, likesCount: nextLikesCount } : r
      );
    });

    // 서버 반영
    mutate(nextHasLiked);
  };

  if (!user) return null;

  return (
    <LikeButton
      hasLiked={hasLiked}
      likesCount={displayLikesCount}
      variant={variant}
      disabled={isUserLoading || isPending}
      onClick={handleClick}
    />
  );
}
