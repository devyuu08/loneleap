import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { useRecentReviews } from "services/queries/review/useRecentReviews";

export default function ReviewPreview() {
  const { data: reviews, isLoading } = useRecentReviews();
  if (isLoading || !reviews) return null;

  return (
    <section className="py-20 px-6 bg-white relative">
      <div className="relative mb-10">
        <h2 className="text-2xl font-bold font-heading text-gray-900">
          여행자 리뷰
        </h2>
        <p className="text-sm text-gray-500 font-body">
          혼행자들이 남긴 생생한 이야기들
        </p>

        <Link
          to="/reviews"
          className="absolute right-0 top-0 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          더보기 →
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        className="!overflow-visible"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <Link
              to={`/reviews/${review.id}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition block"
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
                  <p className="font-semibold font-body text-sm">
                    {review.authorName || "익명"}
                  </p>
                  <p className="text-xs text-gray-400 font-body">
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

              <p className="px-4 pb-4 text-gray-700 text-sm font-body line-clamp-3">
                {review.content}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
