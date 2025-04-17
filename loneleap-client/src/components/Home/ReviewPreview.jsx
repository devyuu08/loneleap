// src/components/Home/ReviewPreview.jsx

import { useRecentReviews } from "services/queries/useRecentReviews";

export default function ReviewPreview() {
  const { data: reviews, isLoading } = useRecentReviews();

  if (isLoading || !reviews) return null;

  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-10">여행자 리뷰</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
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
          </div>
        ))}
      </div>
    </section>
  );
}
