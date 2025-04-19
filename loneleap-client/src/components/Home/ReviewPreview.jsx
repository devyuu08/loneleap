import { Link } from "react-router-dom";
import { useRecentReviews } from "services/queries/review/useRecentReviews";

export default function ReviewPreview() {
  const { data: reviews, isLoading } = useRecentReviews();
  if (isLoading || !reviews) return null;

  return (
    <section className="py-20 px-6 bg-white relative">
      <div className="relative mb-10">
        <h2 className="text-2xl font-bold text-center">여행자 리뷰</h2>

        <Link
          to="/reviews"
          className="absolute right-0 top-1 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          더보기 →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Link
            key={review.id}
            to={`/reviews/${review.id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition block overflow-hidden"
          >
            <img
              src={review.imageUrl || "/images/no_image.png"}
              alt="리뷰 이미지"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/no_image.png";
              }}
              className="w-full aspect-[4/3] object-cover bg-gray-100"
            />

            <div className="flex items-center gap-3 p-4">
              <img
                src={review.authorPhoto || "/default_profile.png"}
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full object-cover"
              />
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

            <p className="px-4 pb-4 text-gray-700 text-sm">{review.content}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
