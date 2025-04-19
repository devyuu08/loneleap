import ReviewList from "components/Review/ReviewList";
import { Link } from "react-router-dom";

export default function ReviewListPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-start mb-20">
        <div>
          <h2 className="text-2xl font-bold">여행 리뷰 목록</h2>
          <p className="text-sm text-gray-500 mt-1">
            다른 여행자들의 후기를 읽고, 나만의 여행 이야기도 남겨보세요!
          </p>
        </div>

        <Link
          to="/reviews/create"
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
          aria-label="리뷰 작성 페이지로 이동"
        >
          리뷰 작성하기
        </Link>
      </div>

      <ReviewList />
    </div>
  );
}
