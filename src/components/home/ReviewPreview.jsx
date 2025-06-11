import { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { useRecentReviews } from "@/hooks/review/useRecentReviews";
import SkeletonImage from "@/components/common/loading/SkeletonImage";
import MainSectionWrapper from "@/components/common/layout/MainSectionWrapper";
import { Quote } from "lucide-react";

/**
 * 최근 여행자 리뷰 프리뷰 섹션
 * - Swiper 슬라이드로 리뷰 일부 보여줌
 * - 인터뷰 리뷰일 경우 첫 번째 질문 답변 표시
 * - 배경 이미지 + 오버레이 포함
 */

export default function ReviewPreview() {
  const { data: reviews } = useRecentReviews();

  const getPreviewText = useCallback((review) => {
    if (review.type === "interview") {
      const firstQId = review.interviewQuestions?.[0]?.id;
      return review.interviewAnswers?.[firstQId] || "내용 없음";
    }
    return review.content || "내용 없음";
  }, []);

  const formatDate = (date) => {
    try {
      const d =
        typeof date?.toDate === "function" ? date.toDate() : new Date(date);
      return d.toLocaleDateString("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return "날짜 없음";
    }
  };

  const reviewCard =
    "relative w-full max-w-3xl h-72 sm:h-80 md:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition flex bg-white";

  const quoteIconWrapper =
    "absolute top-4 right-4 w-12 h-12 rounded-full bg-gray-100/60 flex items-center justify-center shadow-inner";

  const ctaButton =
    "text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 border rounded-full text-white border-white/30 hover:bg-white/10 transition";

  const slides = useMemo(() => {
    if (!Array.isArray(reviews)) return [];
    return reviews.map((review) => (
      <SwiperSlide key={review.id} className="block">
        <div className="flex justify-center">
          <Link
            to={`/reviews/${review.id}`}
            className={reviewCard}
            aria-label={`리뷰 상세: ${review.destination ?? "여행지"}`}
          >
            {/* 인용 아이콘 */}
            <div className={quoteIconWrapper}>
              <Quote className="w-7 h-7 text-gray-600 opacity-60" />
            </div>

            {/* 텍스트 정보 */}
            <div className="flex-1 px-6 py-6 text-gray-900 flex flex-col justify-between">
              {/* 작성자 정보 */}
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 shrink-0">
                  <SkeletonImage
                    src={
                      review.createdBy?.photoURL ||
                      "/images/default-profile.png"
                    }
                    alt="작성자"
                    className="rounded-full border border-white/20"
                    objectFit="cover"
                    size="w-12 h-12"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-lg font-semibold text-gray-800 leading-tight">
                    {review.createdBy?.displayName || "익명"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {review.destination || "여행지"} ·{" "}
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>

              {/* 리뷰 내용 */}
              <div className="mt-4 space-y-1 leading-relaxed">
                <p className="text-sm text-gray-500 italic font-semibold">
                  Q. 이번 여행은 어떻게 시작되었나요?
                </p>
                <p className="text-[15px] text-gray-800 pt-3 line-clamp-3 font-medium before:content-['“'] after:content-['”']">
                  {getPreviewText(review)}
                </p>
              </div>

              {/* 별점 표시 */}
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
    ));
  }, [reviews, getPreviewText]);

  if (!reviews) return null;

  return (
    <MainSectionWrapper className="overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src="/images/review-bg.jpg"
        alt="여행자 리뷰 배경"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* 메인 콘텐츠 */}
      <div className="relative max-w-screen-2xl mx-auto z-20">
        {/* 제목 및 설명 */}
        <div className="text-center mb-12 text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            여행의 흔적, 혼자 남긴 이야기
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-2">
            당신만의 순간이 누군가의 여행이 됩니다.
          </p>
          <div className="text-center mt-8">
            <Link to="/reviews" className={ctaButton}>
              더 많은 이야기 보기 →
            </Link>
          </div>
        </div>

        {/* 리뷰 슬라이드 */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          centeredSlides={false}
          loop={reviews.length >= 3}
          spaceBetween={30}
          observer={true}
          observeParents={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          className="max-w-6xl mx-auto"
        >
          {slides}
        </Swiper>
      </div>
    </MainSectionWrapper>
  );
}
