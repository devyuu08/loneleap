import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
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
    <section className="relative py-32 px-6 bg-gray-900 overflow-hidden">
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
          <div className="text-center mt-8">
            <Link
              to="/reviews"
              className="text-sm px-4 py-2 border rounded-full text-white border-white/30 hover:bg-white/10 transition"
            >
              더 많은 이야기 보기 →
            </Link>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          centeredSlides
          slidesPerView={1.2}
          spaceBetween={40}
          loop={reviews.length >= 3}
          className="max-w-6xl mx-auto"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="block">
              <div className="flex justify-center">
                <Link
                  to={`/reviews/${review.id}`}
                  className="relative w-full max-w-3xl h-80 min-h-[320px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition flex bg-white backdrop-blur-sm"
                >
                  {/* 왼쪽: 리뷰 이미지 */}
                  <div className="w-2/5 min-w-[160px] h-full">
                    <img
                      src={review.imageUrl || "/images/no_image.png"}
                      alt="리뷰 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 오른쪽: 리뷰 내용 */}
                  <div className="flex-1 px-6 py-6 text-gray-900 flex flex-col justify-between">
                    {/* 유저 정보 */}
                    <div className="flex gap-4 items-center">
                      <img
                        src={
                          review.createdBy?.photoURL ||
                          "/images/default-profile.png"
                        }
                        alt="작성자"
                        className="w-12 h-12 object-cover rounded-full border border-white/20"
                      />
                      <div>
                        <p className="font-bold text-base">
                          {review.createdBy?.displayName || "익명"}
                        </p>
                        <p className="text-xs opacity-70">
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
                    <div className="mt-4 space-y-1 leading-relaxed">
                      <p className="text-sm text-gray-500 italic font-semibold">
                        Q. 이번 여행은 어떻게 시작되었나요?
                      </p>
                      <p className="text-[15px] text-gray-800 pt-3 line-clamp-3 font-medium before:content-['“'] after:content-['”']">
                        {getPreviewText(review)}
                      </p>
                    </div>

                    {/* 별점 */}
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex gap-1 text-yellow-400 text-xl hover:scale-110 transition-transform">
                        {[1, 2, 3, 4, 5].map((i) =>
                          i <= Math.round(review.rating || 0) ? (
                            <span key={i}>★</span>
                          ) : (
                            <span key={i} className="text-gray-400">
                              ☆
                            </span>
                          )
                        )}
                      </div>
                      <span className="text-sm text-gray-400">
                        ({review.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
