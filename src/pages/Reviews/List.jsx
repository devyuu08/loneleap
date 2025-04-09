// src/pages/Reviews/List.jsx
import ReviewList from "components/Review/ReviewList";
import { Link } from "react-router-dom";

export default function ReviewListPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-20">
        <h2 className="text-2xl font-bold">여행 리뷰 목록</h2>
        <Link
          to="/reviews/create"
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          리뷰 작성하기
        </Link>
      </div>
      <ReviewList />
    </div>
  );
}
