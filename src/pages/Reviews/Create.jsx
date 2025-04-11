// src/pages/Reviews/Create.jsx
import { useState } from "react";

import ReviewForm from "components/Review/ReviewForm";
import useAddReview from "services/queries/useAddReview";

export default function CreateReviewPage() {
  const [error, setError] = useState(null);
  const { mutate, isLoading } = useAddReview({
    onError: (err) => {
      console.error(err);
      setError("리뷰 등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });

  const handleCreateReviewSubmit = ({
    title,
    destination,
    content,
    rating,
    image,
  }) => {
    setError(null);
    mutate({ title, destination, content, rating, image });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      {error && (
        <div className="max-w-4xl mx-auto mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <ReviewForm onSubmit={handleCreateReviewSubmit} isLoading={isLoading} />
    </div>
  );
}
