import { useParams } from "react-router-dom";
import ReviewDetail from "components/review/ReviewDetail";
import LayoutWrapper from "components/common/LayoutWrapper";

export default function ReviewDetailPage() {
  const { id } = useParams();

  return (
    <LayoutWrapper>
      <ReviewDetail reviewId={id} />
    </LayoutWrapper>
  );
}
