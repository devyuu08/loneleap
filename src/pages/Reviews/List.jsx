// src/pages/Reviews/List.jsx
import ReviewList from "components/Review/ReviewList";

export default function ReviewListPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          여행 리뷰 목록
        </h1>
        <ReviewList />
      </div>
    </div>
  );
}
