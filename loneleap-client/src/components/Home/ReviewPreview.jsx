// src/components/Home/ReviewPreview.jsx

import { Link } from "react-router-dom";
import { useRecentReviews } from "services/queries/useRecentReviews";

export default function ReviewPreview() {
  const { data: reviews, isLoading } = useRecentReviews();
  if (isLoading || !reviews) return null;

  return (
    <section className="py-20 px-6 bg-gray-50 relative">
      <div className="relative mb-10">
        <h2 className="text-2xl font-bold text-center">여행자 리뷰</h2>

        <Link
          to="/reviews"
          className="absolute right-0 top-1 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          더보기 →
        </Link>
      </div>
      {/* 카드 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Link
            key={review.id}
            to={`/reviews/${review.id}`}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div>
                <p className="font-semibold">{review.authorName || "익명"}</p>
                <p className="text-xs text-gray-400">
                  {review.createdAt?.toDate
                    ? new Date(review.createdAt.toDate()).toLocaleDateString(
                        "ko-KR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "날짜 없음"}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{review.content}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
