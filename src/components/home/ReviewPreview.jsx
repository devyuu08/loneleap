import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { useRecentReviews } from "services/queries/review/useRecentReviews";

export default function ReviewPreview() {
  const { data: reviews, isLoading } = useRecentReviews();
  if (isLoading || !reviews) return null;

  const getPreviewText = (review) => {
    if (review.type === "interview") {
      const firstQId = review.interviewQuestions?.[0]?.id;
      return review.interviewAnswers?.[firstQId] || "내용 없음";
    }
    return review.content || "내용 없음";
  };

  return (
    <section className="relative py-24 px-6 bg-gray-900 overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src="/images/review-bg.jpg"
        alt="여행자 리뷰 배경"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-screen-2xl mx-auto">
        {/* 제목 + 설명 */}
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl font-bold">여행의 흔적, 혼자 남긴 이야기</h2>
          <p className="text-sm text-white/80 mt-2">
            당신만의 순간이 누군가의 여행이 됩니다.
          </p>
          <Link
            to="/reviews"
            className="inline-block mt-4 text-sm px-4 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
          >
            더보기 →
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={1}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="flex justify-center">
              <Link
                to={`/reviews/${review.id}`}
                className="bg-black/60 text-white rounded-xl px-6 py-5 w-[420px] h-72 shadow-md hover:shadow-lg transition flex flex-col justify-between"
              >
                {/* 유저 정보 */}
                <div className="flex gap-4 items-center mb-4">
                  <img
                    src={review.authorPhoto || "/default_profile.png"}
                    alt="작성자"
                    className="w-14 h-14 object-cover rounded-full border border-white/20"
                  />
                  <div>
                    <p className="font-bold text-base">
                      {review.authorName || "익명"}
                    </p>
                    <p className="text-xs opacity-60">
                      {review.destination || "여행지"} ·{" "}
                      {review.createdAt?.toDate
                        ? new Date(
                            review.createdAt.toDate()
                          ).toLocaleDateString("ko-KR", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                          })
                        : "날짜 없음"}
                    </p>
                  </div>
                </div>

                {/* 내용 */}
                <p className="text-sm leading-relaxed text-white/90 line-clamp-3">
                  ❝{getPreviewText(review)}❞
                </p>

                {/* 별점 */}
                <div className="mt-3 flex gap-0.5 text-yellow-400 text-sm">
                  {[1, 2, 3, 4, 5].map((i) =>
                    i <= Math.round(review.rating || 0) ? "★" : "☆"
                  )}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
