import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { useRecommendationList } from "@/hooks/recommendation/useRecommendationList";
import SkeletonImage from "@/components/common/loading/SkeletonImage";
import MainSectionWrapper from "@/components/common/layout/MainSectionWrapper";
import React, { useMemo } from "react";

function DestinationSlider() {
  const { data: destinations, isLoading } = useRecommendationList();

  const displayedDestinations = useMemo(() => {
    return destinations?.slice(0, 8) ?? [];
  }, [destinations]);

  if (isLoading || !destinations) return null;

  return (
    <MainSectionWrapper bg="bg-gray-50" className="overflow-hidden">
      <div className="text-center mb-8 md:mb-12 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          이 계절, 혼자 떠나기 좋은 곳
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          당신의 감성에 닿는, 잊지 못할 여행지를 소개합니다.
        </p>
        <Link
          to="/recommendations"
          className="inline-block mt-4 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          더보기 →
        </Link>
      </div>

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
      >
        {displayedDestinations.map(({ id, name, summary, imageUrl }) => (
          <SwiperSlide key={id} className="block">
            <div className="flex justify-center">
              <Link
                to={`/recommendations/${id}`}
                className="relative w-full max-w-3xl h-64 sm:h-80 md:h-[300px] lg:h-[320px] rounded-xl overflow-hidden shadow hover:brightness-105 transition bg-gray-200"
              >
                <SkeletonImage
                  src={imageUrl}
                  alt={name}
                  className="rounded-xl"
                  objectFit="cover"
                  size="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white z-10">
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
