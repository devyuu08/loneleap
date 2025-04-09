// src/pages/Reviews/Create.jsx
import ReviewForm from "components/Review/ReviewForm";
import useAddReview from "services/queries/useAddReview";

export default function CreateReviewPage() {
  const { mutate, isLoading } = useAddReview();

  const handleCreateReviewSubmit = ({
    title,
    destination,
    content,
    rating,
    image,
  }) => {
    mutate({ title, destination, content, rating, image });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <ReviewForm onSubmit={handleCreateReviewSubmit} isLoading={isLoading} />
    </div>
  );
}
