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
    <section className="py-20 px-6 bg-white relative overflow-hidden">
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
        spaceBetween={24} // 카드 간 여백 증가
        slidesPerGroup={1} // 1개씩 넘어감
        className="px-2"
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="flex justify-center">
            <Link
              to={`/reviews/${review.id}`}
              className="w-[480px] h-[260px] bg-[#F8F9FA] rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
            >
              {/* 상단 - 유저 정보 */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.authorPhoto || "/default_profile.png"}
                  alt="프로필 이미지"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">
                    {review.authorName || "익명"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {review.destination || "여행지"} ·{" "}
                    {review.createdAt?.toDate
                      ? new Date(review.createdAt.toDate()).toLocaleDateString(
                          "ko-KR",
                          {
                            year: "numeric",
                            month: "long",
                          }
                        )
                      : "날짜 없음"}
                  </p>
                </div>
              </div>

              {/* 리뷰 내용 */}
              <p className="text-sm text-gray-700 font-body line-clamp-3">
                “{review.content}”
              </p>

              {/* 별점 */}
              <div className="mt-4 flex gap-1 text-yellow-500 text-base">
                {[1, 2, 3, 4, 5].map((i) =>
                  i <= Math.round(review.rating || 0) ? "★" : "☆"
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
