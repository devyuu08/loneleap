import { useParams } from "react-router-dom";

import { useUser } from "@/hooks/auth/useUser";
import { useDeleteReview } from "@/hooks/review/useDeleteReview";

import { useReviewDetail } from "@/hooks/review/useReviewDetail";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import NotFoundMessage from "@/components/common/feedback/NotFoundMessage";
import ReviewDetail from "@/components/review/ReviewDetail";

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
