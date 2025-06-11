import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { useRecommendationList } from "@/hooks/recommendation/useRecommendationList";
import SkeletonImage from "@/components/common/loading/SkeletonImage";
import MainSectionWrapper from "@/components/common/layout/MainSectionWrapper";
import React, { useMemo } from "react";

/**
 * 추천 여행지 슬라이더 컴포넌트
 * - 시즌별 추천 여행지 목록을 슬라이드 형태로 출력
 * - 최대 8개만 표시, Swiper로 반응형 구성
 * - 각 카드 클릭 시 상세 페이지로 이동
 */

function DestinationSlider() {
  const { data: destinations, isLoading } = useRecommendationList();

  // 최대 8개까지만 표시
  const displayedDestinations = useMemo(() => {
    return destinations?.slice(0, 8) ?? [];
  }, [destinations]);

  if (isLoading || !destinations) return null;

  const slideCard =
    "relative w-full max-w-3xl h-64 sm:h-80 md:h-[300px] lg:h-[320px] rounded-xl overflow-hidden shadow hover:brightness-105 transition bg-gray-200";

  const moreLinkButton =
    "inline-block mt-4 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition";

  const slideTextBox = "absolute bottom-4 left-4 text-white z-10";

  return (
    <MainSectionWrapper bg="bg-gray-50" className="overflow-hidden">
      {/* 헤더 */}
      <header className="text-center mb-8 md:mb-12 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          이 계절, 혼자 떠나기 좋은 곳
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          당신의 감성에 닿는, 잊지 못할 여행지를 소개합니다.
        </p>
        <Link to="/recommendations" className={moreLinkButton}>
          더보기 →
        </Link>
      </header>

      {/* 추천 여행지 슬라이더 */}
      <Swiper
        modules={[Navigation]}
        navigation
        loop={displayedDestinations.length >= 3}
        spaceBetween={30}
        observer
        observeParents
        watchSlidesProgress
        resizeObserver
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
        aria-label="추천 여행지 슬라이더"
      >
        {displayedDestinations.map(({ id, name, summary, imageUrl }) => (
          <SwiperSlide key={id} className="block">
            <div className="flex justify-center">
              <Link to={`/recommendations/${id}`} className={slideCard}>
                {/* 이미지 + 오버레이 */}
                <SkeletonImage
                  src={imageUrl}
                  alt={name}
                  className="rounded-xl"
                  objectFit="cover"
                  size="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                {/* 텍스트 정보 */}
                <div className={slideTextBox}>
                  <h3 className="font-semibold text-base sm:text-lg">{name}</h3>
                  <p className="text-xs sm:text-sm line-clamp-2">{summary}</p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </MainSectionWrapper>
  );
}

export default React.memo(DestinationSlider);
