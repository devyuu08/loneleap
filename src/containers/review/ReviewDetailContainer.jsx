import { useParams } from "react-router-dom";

import { useUser } from "@/hooks/auth/useUser";
import { useDeleteReview } from "@/hooks/review/useDeleteReview";

import { useReviewDetail } from "@/hooks/review/useReviewDetail";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import NotFoundMessage from "@/components/common/feedback/NotFoundMessage";
import ReviewDetail from "@/components/review/ReviewDetail";

/**
 * ReviewDetailContainer
 * - 특정 리뷰의 상세 정보를 조회하고 삭제 기능을 제공하는 컨테이너 컴포넌트
 * - Firebase에서 리뷰 데이터를 가져오고, 작성자 여부에 따라 삭제 버튼 조건부 렌더링
 * - 로딩/에러 상태 처리 및 삭제 성공 시 알림 및 navigate 처리 포함
 */

export default function ReviewDetailContainer() {
  const { id: reviewId } = useParams();
  const { user, isLoading: isUserLoading } = useUser();
  const { data, isLoading, isError } = useReviewDetail(reviewId);
  const { mutate: deleteReview, isPending } = useDeleteReview();

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <NotFoundMessage message="리뷰를 찾을 수 없습니다." />;

  const isOwner = !isUserLoading && user?.uid === data.createdBy?.uid;

  return (
    <ReviewDetail
      reviewId={reviewId}
      review={data}
      onDelete={deleteReview}
      isDeletePending={isPending}
      isOwner={isOwner}
    />
  );
}
